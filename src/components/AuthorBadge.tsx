import { profile } from "../content/profile";

type AuthorBadgeProps = {
  variant?: "inline" | "compact";
};

export function AuthorBadge({ variant = "inline" }: AuthorBadgeProps) {
  return (
    <a
      className={`author-badge author-badge--${variant}`}
      href={profile.canonicalUrl}
      aria-label={`${profile.authorBadge.label}: ${profile.identity.name}`}
    >
      <span className="author-badge__mark" aria-hidden="true">
        TW
      </span>
      <span>
        <strong>{profile.authorBadge.label}</strong>
        {variant === "inline" && <small>{profile.authorBadge.description}</small>}
      </span>
    </a>
  );
}
