type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

/**
 * Jednotný rytmus nadpisů sekcí: štítek → titulek → perex.
 * Drží vizuální řád celého webu — každá sekce začíná tímhle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow ? (
        <p
          className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss-deep ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-olive" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-display text-3xl font-medium text-ink sm:text-4xl">
        {title}
      </Tag>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}
