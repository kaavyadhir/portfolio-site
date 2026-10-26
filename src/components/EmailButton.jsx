import { useEffect, useRef, useState } from "react";
import { person } from "../content.js";

/**
 * Shows the email address and copies it on click.
 *
 * Deliberately not a mailto: link — mailto does nothing on a machine with no
 * mail client configured, which makes the button look broken. The address is
 * rendered as text, so it is readable even if the copy never fires.
 */
export default function EmailButton({ variant = "ghost" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = false;

    try {
      await navigator.clipboard.writeText(person.email);
      ok = true;
    } catch {
      // Older browsers, or a page not served over https.
      try {
        const field = document.createElement("textarea");
        field.value = person.email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        document.body.removeChild(field);
      } catch {
        ok = false;
      }
    }

    // Only claim success if it actually copied — the address stays on screen
    // either way, so a failure is recoverable by reading it.
    if (ok) {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const base =
    "rounded-lg px-4 py-2 font-mono text-sm transition-all hover:-translate-y-0.5";

  const look =
    variant === "solid"
      ? "bg-accent font-semibold text-ink hover:bg-accent/90"
      : "border border-line bg-surface/60 text-chalk hover:border-accent/50 hover:bg-raise";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${person.email}`}
      className={`${base} ${look}`}
    >
      {copied ? "Copied ✓" : person.email}
    </button>
  );
}
