import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — NO NAME" },
      { name: "description", content: "Selected works. Three pieces. No collections." },
      { property: "og:title", content: "Shop — NO NAME" },
      { property: "og:description", content: "Selected works. Three pieces. No collections." },
    ],
  }),
  component: Shop,
});

const products = [
  { id: "001", name: "Hooded Object", img: p1, price: "₾ 480", material: "Heavy cotton fleece, 480gsm" },
  { id: "002", name: "Frayed Tee", img: p2, price: "₾ 220", material: "Raw-cut cotton jersey" },
  { id: "003", name: "Wide Trouser", img: p3, price: "₾ 560", material: "Wool gabardine, drape cut" },
];

function Shop() {
  const { lang, t } = useI18n();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <header className="px-6 md:px-10 py-12 md:py-20 border-b border-foreground">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">— {t("shop_title")}</div>
        <h1 className={`font-display font-bold tracking-tighter leading-[1.25] ${lang === "ka" ? "text-4xl md:text-7xl" : "text-5xl md:text-8xl"}`}>
          <span className="headline-box">{t("nav_shop")}.</span>
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-60 max-w-md">{t("shop_sub")}</p>
      </header>

      <div
        className="flex flex-col md:flex-row min-h-[80vh] border-b border-foreground"
        onMouseLeave={() => setHovered(null)}
      >
        {products.map((p) => {
          const isH = hovered === p.id;
          const anyH = hovered !== null;
          return (
            <article
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              className={`group relative overflow-hidden border-foreground border-b md:border-b-0 md:border-r last:border-r-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isH ? "md:flex-[3]" : anyH ? "md:flex-[0.7]" : "md:flex-1"
              } flex-1`}
            >
              <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-foreground/5">
                <img
                  src={p.img}
                  alt={p.name}
                  width={832}
                  height={1216}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isH ? "scale-105 grayscale-0" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/0 transition" />
              </div>

              <div className="absolute top-0 left-0 right-0 p-5 md:p-6 flex justify-between items-start font-mono text-[10px] uppercase tracking-widest text-background mix-blend-difference">
                <span>N° {p.id}</span>
                <span>{p.price}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-background mix-blend-difference">
                <div className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-none">
                  {p.name}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isH ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-80 mb-3">
                    {p.material}
                  </div>
                  <button className="font-mono text-[10px] uppercase tracking-widest border border-background px-4 py-2 hover:bg-background hover:text-foreground transition-colors">
                    {t("view")} →
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="px-6 md:px-10 py-12 flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-60">
        <span>{t("footer")}</span>
        <span>003 / 003</span>
      </footer>
    </main>
  );
}
