import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { label } from "../ui/ui";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="relative grid min-h-svh place-items-center overflow-hidden px-6 py-32 text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute select-none font-serif text-[clamp(180px,40vw,520px)] italic leading-none text-transparent [-webkit-text-stroke:1px_#26221e] [direction:ltr]"
        >
          404
        </span>

        <div className="relative">
          <div className="mx-auto mb-7 h-20 w-16 rounded-t-full border border-gold/50" />

          <p className={`${label} mb-4 text-gold`}>PAGE NOT FOUND</p>

          <h1 className="mb-4 text-3xl font-extralight md:text-5xl">
            این صفحه <em>وجود ندارد.</em>
          </h1>

          <p className="mx-auto mb-10 max-w-sm text-sm leading-8 text-mute">
            آدرسی که دنبالش بودید وجود ندارد یا جابه‌جا شده است.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-bg transition hover:bg-ink"
            >
              صفحه اصلی
            </Link>

            <Link
              to="/shop"
              className="rounded-full border border-line px-8 py-3.5 text-sm transition hover:border-gold hover:text-gold"
            >
              مشاهده فروشگاه
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
