"use client";

import { useCallback, useEffect, useState } from "react";

export const BRISA_ROOT_ID = "brisa-root";
export const BRISA_STORAGE_KEY = "brisa-hour";

/**
 * Runs before paint, inside the theme root, so the stored hour is applied
 * with no flash. The root carries suppressHydrationWarning because this
 * script — not React — owns the .dia class.
 */
export const THEME_BOOTSTRAP = `(function(){try{var r=document.getElementById(${JSON.stringify(
  BRISA_ROOT_ID
)});if(!r)return;if(localStorage.getItem(${JSON.stringify(
  BRISA_STORAGE_KEY
)})==='dia'){r.classList.add('dia');}}catch(e){}})();`;

/** DÍA / NOCHE. Both palettes are the same place, at different hours. */
export default function ThemeToggle() {
  const [dia, setDia] = useState(false);

  useEffect(() => {
    const root = document.getElementById(BRISA_ROOT_ID);
    setDia(!!root?.classList.contains("dia"));
  }, []);

  const toggle = useCallback(() => {
    const root = document.getElementById(BRISA_ROOT_ID);
    if (!root) return;
    const next = !root.classList.contains("dia");
    root.classList.toggle("dia", next);
    setDia(next);
    try {
      localStorage.setItem(BRISA_STORAGE_KEY, next ? "dia" : "noche");
    } catch {
      /* private mode — the choice simply doesn't persist */
    }
  }, []);

  return (
    <button
      type="button"
      className="b-toggle"
      onClick={toggle}
      aria-pressed={dia}
      aria-label={
        dia ? "Switch to the night palette" : "Switch to the day palette"
      }
    >
      <span className={dia ? "b-toggle-on" : undefined}>Día</span>
      <span className="b-toggle-sep" aria-hidden="true">
        /
      </span>
      <span className={dia ? undefined : "b-toggle-on"}>Noche</span>
    </button>
  );
}
