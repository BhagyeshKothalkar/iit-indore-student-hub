import * as React from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "green" | "yellow" | "red" | "white";

interface StatusBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  tone: StatusTone;
  children: React.ReactNode;
  /** Approximate rendered height in px; radius will be 0.2 × this. */
  size?: number;
}

const toneClass: Record<StatusTone, string> = {
  green: "bg-[hsl(var(--status-green))] text-[hsl(var(--status-fg-on-color))]",
  yellow: "bg-[hsl(var(--status-yellow))] text-[hsl(var(--status-fg-on-color))]",
  red: "bg-[hsl(var(--status-red))] text-[hsl(var(--status-fg-on-color))]",
  white:
    "bg-[hsl(var(--status-white))] text-[hsl(var(--status-fg-on-white))] ring-1 ring-inset ring-black/10",
};

/**
 * Solid-color status indicator. Strict R/G/Y/W palette, no gradients.
 * Border-radius is dynamically set to 0.2× the smaller side (height).
 */
export function StatusBadge({
  tone,
  children,
  size = 22,
  className,
  style,
  ...rest
}: StatusBadgeProps) {
  const radius = Math.max(2, Math.round(size * 0.2));
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center justify-center px-2.5 text-xs font-semibold leading-none whitespace-nowrap select-none",
        toneClass[tone],
        className,
      )}
      style={{
        height: size,
        minWidth: size * 1.6,
        borderRadius: radius,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
