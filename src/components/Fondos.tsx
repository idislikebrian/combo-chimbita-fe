"use client";

import { useState, type PointerEvent } from "react";
import { copy } from "@/content/copy";
import { formatUsd } from "@/content/campaign";
import { funding, roadmap } from "@/content/funding";
import { T } from "./T";

const no = (i: number) => String(i + 1).padStart(2, "0");
const pct = (part: number, whole: number) => `${((part / whole) * 100).toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;

// The $30K as one segmented bar, then the same lines as a printed list, then the roadmap.
// The bar is a picture of the list (aria-hidden): every fact lives in the list, so nothing
// depends on hover. With a mouse, pointing at a segment or a line pairs the two (ink only:
// the other segments drop to outline). Segments carry their line number, not a color.
export function Fondos({ total }: { total: number }) {
  const m = copy.money;
  const [active, setActive] = useState<number | null>(null);
  const point = (i: number) => ({
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setActive(i);
    },
    onPointerLeave: () => setActive(null),
  });
  const state = (i: number) => (active === i ? " is-active" : "");

  return (
    <div className="fondos" data-pairing={active !== null ? "" : undefined}>
      <div className="fondos__desglose">
        <h3 className="fondos__meta etiqueta">
          <T t={m.goalLabel} />
          <span className="ficha">{formatUsd(total)}</span>
        </h3>
        <div className="fondos__barra" aria-hidden="true">
          {funding.map((line, i) => (
            <span key={line.id} className={`tramo${state(i)}`} style={{ flexGrow: line.amountUsd }} {...point(i)}>
              <span className="tramo__no micro">{no(i)}</span>
            </span>
          ))}
        </div>
        <ol className="fondos__lista">
          {funding.map((line, i) => (
            <li key={line.id} className={`partida${state(i)}`} {...point(i)}>
              <span className="partida__no micro" aria-hidden="true">
                {no(i)}
              </span>
              <span className="partida__name ficha">
                <T t={line.name} />
              </span>
              <span className="partida__amount ficha">
                {formatUsd(line.amountUsd)}
                <span className="sr-only"> USD,</span>
              </span>
              <span className="partida__pct etiqueta">{pct(line.amountUsd, total)}</span>
            </li>
          ))}
        </ol>
        <p className="fondos__total ficha">
          <T t={m.total} />
          <span>
            {formatUsd(total)}
            <span className="sr-only"> USD</span>
          </span>
        </p>
      </div>

      <div className="ruta">
        <h3 className="ruta__label etiqueta">
          <T t={m.roadmapLabel} />
        </h3>
        <ol className="ruta__pasos">
          {roadmap.map((step, i) => (
            <li key={i} className="ruta__paso">
              <span className="ruta__when etiqueta">
                <T t={step.when} />
              </span>
              <span className="ruta__what cuerpo">
                <T t={step.what} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
