import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { copy, type Lang } from "@/content/copy";
import { tiers, openAmount } from "@/content/tiers";

// Instagram Story graphic for /gracias, 1080×1920 PNG. Takes only a reward id and a
// language, both checked against fixed lists; nothing about the supporter or the payment
// (no amount, email, address or session) can reach the image.
// Brand: paper, tinta, one pasiflora accent; Big Shoulders and Newsreader; no shadows.

const PAPEL = "#efe7d8";
const TINTA = "#16110e";
const PASIFLORA = "#f67291";

const W = 1080;
const H = 1920;

// Literal paths, so the build traces only these files into the function.
const fontsReady = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/BigShouldersDisplay-Black.ttf")),
  readFile(join(process.cwd(), "assets/fonts/BigShouldersDisplay-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Newsreader-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Newsreader-Italic.ttf")),
]);
const logoSvg = readFile(join(process.cwd(), "public/media/logo.svg"));
const florSvg = readFile(join(process.cwd(), "public/media/flores/pasiflora.svg"));

/** One-ink SVG as a data URI, filled with the given colour. */
async function svgIn(file: Promise<Buffer>, fill: string) {
  const svg = (await file).toString("utf8").replace("<svg ", `<svg fill="${fill}" `);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const lang: Lang = params.get("lang") === "en" ? "en" : "es";
  const r = params.get("r");
  const reward = r === openAmount.id ? copy.tiers.open.name[lang] : tiers.find((t) => t.id === r)?.name[lang];
  const c = copy.igStory;

  const [[black, extraBold, regular, italic], logo, flor] = await Promise.all([
    fontsReady,
    svgIn(logoSvg, TINTA),
    svgIn(florSvg, PASIFLORA),
  ]);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          background: PAPEL,
          color: TINTA,
          // Instagram covers roughly the top 250px and bottom 300px with its own UI.
          padding: "250px 88px 300px",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flor}
          width={520}
          height={535}
          alt=""
          style={{ position: "absolute", right: -120, top: 150 }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={320} height={165} alt="" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 110,
            fontFamily: "Big Shoulders",
            fontWeight: 900,
            fontSize: 190,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          {c.headline[lang].map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontFamily: "Newsreader",
            fontStyle: "italic",
            fontSize: 72,
            lineHeight: 1.1,
          }}
        >
          {copy.holding.line[lang]}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          {reward ? (
            <div
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontSize: 40,
                lineHeight: 1.25,
                paddingBottom: 22,
                marginBottom: 28,
                borderBottom: `3px solid ${TINTA}`,
              }}
            >
              {c.reward[lang]}: {reward}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: PASIFLORA,
              color: TINTA,
              border: `3px solid ${TINTA}`,
              padding: "14px 26px 18px",
              fontFamily: "Big Shoulders",
              fontWeight: 800,
              fontSize: 58,
              letterSpacing: 1,
            }}
          >
            disco.combochimbita.net
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Big Shoulders", data: black, weight: 900, style: "normal" },
        { name: "Big Shoulders", data: extraBold, weight: 800, style: "normal" },
        { name: "Newsreader", data: regular, weight: 400, style: "normal" },
        { name: "Newsreader", data: italic, weight: 400, style: "italic" },
      ],
      headers: {
        "Content-Disposition": `inline; filename="combo-chimbita-story-${lang}.png"`,
        "Cache-Control": "public, max-age=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
  return image;
}
