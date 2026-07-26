"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { firm } from "@/data/content";

const LINKS = [
  { href: "/cantera/portfolio", label: "Work" },
  { href: "/cantera/story", label: "Studio" },
  { href: "/cantera/team", label: "Team" },
  { href: "/cantera/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="c-nav">
      <nav className="c-shell c-nav__inner" aria-label="Primary">
        <Link
          href="/cantera"
          className="c-wordmark"
          aria-current={pathname === "/cantera" ? "page" : undefined}
        >
          ArchiTechnika
        </Link>

        <ul className="c-nav__links">
          {LINKS.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="c-nav__link"
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a className="c-nav__phone c-nums" href={firm.phoneHref}>
          {firm.phone}
        </a>
      </nav>
    </header>
  );
}
