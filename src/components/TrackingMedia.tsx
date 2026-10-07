"use client";

import { useState } from "react";
import type { Bilingual } from "@/content/copy";
import { T } from "./T";

// Two independent layers, as approved by the band:
//   1. filtro  — the image treatment (here a riso CMYK print of the still)
//   2. trazado — tracking boxes, lines and numbers drawn over it
// When the pre-rendered blob-tracking video lands, it replaces layer 1 only.

// Hand-placed regions on the 2000 × 1262 riso print. Labels print each box's real
// pixel position in that file, so every number shown is true.
const W = 2000;
const H = 1262;
const boxes = [
  { x: 380, y: 420, w: 260, h: 300 },
  { x: 720, y: 300, w: 180, h: 200 },
  { x: 1090, y: 320, w: 180, h: 210 },
  { x: 1400, y: 400, w: 250, h: 220 },
  { x: 1200, y: 720, w: 220, h: 180 },
];
const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 4],
  [1, 3],
];
const center = (i: number) => [boxes[i].x + boxes[i].w / 2, boxes[i].y + boxes[i].h / 2];

export function TrackingMedia({
  still,
  print,
  video,
  alt,
  note,
}: {
  still: string;
  print: string;
  video: string | null;
  alt: Bilingual;
  note: Bilingual;
}) {
  const [filtro, setFiltro] = useState(true);
  const [trazado, setTrazado] = useState(true);

  return (
    <div className="media" data-theme="noche">
      <figure className="media__frame" role="img" aria-labelledby="media-alt">
        <span id="media-alt" className="sr-only">
          <T t={alt} />
        </span>

        <div className={`media__filtro ${filtro ? "is-on" : ""}`} aria-hidden="true">
          {video ? (
            <video className="media__src" src={video} poster={still} autoPlay muted loop playsInline />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="media__src media__src--plain" src={still} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="media__src media__src--print" src={print} alt="" />
            </>
          )}
        </div>

        <svg
          className={`media__trazado ${trazado ? "is-on" : ""}`}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {links.map(([a, b]) => {
            const [x1, y1] = center(a);
            const [x2, y2] = center(b);
            return <line key={`${a}-${b}`} className="trz-line" x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {boxes.map((b, i) => (
            <g key={i}>
              <rect className="trz-box" x={b.x} y={b.y} width={b.w} height={b.h} />
              <rect className="trz-tag" x={b.x} y={b.y - 33} width={56} height={28} />
              <text className="trz-id" x={b.x + 8} y={b.y - 11}>
                {String(i + 1).padStart(2, "0")}
              </text>
              <text className="trz-num" x={b.x + 64} y={b.y - 11}>
                x{b.x} y{b.y}
              </text>
              <text className="trz-num" x={b.x + b.w} y={b.y + b.h + 26} textAnchor="end">
                {b.w}×{b.h}
              </text>
            </g>
          ))}
        </svg>
      </figure>

      {/* Readout corners: printed over the image like a camera's data, outside the role="img" figure. */}
      <p className="media__note micro">
        <T t={note} />
      </p>
      <p className="media__count micro" aria-hidden="true">
        {boxes.length} obj · {W}×{H}
      </p>
      <div className="media__toggles" role="group" aria-label="Capas / Layers">
        <button type="button" className="chip chip--senal" aria-pressed={filtro} onClick={() => setFiltro((v) => !v)}>
          <T t={{ es: "Filtro", en: "Filter" }} />
        </button>
        <button type="button" className="chip chip--senal" aria-pressed={trazado} onClick={() => setTrazado((v) => !v)}>
          <T t={{ es: "Trazado", en: "Tracking" }} />
        </button>
      </div>
    </div>
  );
}
