import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";

export function Nav() {
  const { t, lang, setLang } = useI18n();
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
        </nav>
      </div>
    </header>
  );
}
