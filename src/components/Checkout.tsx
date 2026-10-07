"use client";

import { useId, useRef, useState } from "react";
import { copy, type Bilingual } from "@/content/copy";
import { openAmount } from "@/content/tiers";
import { startCheckout, type CheckoutRequest } from "@/lib/payments";
import { T } from "./T";

const withMin = (t: Bilingual): Bilingual => ({
  es: t.es.replace("{min}", String(openAmount.minUsd)),
  en: t.en.replace("{min}", String(openAmount.minUsd)),
});

type State = "idle" | "working" | "not_configured" | "unavailable" | "error" | "invalid";

function useCheckout() {
  const [state, setState] = useState<State>("idle");
  const run = async (req: CheckoutRequest) => {
    setState("working");
    const result = await startCheckout(req);
    if (result.status === "redirect") {
      window.location.assign(result.url);
      return;
    }
    setState(result.status);
  };
  return { state, setState, run };
}

function Status({ state, id }: { state: State; id: string }) {
  const msg =
    state === "working"
      ? copy.checkout.working
      : state === "not_configured"
        ? copy.checkout.notReady
        : state === "unavailable"
          ? copy.tiers.notAvailable
          : state === "invalid"
            ? withMin(copy.checkout.invalidAmount)
            : state === "error"
              ? copy.checkout.error
              : null;
  return (
    <p className="checkout__status" id={id} role="status" aria-live="polite">
      {msg ? <T t={msg} /> : null}
    </p>
  );
}

export function TierButton({
  tierId,
  tierName,
  disabled,
  className,
}: {
  tierId: string;
  tierName: Bilingual;
  disabled?: boolean;
  className?: string;
}) {
  const { state, run } = useCheckout();
  const statusId = useId();
  return (
    <div className={`checkout ${className ?? ""}`}>
      <button
        type="button"
        className="btn"
        aria-describedby={statusId}
        aria-disabled={disabled || state === "working" || undefined}
        onClick={() => {
          if (disabled) return;
          run({ tierId });
        }}
      >
        <span className="btn__label">
          {disabled ? <T t={copy.tiers.notAvailable} /> : <><T t={copy.tiers.cta} /> →</>}
          <span className="sr-only">
            {" · "}
            <T t={tierName} />
          </span>
        </span>
      </button>
      <Status state={state} id={statusId} />
    </div>
  );
}

/** The "any amount" row. `children` (name and description) render between the amount and
 *  the button so the row can sit on the same grid as the priced rows. */
export function OpenAmountForm({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { state, setState, run } = useCheckout();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const statusId = useId();
  return (
    <form
      className={`open-form ${className ?? ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(value);
        if (!Number.isFinite(n) || n < openAmount.minUsd) {
          setState("invalid");
          inputRef.current?.focus();
          return;
        }
        run({ amountUsd: Math.round(n * 100) / 100 });
      }}
    >
      {children}
      <div className="open-form__amount">
        <label className="open-form__label etiqueta" htmlFor={inputId}>
          <T t={copy.tiers.open.label} />
        </label>
        <div className="open-form__row">
          <span className="open-form__cur" aria-hidden="true">$</span>
          <input
            id={inputId}
            ref={inputRef}
            className="open-form__input"
            aria-invalid={state === "invalid" || undefined}
            inputMode="decimal"
            type="number"
            min={openAmount.minUsd}
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={statusId}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="checkout open-form__action">
        <button type="submit" className="btn" aria-disabled={state === "working" || undefined}>
          <span className="btn__label">
            <T t={copy.tiers.cta} /> →
            <span className="sr-only">
              {" · "}
              <T t={copy.tiers.open.name} />
            </span>
          </span>
        </button>
        <Status state={state} id={statusId} />
      </div>
    </form>
  );
}
