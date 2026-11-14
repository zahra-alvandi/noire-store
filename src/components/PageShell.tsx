import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { label } from "../ui/ui";

const helpPages = [
  { to: "/about", title: "درباره ما" },
  { to: "/faq", title: "سؤالات متداول" },
  { to: "/shipping", title: "ارسال و تحویل" },
  { to: "/returns", title: "شرایط بازگشت" },
  { to: "/contact", title: "تماس با ما" },
];

type PageShellProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: PageShellProps) {
  const { pathname } = useLocation();

  return (
    <>
      <Header />

      <main className="min-h-svh px-[5vw] pb-24 pt-32 md:px-[6vw] md:pt-40">
        <div className="mx-auto max-w-3xl">
          <header className="pb-12 text-center md:pb-16">
            <div className="mx-auto mb-7 h-16 w-12 rounded-t-full border border-gold/50" />

            <p className={`${label} mb-5 text-gold`}>{eyebrow}</p>

            <h1 className="text-4xl font-extralight leading-[1.6] md:text-6xl">
              {title}
            </h1>

            {intro && (
              <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-mute">
                {intro}
              </p>
            )}
          </header>

          {children}

          <nav
            aria-label="صفحات راهنما"
            className="mt-16 flex flex-wrap justify-center gap-2.5 border-t border-line pt-10"
          >
            {helpPages
              .filter((page) => page.to !== pathname)
              .map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  className="rounded-full border border-line px-5 py-2 text-xs text-mute transition hover:border-gold hover:text-gold"
                >
                  {page.title}
                </Link>
              ))}
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function Block({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-10 md:grid-cols-[110px_1fr] md:gap-8">
      <span className="font-serif text-5xl font-extralight leading-none text-line md:text-6xl">
        {String(n).padStart(2, "0")}
      </span>

      <div>
        <h2 className="mb-4 text-xl font-light">{title}</h2>
        <div className="space-y-3 text-sm leading-8 text-mute">{children}</div>
      </div>
    </section>
  );
}
