"use client";

import { useEffect, useRef, useState } from "react";
import { copy, type Bilingual } from "@/content/copy";
import { fragmentos, formatDuration } from "@/content/escucha";
import { T } from "./T";
import { Flor, FLORES } from "./Flor";

// Rehearsal fragments as a row of tiles. One shared <audio>, created on the first tap, so
// nothing downloads until a visitor picks a clip, and then only that clip. When a clip
// ends the next one starts; after the last, playback stops.
export function Escucha({ kicker, heading }: { kicker?: Bilingual; heading?: Bilingual } = {}) {
  const c = copy.escucha;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => () => audioRef.current?.pause(), []);

  function getAudio() {
    if (audioRef.current) return audioRef.current;
    const a = new Audio();
    a.preload = "auto";
    a.addEventListener("play", () => setPlaying(true));
    a.addEventListener("pause", () => setPlaying(false));
    a.addEventListener("timeupdate", () => setProgress(a.duration ? a.currentTime / a.duration : 0));
    a.addEventListener("ended", () => {
      const next = Number(a.dataset.index) + 1;
      if (next < fragmentos.length) start(next);
      else {
        setCurrent(null);
        setProgress(0);
      }
    });
    audioRef.current = a;
    return a;
  }

  function start(i: number) {
    const a = getAudio();
    a.dataset.index = String(i);
    a.src = fragmentos[i].src;
    setCurrent(i);
    setProgress(0);
    a.play().catch(() => {
      // Interrupted by another tap, or the browser refused: leave the tile idle.
      if (a.dataset.index === String(i)) setPlaying(false);
    });
  }

  function toggle(i: number) {
    const a = audioRef.current;
    if (a && current === i) {
      if (a.paused) a.play().catch(() => setPlaying(false));
      else a.pause();
    } else start(i);
  }

  return (
    <section className="escucha" id="escucha" aria-labelledby="escucha-title">
      <p className="kicker etiqueta">
        <T t={kicker ?? c.kicker} />
      </p>
      <h2 id="escucha-title" className="escucha__title">
        <T t={heading ?? c.heading} />
      </h2>
      <div className="escucha__cuerpo">
        <p className="cuerpo">
          <T t={c.body} />
        </p>
        <ol className="fragmentos">
          {fragmentos.map((f, i) => {
            const on = current === i && playing;
            return (
              <li key={f.no}>
                <button
                  type="button"
                  className="fragmento"
                  aria-pressed={on}
                  data-current={current === i || undefined}
                  onClick={() => toggle(i)}
                  style={{ "--avance": current === i ? progress : 0 } as React.CSSProperties}
                >
                  <span className="fragmento__no micro" aria-hidden="true">
                    <Flor name={FLORES[i % FLORES.length]} className="flor-glifo--no" />
                    № {f.no}
                  </span>
                  <span className="fragmento__name">
                    <T t={{ es: `${c.tile.es} ${f.no}`, en: `${c.tile.en} ${f.no}` }} />
                  </span>
                  <span className="fragmento__pie">
                    <time className="micro" dateTime={`PT${Math.round(f.seconds)}S`}>
                      {formatDuration(f.seconds)}
                    </time>
                    {/* State is carried by aria-pressed; this is the visible cue. */}
                    <span className="fragmento__accion etiqueta" aria-hidden="true">
                      <span className={on ? "icono-pausa" : "icono-play"} />
                      <T t={on ? c.pause : c.play} />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
