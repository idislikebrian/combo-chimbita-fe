import Link from "next/link";
import { SplitStack } from "./SplitStack";
import { LangToggle } from "./LangToggle";

export function Header() {
  return (
    <header className="site-header">
      <Link className="site-header__mark" href="/" aria-label="COMBO CHIMBITA">
        <SplitStack />
      </Link>
      <LangToggle />
    </header>
  );
}
