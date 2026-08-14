import Reveal from "@/components/Reveal";

export type ProcessStep = { nazev: string; text: string };

/**
 * Čtyři kroky spolupráce — všechny vycházejí z původních textů webu
 * (schůzka před každou realizací, návrh, realizace, dlouhodobá péče).
 */
export const KROKY: ProcessStep[] = [
  {
    nazev: "Schůzka u Vás",
    text: "Každé realizaci předchází schůzka, na které prodiskutujeme Vaše představy a možnosti, jak je uskutečnit.",
  },
  {
    nazev: "Návrh",
    text: "Připravíme projekt, díky kterému si lépe představíte, jak bude Vaše zahrada vypadat — a společně ho doladíme.",
  },
  {
    nazev: "Realizace",
    text: "Po vyhotovení projektu následuje samotná realizace. Snažíme se vždy odvést tu nejlepší práci.",
  },
  {
    nazev: "Dlouhodobá péče",
    text: "Založením zahrady naše práce nekončí — jsme připraveni Vám s ní pomáhat dlouhodobě.",
  },
];

export default function ProcessSteps({
  highlight,
}: {
  /** Zvýrazněné kroky (1–4), např. na stránce návrhu první dva. */
  highlight?: number[];
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {KROKY.map((krok, i) => {
        const dim = highlight && !highlight.includes(i + 1);
        return (
          <Reveal key={krok.nazev} delay={i * 80}>
            <li
              className={`relative h-full rounded-card border border-line bg-paper p-6 shadow-soft ${
                dim ? "opacity-60" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-medium text-olive"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{krok.nazev}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{krok.text}</p>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
