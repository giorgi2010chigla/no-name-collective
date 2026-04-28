import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — NO NAME" },
      { name: "description", content: "Checkout options for NO NAME orders." },
      { property: "og:title", content: "Checkout — NO NAME" },
      { property: "og:description", content: "Checkout options for NO NAME orders." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { totalItems, totalPrice } = useCart();
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <header className="px-6 md:px-10 py-12 md:py-20 border-b border-foreground">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">— {totalItems} items / {formatEuro(totalPrice)}</div>
        <h1 className="font-display font-bold tracking-tighter leading-[1.25] text-5xl md:text-8xl">
          <span className="headline-box">{t("checkout")}.</span>
        </h1>
      </header>

      <section className="grid md:grid-cols-2 border-b border-foreground">
        <button className="min-h-72 px-6 md:px-10 py-10 border-b md:border-b-0 md:border-r border-foreground text-left hover:bg-[var(--paper-2)] transition-colors">
          <div className="font-mono text-xs uppercase tracking-widest opacity-50">01</div>
          <div className="mt-6 font-display text-4xl md:text-6xl leading-none">Google Wallet</div>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest opacity-60">Payment setup required</div>
        </button>
        <button className="min-h-72 px-6 md:px-10 py-10 text-left hover:bg-[var(--paper-2)] transition-colors">
          <div className="font-mono text-xs uppercase tracking-widest opacity-50">02</div>
          <div className="mt-6 font-display text-4xl md:text-6xl leading-none">Mastercard / Visa</div>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest opacity-60">Payment setup required</div>
        </button>
      </section>
    </main>
  );
}
