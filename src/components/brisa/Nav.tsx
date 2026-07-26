"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { firm } from "@/data/content";
import { BRISA_NAV } from "./navItems";

/**
 * Transparent-ish over the hour, then noche-2 + blur once the sentinel
 * (60vh tall, at the very top of the page) leaves the viewport.
 * IntersectionObserver, never a scroll listener.
 */
export default function Nav() {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setStuck(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="b-nav-sentinel" ref={sentinel} aria-hidden="true" />
      <div className="b-progress" aria-hidden="true" />

      <header className="b-nav" data-stuck={stuck ? "true" : "false"}>
        <div className="b-wrap b-nav-inner">
          <Link href="/brisa" className="b-brand">
            {firm.name}
          </Link>

          <nav className="b-nav-links" aria-label="Primary">
            {BRISA_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="b-nav-link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="b-nav-tools">
            <ThemeToggle />
            <button
              type="button"
              className="b-burger"
              aria-expanded={open}
              aria-controls="brisa-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="b-menu" id="brisa-menu">
          <nav aria-label="Primary, expanded">
            {BRISA_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="b-menu-meta b-label">
            {firm.address}
            <br />
            {firm.phone}
          </p>
        </div>
      ) : null}
    </>
  );
}
