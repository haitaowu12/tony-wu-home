import { useEffect, useState } from "react";
import StandardPage from "./StandardPage";
import Explorer from "./explorer/Explorer";
import "./explorer/explorer.css";

/** Keep the complete public page in the initial HTML. Existing section links and
 * the explicit page view keep their reading route; the desktop is enhancement. */
export default function App() {
  const [explorer, setExplorer] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setExplorer(params.get("view") !== "page" && (!window.location.hash || params.get("view") === "explorer"));
  }, []);
  if (explorer) return <Explorer />;
  return <div className="standard-page">
    <StandardPage />
    <a className="explorer-switch" href="?view=explorer">Explore Tony OS</a>
  </div>;
}
