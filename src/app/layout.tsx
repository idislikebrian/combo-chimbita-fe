import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Newsreader } from "next/font/google";
import { copy } from "@/content/copy";
import "@/styles/tokens.css";
import "./globals.css";

// Two families only on this site: Big Shoulders and Newsreader (campaign art direction,
// Oct 7 2026). Google ships "Big Shoulders Display" as the opsz axis of "Big Shoulders":
// globals.css pins opsz 72 for display sizes and lets small metadata follow its size.
const cartel = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--nf-cartel",
  display: "swap",
});
const texto = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--nf-texto",
  display: "swap",
});

// Pre-launch: keep every deployment out of search engines.
// Flip INDEXABLE=true in the production env at launch.
const indexable = process.env.INDEXABLE === "true";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description.es,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#efe7d8",
};

// Runs before paint so the saved language never flashes.
const langScript = `try{var l=localStorage.getItem('cc-lang');if(l==='en'||l==='es'){document.documentElement.dataset.lang=l;document.documentElement.lang=l}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-lang="es"
      data-theme="papel"
      className={`${cartel.variable} ${texto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
