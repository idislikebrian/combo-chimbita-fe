"use client";

import { useSyncExternalStore } from "react";
import { daysLeft } from "@/content/campaign";

const noop = () => () => {};

/** Computed in the browser so the count is true on the day it's read. */
export function DaysLeft({ endDate }: { endDate: string }) {
  const days = useSyncExternalStore(noop, () => daysLeft(endDate, new Date()), () => null);
  return <>{days === null ? "··" : days}</>;
}
