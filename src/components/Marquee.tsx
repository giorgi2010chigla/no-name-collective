export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-foreground py-6 md:py-8">
      <div className="marquee">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter px-8 whitespace-nowrap uppercase"
          >
            {it} <span className="opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
