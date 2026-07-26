"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE_SHEETS } from "./sheets";
import PlotToggle from "./PlotToggle";

export default function Nav() {
  const pathname = (usePathname() || "/hoja").replace(/\/+$/, "") || "/hoja";

  return (
    <nav className="hoja-nav hoja-mono" aria-label="Drawing set">
      <Link href="/hoja" className="hoja-nav__brand">
        Architechnika,&nbsp;Inc.
      </Link>

      <div className="hoja-nav__links">
        {ROUTE_SHEETS.filter((r) => r.href !== "/hoja").map((r) => {
          const active =
            pathname === r.href || pathname.startsWith(`${r.href}/`);
          return (
            <Link
              key={r.href}
              href={r.href}
              className="hoja-nav__link"
              aria-current={active ? "page" : undefined}
            >
              <span className="hoja-nav__sheet">{r.sheet}</span>
              <span>{r.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="hoja-nav__end">
        <PlotToggle />
      </div>
    </nav>
  );
}
