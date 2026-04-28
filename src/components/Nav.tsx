import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { totalItems } = useCart();
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-foreground/10" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tighter">
          NO<span className="inline-block w-2" />NAME
        </Link>

        <nav className="flex items-center gap-6 md:gap-10 font-mono text-xs uppercase tracking-widest">
          <Link
            to="/"
            className={`transition-opacity duration-200 hover:opacity-100 ${loc.pathname === "/" ? "opacity-100" : "opacity-50"}`}
          >
            {t("nav_home")}
          </Link>
          <Link
            to="/shop"
            className={`transition-opacity duration-200 hover:opacity-100 ${loc.pathname === "/shop" ? "opacity-100" : "opacity-50"}`}
          >
            {t("nav_shop")}
          </Link>
          <button
            onClick={() => setLang(lang === "en" ? "ka" : "en")}
            className="border border-foreground px-2 py-1 hover:bg-foreground hover:text-background transition-colors duration-200"
            aria-label="Toggle language"
          >
            {t("nav_lang")}
          </button>
          <Link
            to="/cart"
            className={`relative inline-flex h-8 w-8 items-center justify-center border border-foreground hover:bg-foreground hover:text-background transition-colors duration-200 ${loc.pathname === "/cart" ? "bg-foreground text-background" : ""}`}
            aria-label="Shopping cart"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.78a2 2 0 0 0 1.95-1.57L21 7H5.12" />
            </svg>
            {totalItems > 0 && <span className="absolute -right-2 -top-2 min-w-4 px-1 bg-foreground text-background text-[9px] leading-4 text-center">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
