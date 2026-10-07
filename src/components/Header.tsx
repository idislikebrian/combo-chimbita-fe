import Link from "next/link";
import { copy } from "@/content/copy";
import { campaign } from "@/content/campaign";
import { SplitStack } from "./SplitStack";
import { LangToggle } from "./LangToggle";
import { T } from "./T";

export function Header() {
  return (
    <header className="site-header">
      <Link className="site-header__mark" href="/" aria-label="COMBO CHIMBITA">
        <SplitStack />
      </Link>
      <div className="site-header__ficha ficha">
        <span className="site-header__status">
          <T t={copy.header.status} />
        </span>
        <span className="site-header__coords" aria-hidden="true">
          {campaign.coords.brooklyn}
        </span>
        <LangToggle />
      </div>
    </header>
  );
}
