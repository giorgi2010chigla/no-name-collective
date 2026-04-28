import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — NO NAME" },
      { name: "description", content: "Shopping cart for NO NAME selected works." },
      { property: "og:title", content: "Cart — NO NAME" },
      { property: "og:description", content: "Shopping cart for NO NAME selected works." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, totalItems, totalPrice, removeItem, clearCart } = useCart();
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <header className="px-6 md:px-10 py-12 md:py-20 border-b border-foreground">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">— {totalItems} items</div>
        <h1 className="font-display font-bold tracking-tighter leading-[1.25] text-5xl md:text-8xl">
          <span className="headline-box">{t("cart_title")}.</span>
        </h1>
      </header>

      {items.length === 0 ? (
        <section className="px-6 md:px-10 py-16 border-b border-foreground">
          <p className="font-display text-2xl md:text-5xl leading-[1.15]">{t("empty_cart")}</p>
          <Link to="/shop" className="mt-8 inline-flex font-mono text-xs uppercase tracking-widest bg-foreground text-background px-5 py-3">
            → {t("nav_shop")}
          </Link>
        </section>
      ) : (
        <section className="border-b border-foreground">
          {items.map((item) => (
            <article key={item.id} className="grid md:grid-cols-12 border-b border-foreground last:border-b-0">
              <div className="md:col-span-2 h-48 md:h-56 border-r border-foreground overflow-hidden bg-[var(--paper-2)]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-7 px-6 md:px-10 py-8 flex flex-col justify-between gap-6 border-r border-foreground">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-50">N° {item.id}</div>
                  <h2 className="mt-3 font-display text-3xl md:text-5xl leading-none">{item.name}</h2>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-60">{item.material}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start font-mono text-[10px] uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
                  {t("remove")}
                </button>
              </div>
              <div className="md:col-span-3 px-6 md:px-10 py-8 flex md:flex-col justify-between gap-4 font-mono text-xs uppercase tracking-widest">
                <span>× {item.quantity}</span>
                <span>{formatEuro(item.price * item.quantity)}</span>
              </div>
            </article>
          ))}
        </section>
      )}

      <footer className="px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-4 border-b border-foreground">
        <div className="font-display text-3xl md:text-5xl">{formatEuro(totalPrice)}</div>
        <div className="flex gap-3">
          {items.length > 0 && <button onClick={clearCart} className="font-mono text-xs uppercase tracking-widest border border-foreground px-5 py-3">Clear</button>}
          <Link to="/checkout" className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-5 py-3">
            {t("checkout")}
          </Link>
        </div>
      </footer>
    </main>
  );
}
