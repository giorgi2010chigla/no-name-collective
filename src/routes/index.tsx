import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Marquee } from "@/components/Marquee";
import heroImg from "@/assets/hero.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const upd = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Tbilisi", hour12: false };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono">{time || "--:--:--"}</span>;
}

function Index() {
  const { lang, t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <img
          src={heroImg}
          alt="NO NAME hero"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <div className="relative z-10 flex justify-between items-start px-6 md:px-10 pt-28 font-mono text-[10px] md:text-xs uppercase tracking-widest">
          <div>
            <div className="opacity-60">N° 001</div>
            <div className="mt-1">Tbilisi / <Clock /></div>
          </div>
          <div className="text-right">
            <div className="opacity-60">Est.</div>
            <div className="mt-1">MMXXIV</div>
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-10 pb-14 md:pb-20">
          <h1 className={`font-display font-bold tracking-tighter reveal-up ${
            lang === "ka" ? "text-[2.4rem] md:text-[5.6rem] leading-[1.32]" : "text-[3.4rem] md:text-[7.5rem] leading-[1.15]"
          }`}>
            <span className="headline-box">{t("hero_line1")}</span>
            <span className="headline-box italic">
              {t("hero_line2")}
              <span className="blink ml-2">_</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md font-mono text-xs md:text-sm uppercase tracking-widest opacity-70 reveal-up" style={{ animationDelay: "0.2s" }}>
            {t("hero_sub")}
          </p>
          <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
            <span className="inline-block w-8 h-px bg-foreground" />
            {t("scroll")}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={[t("slogan_1"), t("slogan_2"), t("slogan_3"), t("slogan_4")]} />

      {/* INFO BAR */}
      <div className="border-b border-foreground grid grid-cols-2 md:grid-cols-4 font-mono text-[10px] uppercase tracking-widest">
        {[
          ["Status", "Available"],
          ["Edition", "Permanent"],
          ["Pieces", "003"],
          ["Origin", "Tbilisi, GE"],
        ].map(([k, v]) => (
          <div key={k} className="px-6 md:px-10 py-4 border-r border-foreground last:border-r-0 flex justify-between gap-4">
            <span className="opacity-50">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>

      {/* MANIFESTO */}
      <section className="grid md:grid-cols-12 border-b border-foreground">
        <div className="md:col-span-3 px-6 md:px-10 py-8 md:py-12 border-r border-foreground bg-[var(--paper-2)]">
          <div className="font-mono text-xs uppercase tracking-widest opacity-60">[01]</div>
          <div className="font-mono text-xs uppercase tracking-widest mt-2">{t("manifesto_title")}</div>
        </div>
        <div className="md:col-span-9 px-6 md:px-10 py-12 md:py-20">
          <p className="font-display text-2xl md:text-5xl leading-[1.15] tracking-tight reveal-up">
            {t("manifesto_body")}
          </p>
        </div>
      </section>

      {/* SHOP TEASER */}
      <section className="grid md:grid-cols-12 border-b border-foreground">
        <div className="md:col-span-3 px-6 md:px-10 py-8 md:py-12 border-r border-foreground bg-[var(--paper-2)]">
          <div className="font-mono text-xs uppercase tracking-widest opacity-60">[02]</div>
          <div className="font-mono text-xs uppercase tracking-widest mt-2">{t("shop_title")}</div>
        </div>
        <div className="md:col-span-9 px-6 md:px-10 py-12 md:py-20 flex flex-col md:flex-row justify-between gap-6 md:items-end">
          <p className="font-display text-2xl md:text-4xl tracking-tight max-w-xl leading-[1.15]">{t("shop_sub")}</p>
          <Link
            to="/shop"
            className="self-start font-mono text-xs uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:bg-[var(--ink-3)] transition-colors"
          >
            → {t("nav_shop")}
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-foreground text-background">
        <div className="grid md:grid-cols-12 border-b border-background/20">
          <div className="md:col-span-3 px-6 md:px-10 py-8 md:py-12 border-r border-background/20 bg-[var(--ink-2)]">
            <div className="font-mono text-xs uppercase tracking-widest opacity-60">[03]</div>
            <div className="font-mono text-xs uppercase tracking-widest mt-2">{t("contact_title")}</div>
          </div>
          <div className="md:col-span-9 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/20">
            {[
              { label: t("location"), val: t("location_addr") },
              { label: t("hours"), val: t("hours_val") },
              { label: t("contact"), val: t("contact_val") },
            ].map((b) => (
              <div key={b.label} className="px-6 md:px-8 py-10">
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-4">— {b.label}</div>
                <div className="font-display text-xl md:text-2xl whitespace-pre-line leading-[1.25]">{b.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] uppercase tracking-widest">
          <div className="opacity-70">{t("footer")}</div>
          <div className="opacity-70">41.7151° N / 44.8271° E</div>
        </div>
      </section>
    </main>
  );
}
