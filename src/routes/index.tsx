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
  const { t } = useI18n();

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

        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24">
          <h1 className="font-display font-bold text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter reveal-up">
            {t("hero_line1")}
            <br />
            <span className="italic">{t("hero_line2")}</span>
            <span className="blink ml-2">_</span>
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

      {/* MANIFESTO */}
      <section className="px-6 md:px-10 py-24 md:py-40 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest opacity-50">
          [01] — {t("manifesto_title")}
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl md:text-6xl leading-[1.05] tracking-tight reveal-up">
            {t("manifesto_body")}
          </p>
        </div>
      </section>

      {/* SHOP TEASER */}
      <section className="border-t border-foreground px-6 md:px-10 py-24 md:py-40">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest opacity-50">
            [02] — {t("shop_title")}
          </div>
          <div className="md:col-span-9 flex justify-between items-end">
            <p className="font-display text-2xl md:text-4xl tracking-tight max-w-xl">{t("shop_sub")}</p>
            <Link
              to="/shop"
              className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition"
            >
              → {t("nav_shop")}
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-foreground bg-foreground text-background px-6 md:px-10 py-24 md:py-40">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-12">
          [03] — {t("contact_title")}
        </div>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {[
            { label: t("location"), val: t("location_addr") },
            { label: t("hours"), val: t("hours_val") },
            { label: t("contact"), val: t("contact_val") },
          ].map((b) => (
            <div key={b.label}>
              <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">— {b.label}</div>
              <div className="font-display text-2xl md:text-3xl whitespace-pre-line leading-tight">{b.val}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-40 flex flex-col md:flex-row justify-between gap-6 font-mono text-[10px] uppercase tracking-widest opacity-60">
          <div>{t("footer")}</div>
          <div>41.7151° N / 44.8271° E</div>
        </div>
      </section>
    </main>
  );
}
