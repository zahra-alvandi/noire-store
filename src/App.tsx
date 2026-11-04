import { ArrowLeft, Sparkles } from "lucide-react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function App() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="editorial-hero">
        <div className="hero-copy">
          <span className="hero-kicker">NOIRÉ — COLLECTION 01</span>

          <h1>
            زیبایی،
            <br />
            در <em>سادگی</em> است.
          </h1>

          <p>
            انتخابی برای زنانی که نیازی به جلب توجه ندارند؛ حضورشان کافی‌ست.
          </p>

          <a href="#collection" className="hero-link">
            کشف کالکشن
            <ArrowLeft size={16} />
          </a>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1400&q=90"
            alt="NOIRÉ eveningwear collection"
          />

          <span className="image-caption">THE ART OF DRESSING</span>
        </div>
      </section>

      {/* Brand introduction */}
      <section className="intro-strip">
        <p>
          لباس فقط یک انتخاب نیست؛
          <strong> حسی‌ست که با خودت حمل می‌کنی.</strong>
        </p>

        <span>NOIRÉ / EST. 2026</span>
      </section>

      {/* Product collection */}
      <section className="collection section-shell" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED FOR YOUR MOMENTS</p>
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Stylist introduction */}
      <section className="stylist-banner" id="stylist">
        <div className="stylist-art">
          <span className="art-word">NOIRÉ</span>
          <span className="art-caption">
            YOUR PERSONAL
            <br />
            EVENING STYLIST
          </span>
        </div>

        <div className="stylist-copy">
          <p className="eyebrow">
            <Sparkles size={14} />
            NOIRÉ AI STYLIST
          </p>

          <h2>
            برای انتخاب لباس،
            <br />
            <em>تنها نمان.</em>
          </h2>

          <p>
            مناسبتت را بگو، از استایلیست هوشمند NOIRÉ پیشنهاد بگیر؛ انتخاب‌هایی
            که با سلیقه، بودجه و موجودی واقعی فروشگاه هماهنگ‌اند.
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
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <p className="eyebrow">A NOTE FROM NOIRÉ</p>

        <h2>
          برای خبرهای <em>خاص</em>، همراه ما باش.
        </h2>

        <p>کالکشن‌های تازه و انتخاب‌های ویژه، قبل از همه.</p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
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

      {/* Footer */}
      <footer className="footer">
        <a className="wordmark footer-logo" href="#">
          NOIRÉ<span>®</span>
        </a>

        <p>Elegance After Dark</p>

        <div className="footer-bottom">
          <span>© 2026 NOIRÉ. All rights reserved.</span>
          <span>ساخته‌شده برای لحظه‌های خاص</span>
        </div>
      </footer>
    </main>
  );
}
