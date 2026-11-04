import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

const occasions = ["عروسی", "مهمانی شب", "کوکتل", "شام رسمی"];

export default function App() {
  const [occasion, setOccasion] = useState<string | null>(null);

  // Cursor-following light (see body::after in index.css)
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

      <section className="newsletter">
        <p className="mono">A NOTE FROM NOIRÉ</p>
        <h2>
          برای خبرهای <em>خاص</em>، همراه ما باش.
        </h2>
        <p>کالکشن‌های تازه و انتخاب‌های ویژه، قبل از همه.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("ثبت ایمیل در نسخه نمایشی است.");
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
      </section>

      <footer className="footer">
        <a className="footer-logo" href="#" aria-label="NOIRÉ">
          NOIRÉ
        </a>
        <div className="footer-bottom">
          <span className="mono">© 2026 NOIRÉ. All rights reserved.</span>
          <span>ساخته‌شده برای لحظه‌های خاص</span>
        </div>
      </footer>
    </main>
  );
}
