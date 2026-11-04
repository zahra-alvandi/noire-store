import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const occasions = ["عروسی", "مهمانی شب", "کوکتل", "شام رسمی"];

export default function Home() {
  const [occasion, setOccasion] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const root = document.documentElement.style;
      root.setProperty("--x", `${e.clientX}px`);
      root.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <main>
      <Header />
      <section className="hero">
        <div>
          <span className="mono rise">NOIRÉ — COLLECTION 01</span>
          <h1 className="rise" style={{ "--d": 1 } as React.CSSProperties}>
            زیبایی،
            <br />
            در <em>سادگی</em> است.
          </h1>
          <p className="rise" style={{ "--d": 2 } as React.CSSProperties}>
            انتخابی برای زنانی که نیازی به جلب توجه ندارند؛ حضورشان کافی‌ست.
          </p>
          <a
            href="#collection"
            className="hero-link rise"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            کشف کالکشن
            <ArrowLeft size={16} />
          </a>
        </div>

        <div className="stage rise" style={{ "--d": 2 } as React.CSSProperties}>
          <div className="moon" />
          <div className="arch">
            <img
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1400&q=90"
              alt="NOIRÉ eveningwear collection"
            />
          </div>
        </div>

        <div className="hero-note">
          <span className="mono">ELEGANCE AFTER DARK</span>
          <span className="mono">SCROLL ↓</span>
        </div>
      </section>
      <section className="intro">
        <p>
          لباس فقط یک انتخاب نیست؛
          <br />
          <strong>حسی‌ست که با خودت حمل می‌کنی.</strong>
        </p>
        <span className="mono">NOIRÉ / EST. 2026</span>
      </section>
      {/* Occasion Categories */}
      <section className="occasions" id="occasions">
        <div className="occasions-heading">
          <span className="mono">DRESS FOR THE MOMENT</span>

          <h2>
            هر لحظه،
            <br />
            <em>انتخابی متفاوت.</em>
          </h2>

          <p>
            برای لحظه‌هایی که قرار است
            <br />
            به خاطره تبدیل شوند.
          </p>
        </div>

        <div className="occasion-grid">
          <a
            href="/shop?occasion=wedding"
            className="occasion-card occasion-wedding"
          >
            <img
              src="images/dress-1.jpg"
              alt="استایل مراسم و عروسی"
              loading="lazy"
            />

            <div className="occasion-content">
              <span className="mono">01 / SPECIAL CEREMONIES</span>
              <h3>مراسم و عروسی</h3>
              <span className="occasion-link">
                مشاهده انتخاب‌ها <ArrowLeft size={16} />
              </span>
            </div>
          </a>

          <a
            href="/shop?occasion=party"
            className="occasion-card occasion-party"
          >
            <img
              src="images/dress-2.jpg"
              alt="استایل مهمانی شبانه"
              loading="lazy"
            />

            <div className="occasion-content">
              <span className="mono">02 / EVENING MOMENTS</span>
              <h3>مهمانی شبانه</h3>
              <span className="occasion-link">
                مشاهده انتخاب‌ها <ArrowLeft size={16} />
              </span>
            </div>
          </a>

          <a
            href="/shop?occasion=formal"
            className="occasion-card occasion-formal"
          >
            <img src="images/dress-5.jpg" alt="استایل رسمی" loading="lazy" />

            <div className="occasion-content">
              <span className="mono">03 / TIMELESS ELEGANCE</span>
              <h3>استایل رسمی</h3>
              <span className="occasion-link">
                مشاهده انتخاب‌ها <ArrowLeft size={16} />
              </span>
            </div>
          </a>
        </div>
      </section>
      <section className="collection" id="collection">
        <div className="section-heading">
          <div>
            <p className="mono">CURATED FOR YOUR MOMENTS</p>
            <h2>
              انتخاب‌هایی <em>ماندگار</em>
            </h2>
          </div>
          <a className="text-link" href="#new">
            مشاهده محصولات
            <ArrowLeft size={16} />
          </a>
        </div>

        <div className="product-grid" id="new">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>
      </section>
      {/* Brand Story */}
      <section className="brand-story" id="about">
        <div className="brand-story-visual">
          <img
            src="images/dress-6.jpg"
            alt="NOIRÉ fashion editorial"
            loading="lazy"
          />

          <span className="brand-image-caption mono">THE NOIRÉ PHILOSOPHY</span>
        </div>

        <div className="brand-story-content">
          <span className="mono">BEYOND THE ORDINARY</span>

          <h2>
            زیبایی در جزئیات است؛
            <br />
            <em>نه در اغراق.</em>
          </h2>

          <p>
            در NOIRÉ، هر انتخاب با نگاهی به ظرافت، کیفیت و شخصیت منحصربه‌فرد شما
            شکل می‌گیرد. ما به زیبایی‌هایی باور داریم که نیازی به توضیح ندارند.
          </p>

          <a href="/about" className="hero-link">
            داستان NOIRÉ
            <ArrowLeft size={16} />
          </a>

          <span className="brand-story-signature">NOIRÉ®</span>
        </div>
      </section>
      <section className="stylist" id="stylist">
        <p className="mono">NOIRÉ AI STYLIST</p>
        <h2>
          برای انتخاب لباس،
          <br />
          <em>تنها نمان.</em>
        </h2>

        <div className="chips" role="group" aria-label="مناسبت">
          {occasions.map((o) => (
            <button
              key={o}
              className="chip"
              aria-pressed={occasion === o}
              onClick={() => setOccasion(occasion === o ? null : o)}
            >
              {o}
            </button>
          ))}
        </div>

        <p className="sub">
          {occasion
            ? `برای «${occasion}»، استایلیست هوشمند سه پیشنهاد آماده می‌کند.`
            : "مناسبتت را انتخاب کن؛ بقیه‌اش با سلیقه، بودجه و موجودی واقعی فروشگاه هماهنگ می‌شود."}
        </p>

        <button
          className="outline-button"
          onClick={() =>
            alert("استایلیست هوشمند در مراحل بعدی پیاده‌سازی می‌شود.")
          }
        >
          استایلیست هوشمند · به‌زودی
          <ArrowLeft size={16} />
        </button>
      </section>

      {/* Newsletter */}
      <section className="newsletter" id="newsletter">
        <span className="mono">A NOTE FROM NOIRÉ</span>

        <h2>
          گاهی یک خبر،
          <br />
          <em>شروع یک انتخاب است.</em>
        </h2>

        <p>از کالکشن‌های تازه و انتخاب‌های ویژه زودتر باخبر شو.</p>

        <form
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
          />

          <button type="submit">
            عضویت
            <ArrowLeft size={15} />
          </button>
        </form>

        <span className="newsletter-note">
          NO SPAM. ONLY THINGS WORTH YOUR TIME.
        </span>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href="#">
              NOIRÉ<span>®</span>
            </a>

            <p>
              ظرافت، فراتر از زمان.
              <br />
              انتخابی برای لحظه‌های خاص.
            </p>
          </div>

          <div className="footer-column">
            <h3>دسترسی سریع</h3>
            <a href="/shop">فروشگاه</a>
            <a href="/about">درباره ما</a>
            <a href="/#stylist">استایلیست هوشمند</a>
          </div>

          <div className="footer-column">
            <h3>راهنمای خرید</h3>
            <a href="/faq">سؤالات متداول</a>
            <a href="/shipping">ارسال و تحویل</a>
            <a href="/returns">شرایط بازگشت</a>
          </div>

          <div className="footer-column">
            <h3>ارتباط با ما</h3>
            <a href="/contact">تماس با ما</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              اینستاگرام
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono">© 2026 NOIRÉ. ALL RIGHTS RESERVED.</span>

          <span>ساخته‌شده برای لحظه‌های خاص</span>
        </div>
      </footer>
    </main>
  );
}
