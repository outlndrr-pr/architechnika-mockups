"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STYLES = [
  { id: "cantera", label: "Cantera", num: "01" },
  { id: "hoja", label: "Hoja", num: "02" },
  { id: "brisa", label: "Brisa", num: "03" },
] as const;

/**
 * Floating review tool: switches between the three design directions while
 * preserving the current sub-path (e.g. /cantera/portfolio → /hoja/portfolio).
 * Intentionally style-neutral so it reads as chrome, not content.
 */
export default function StyleSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const seg = pathname.split("/")[1];
  const current = STYLES.find((s) => s.id === seg);
  if (!current) return null;
  const rest = pathname.slice(`/${seg}`.length) || "";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        right: "18px",
        zIndex: 9999,
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
      }}
    >
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(12,12,14,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          {STYLES.map((s) => (
            <Link
              key={s.id}
              href={`/${s.id}${rest}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                padding: "11px 18px 11px 14px",
                textDecoration: "none",
                color: s.id === current.id ? "#fff" : "rgba(255,255,255,0.55)",
                background:
                  s.id === current.id ? "rgba(255,255,255,0.08)" : "transparent",
                fontSize: "13px",
                letterSpacing: "0.02em",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ fontSize: "10px", opacity: 0.6 }}>{s.num}</span>
              <span>{s.label}</span>
            </Link>
          ))}
          <Link
            href="/"
            style={{
              padding: "9px 18px 10px 14px",
              textDecoration: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              letterSpacing: "0.06em",
            }}
          >
            ⌂ All directions
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch design direction"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(12,12,14,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#fff",
          fontSize: "12px",
          letterSpacing: "0.05em",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.9,
          }}
        />
        {current.num} · {current.label}
      </button>
    </div>
  );
}
