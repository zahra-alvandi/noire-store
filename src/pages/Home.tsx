import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Stage from "../components/Stage";
import { products } from "../data/products";
import { h2, label, linkLine, pill, productGrid } from "../ui/ui";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const occasions = ["عروسی", "مهمانی شب", "کوکتل", "شام رسمی"];

const rise = "animate-rise motion-reduce:animate-none";

const occasionCard = "group relative block overflow-hidden bg-[#191614]";

const occasionImg =
  "size-full object-cover grayscale-[.35] brightness-75 transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-[.1] group-hover:brightness-[.8]";

const occasionText =
  "absolute inset-x-0 bottom-0 bg-linear-to-t from-bg/90 via-bg/15 to-transparent p-5 md:p-7";

const occasionLink =
  "inline-flex items-center gap-2.5 text-[11px] text-gold transition-all group-hover:gap-4";

const footLink = "text-[11px] text-mute transition hover:text-gold";
const footTitle = "mb-2 text-xs font-normal";

export default function Home() {
  const [occasion, setOccasion] = useState<string | null>(null);

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative grid min-h-svh grid-cols-1 items-center gap-[4vw] px-[6vw] pb-20 pt-28 md:grid-cols-[1.15fr_.85fr] md:pt-32">
        <div>
          <span className={`${label} ${rise}`}>NOIRÉ — COLLECTION 01</span>

          <h1
            className={`${rise} mt-5 text-[clamp(52px,8.4vw,130px)] font-extralight leading-[1.3] tracking-[-.045em] [animation-delay:130ms]`}
          >
            زیبایی،
            <br />
            در <em>سادگی</em> است.
          </h1>

          <p
            className={`${rise} mb-10 mt-7 max-w-[340px] text-[13px] leading-[2.4] text-mute [animation-delay:260ms]`}
          >
            انتخابی برای زنانی که نیازی به جلب توجه ندارند؛ حضورشان کافی‌ست.
          </p>

          <a
            href="#collection"
            className={`${rise} ${linkLine} [animation-delay:390ms]`}
          >
            کشف کالکشن
            <ArrowLeft size={16} />
          </a>
        </div>

        <Stage
          className={`${rise} mx-auto mt-8 w-full max-w-[340px] md:mt-0 md:max-w-[460px] [animation-delay:260ms]`}
          src="/images/dress-1.jpg"
          alt="NOIRÉ eveningwear collection"
        />

        <div className="mt-10 flex justify-between md:absolute md:inset-x-[6vw] md:bottom-7 md:mt-0">
          <span className={label}>ELEGANCE AFTER DARK</span>
          <span className={label}>SCROLL ↓</span>
        </div>
      </section>

      {/* Intro */}
      <section className="border-y border-line px-[6vw] py-20 text-center md:py-28">
        <p className="mx-auto mb-7 max-w-4xl text-[clamp(24px,3.6vw,52px)] font-extralight leading-[1.8]">
          لباس فقط یک انتخاب نیست؛
          <br />
          <strong className="font-light text-gold">
            حسی‌ست که با خودت حمل می‌کنی.
          </strong>
        </p>

        <span className={label}>NOIRÉ / EST. 2026</span>
      </section>

      {/* Occasion Categories */}
      <section id="occasions" className="px-[6vw] py-20 md:py-32">
        <div className="mb-12 grid gap-5 md:mb-14 md:grid-cols-2 md:items-end">
          <span className={`${label} md:col-span-2`}>DRESS FOR THE MOMENT</span>

          <h2 className={h2}>
            هر لحظه،
            <br />
            <em>انتخابی متفاوت.</em>
          </h2>

          <p className="text-xs leading-[2.4] text-mute md:justify-self-end">
            برای لحظه‌هایی که قرار است
            <br />
            به خاطره تبدیل شوند.
          </p>
        </div>

        <div className="grid gap-3.5 sm:gap-4 md:grid-cols-[1.15fr_.85fr] md:gap-7">
          {/* Wedding */}
          <a
            href="/shop?occasion=wedding"
            className={`${occasionCard} h-[320px] sm:h-[380px] md:row-span-2 md:h-[680px] md:rounded-t-full`}
          >
            <img
              src="/images/dress-1.jpg"
              alt="استایل مراسم و عروسی"
              loading="lazy"
              className={`${occasionImg} object-[center_30%]`}
            />

            <div className={`${occasionText} md:pb-14`}>
              <span className={`${label} text-[9px]`}>
                01 / SPECIAL CEREMONIES
              </span>

              <h3 className="my-3 text-xl font-light md:text-[25px]">
                مراسم و عروسی
              </h3>

              <span className={occasionLink}>
                مشاهده انتخاب‌ها
                <ArrowLeft size={16} />
              </span>
            </div>
          </a>

          {/* Evening party */}
          <a
            href="/shop?occasion=party"
            className={`${occasionCard} h-[320px] sm:h-[380px] md:h-[326px]`}
          >
            <img
              src="/images/dress-2.jpg"
              alt="استایل مهمانی شبانه"
              loading="lazy"
              className={occasionImg}
            />

            <div className={occasionText}>
              <span className={`${label} text-[9px]`}>
                02 / EVENING MOMENTS
              </span>

              <h3 className="my-3 text-xl font-light md:text-[25px]">
                مهمانی شبانه
              </h3>

              <span className={occasionLink}>
                مشاهده انتخاب‌ها
                <ArrowLeft size={16} />
              </span>
            </div>
          </a>

          {/* Formal */}
          <a
            href="/shop?occasion=formal"
            className={`${occasionCard} h-[320px] sm:h-[380px] md:h-[326px]`}
          >
            <img
              src="/images/dress-5.jpg"
              alt="استایل رسمی"
              loading="lazy"
              className={occasionImg}
            />

            <div className={occasionText}>
              <span className={`${label} text-[9px]`}>
                03 / TIMELESS ELEGANCE
              </span>

              <h3 className="my-3 text-xl font-light md:text-[25px]">
                استایل رسمی
              </h3>

              <span className={occasionLink}>
                مشاهده انتخاب‌ها
                <ArrowLeft size={16} />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="px-[6vw] pb-20 md:pb-32">
        <div className="mb-11 flex flex-col items-start gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={label}>CURATED FOR YOUR MOMENTS</p>

            <h2 className={`${h2} mt-3`}>
              انتخاب‌هایی <em>ماندگار</em>
            </h2>
          </div>

          <a
            href="#new"
            className="flex items-center gap-2.5 text-xs text-mute transition hover:text-gold"
          >
            مشاهده محصولات
            <ArrowLeft size={16} />
          </a>
        </div>

        <div id="new" className={productGrid}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section
        id="about"
        className="grid items-center gap-11 px-[6vw] py-20 md:grid-cols-2 md:gap-[9%] md:px-[10%] md:py-32"
      >
        <div className="group relative h-[430px] overflow-hidden rounded-t-full md:h-[650px]">
          <img
            src="/images/dress-6.jpg"
            alt="NOIRÉ fashion editorial"
            loading="lazy"
            className="size-full object-cover object-[center_30%] grayscale-[.5] brightness-80 transition duration-1000 group-hover:scale-[1.03]"
          />

          <span
            className={`${label} absolute bottom-5 start-1/2 -translate-x-1/2 text-ink/80`}
          >
            THE NOIRÉ PHILOSOPHY
          </span>
        </div>

        <div className="max-w-[480px]">
          <span className={label}>BEYOND THE ORDINARY</span>

          <h2 className="mb-6 mt-8 text-4xl font-extralight leading-[1.8] md:text-[clamp(36px,4.5vw,62px)]">
            زیبایی در جزئیات است؛
            <br />
            <em>نه در اغراق.</em>
          </h2>

          <p className="mb-9 text-[13px] leading-[2.7] text-mute">
            در NOIRÉ، هر انتخاب با نگاهی به ظرافت، کیفیت و شخصیت منحصربه‌فرد شما
            شکل می‌گیرد. ما به زیبایی‌هایی باور داریم که نیازی به توضیح ندارند.
          </p>

          <a href="/about" className={linkLine}>
            داستان NOIRÉ
            <ArrowLeft size={16} />
          </a>

          <span className="mt-16 block font-serif text-[28px] tracking-[.2em] text-gold [direction:ltr]">
            NOIRÉ®
          </span>
        </div>
      </section>

      {/* AI Stylist */}
      <section
        id="stylist"
        className="relative overflow-hidden bg-[#141210] px-[6vw] py-20 text-center md:py-32"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-serif text-[clamp(120px,26vw,420px)] italic tracking-[.08em] text-transparent [-webkit-text-stroke:1px_#26221e] [direction:ltr]"
        >
          NOIRÉ
        </span>

        <div className="relative">
          <p className={label}>NOIRÉ AI STYLIST</p>

          <h2 className={`${h2} mt-3`}>
            برای انتخاب لباس،
            <br />
            <em>تنها نمان.</em>
          </h2>

          <div
            role="group"
            aria-label="مناسبت"
            className="mb-3.5 mt-11 flex flex-wrap justify-center gap-3"
          >
            {occasions.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={occasion === o}
                onClick={() => setOccasion(occasion === o ? null : o)}
                className="rounded-full border border-line px-6 py-2.5 text-[13px] transition hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-bg"
              >
                {o}
              </button>
            ))}
          </div>

          <p className="mx-auto mb-8 min-h-6 max-w-md text-xs leading-7 text-mute">
            {occasion
              ? `برای «${occasion}»، استایلیست هوشمند سه پیشنهاد آماده می‌کند.`
              : "مناسبتت را انتخاب کن؛ بقیه‌اش با سلیقه، بودجه و موجودی واقعی فروشگاه هماهنگ می‌شود."}
          </p>

          <Link to="/stylist" className={pill}>
            استایلیست هوشمند
            <ArrowLeft size={16} />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        className="px-[6vw] pb-28 pt-28 text-center md:pt-32"
      >
        <span className={label}>A NOTE FROM NOIRÉ</span>

        <h2 className={`${h2} mt-6`}>
          گاهی یک خبر،
          <br />
          <em>شروع یک انتخاب است.</em>
        </h2>

        <p className="mt-3.5 text-xs text-mute">
          از کالکشن‌های تازه و انتخاب‌های ویژه زودتر باخبر شو.
        </p>

        <form
          className="mx-auto mt-9 flex max-w-[440px] border-b border-gold"
          onSubmit={(e) => {
            e.preventDefault();
            alert("خبرنامه در نسخه بعدی فعال خواهد شد.");
          }}
        >
          <input
            type="email"
            placeholder="آدرس ایمیل شما"
            aria-label="آدرس ایمیل"
            required
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[13px] outline-none placeholder:text-mute"
          />

          <button
            type="submit"
            className="flex items-center gap-2.5 text-xs transition hover:text-gold"
          >
            عضویت
            <ArrowLeft size={15} />
          </button>
        </form>

        <span className={`${label} mt-5 block text-[9px] tracking-[.15em]`}>
          NO SPAM. ONLY THINGS WORTH YOUR TIME.
        </span>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
