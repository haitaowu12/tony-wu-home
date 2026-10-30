#!/usr/bin/env python3
"""Publish a verified static directory with ordinary GitHub Pages branch hosting."""
import argparse, hashlib, json, shutil, subprocess, tempfile
from pathlib import Path

def run(*args, cwd=None, check=True):
    p = subprocess.run(args, cwd=cwd, text=True, capture_output=True)
    if check and p.returncode:
        raise RuntimeError(p.stderr or p.stdout)
    return p

def publish(repo, directory, source, receipt):
    directory = Path(directory).resolve()
    if not (directory/'index.html').is_file():
        raise RuntimeError('Publication requires index.html')
    files = sorted(p for p in directory.rglob('*') if p.is_file())
    for p in files:
        if p.is_symlink() or any(s.startswith('.') and s != '.nojekyll' for s in p.relative_to(directory).parts):
            raise RuntimeError('Hidden file or symbolic link: '+str(p))
        if p.suffix in {'.sqlite3', '.db', '.pem', '.key', '.map'}:
            raise RuntimeError('Unexpected private/runtime/source-map artifact: '+str(p))
    manifest = {'source_commit':source, 'hosting':'GitHub Pages branch publishing',
                'files':[{'path':p.relative_to(directory).as_posix(), 'bytes':p.stat().st_size,
                          'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
    with tempfile.TemporaryDirectory(prefix='pages-publication-') as folder:
        target = Path(folder)/'site'
        remote = 'https://github.com/'+repo+'.git'
        ref = run('git','ls-remote','--heads',remote,'gh-pages').stdout.strip()
        if ref:
            run('git','clone','--depth','1','--branch','gh-pages',remote,str(target))
            for p in target.iterdir():
                if p.name != '.git':
                    shutil.rmtree(p) if p.is_dir() else p.unlink()
        else:
            target.mkdir()
            run('git','init','-b','gh-pages',str(target))
            run('git','remote','add','origin',remote,cwd=target)
        shutil.copytree(directory,target,dirs_exist_ok=True)
        (target/'.nojekyll').touch()
        (target/'deployment.json').write_text(json.dumps(manifest,indent=2)+'\n')
        run('git','add','--all',cwd=target)
        if run('git','diff','--cached','--quiet',cwd=target,check=False).returncode:
            run('git','commit','-m','Publish verified static build from '+source[:12]+' [skip ci]',cwd=target)
            run('git','push','origin','HEAD:refs/heads/gh-pages',cwd=target)
        commit=run('git','rev-parse','HEAD',cwd=target).stdout.strip()
        actual=run('git','ls-remote','--heads',remote,'gh-pages').stdout.split()[0]
        if actual != commit: raise RuntimeError('Remote publication identity changed')
    current=run('gh','api','repos/'+repo+'/pages',check=False)
    payload={'build_type':'legacy','source':{'branch':'gh-pages','path':'/'}}
    method='PUT' if current.returncode==0 else 'POST'
    p=subprocess.run(['gh','api','--method',method,'repos/'+repo+'/pages','--input','-'],input=json.dumps(payload),text=True,capture_output=True)
    if p.returncode and 'HTTP 409' in p.stderr:
        p=subprocess.run(['gh','api','--method','PUT','repos/'+repo+'/pages','--input','-'],input=json.dumps(payload),text=True,capture_output=True)
    if p.returncode: raise RuntimeError('Static branch pushed; Pages setup failed: '+p.stderr)
    latest=run('gh','api','repos/'+repo+'/pages/builds/latest',check=False)
    previous=json.loads(latest.stdout) if latest.returncode==0 else {}
    if previous.get('commit') != commit or previous.get('status') == 'errored':
        run('gh','api','--method','POST','repos/'+repo+'/pages/builds')
    state=json.loads(run('gh','api','repos/'+repo+'/pages').stdout)
    result={'repository':repo,'source_commit':source,'publication_commit':commit,'url':state['html_url'],
            'build_type':state['build_type'],'source':state['source'],'files':len(files),'bytes':sum(p.stat().st_size for p in files)}
    Path(receipt).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo',required=True)
    parser.add_argument('--directory',required=True)
    parser.add_argument('--source',required=True)
    parser.add_argument('--receipt',required=True)
    args=parser.parse_args()
    publish(args.repo,args.directory,args.source,args.receipt)
