import Link from "next/link";
import { LangToggle } from "./LangToggle";

// Basic lockup from Brian's export (deliverables/SVG/logo.svg), drawn as a mask so it
// takes the ink of its context (currentColor) rather than the file's own black.
export function Header() {
  return (
    <header className="site-header">
      <Link className="site-header__mark" href="/" aria-label="COMBO CHIMBITA">
        <span className="logo" aria-hidden="true" />
      </Link>
      <LangToggle />
    </header>
  );
}
