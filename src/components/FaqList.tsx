import type { FaqItem } from "@/data/faq";

/** Časté otázky — nativní details/summary, žádný JavaScript. */
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-paper shadow-soft">
      {items.map((item) => (
        <details key={item.otazka} className="group px-6 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.otazka}
            <span
              aria-hidden="true"
              className="text-xl font-light text-moss transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-2 pt-1 text-sm leading-relaxed text-muted">
            {item.odpoved}
          </p>
        </details>
      ))}
    </div>
  );
}
