import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section>
      <Container className="py-24 text-center sm:py-32">
        <p className="font-display text-6xl font-medium text-olive">404</p>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
          Tahle cesta v zahradě nikam nevede
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Stránka, kterou hledáte, tu není. Zkuste to od začátku, nebo se
          podívejte do galerie.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-moss px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-moss-deep"
          >
            Na úvod
          </Link>
          <Link
            href="/galerie/"
            className="rounded-full border-2 border-moss px-6 py-3 font-semibold text-moss-deep transition-colors hover:bg-olive-soft"
          >
            Do galerie
          </Link>
        </div>
      </Container>
    </section>
  );
}
