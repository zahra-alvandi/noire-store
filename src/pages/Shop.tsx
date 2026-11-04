import { useMemo, useState } from "react";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const categories = [
    { label: "همه محصولات", value: "all" },
    { label: "لباس شب", value: "evening" },
    { label: "ساتن", value: "satin" },
    { label: "لباس مجلسی", value: "formal" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const occasion = searchParams.get("occasion");

  const occasionCategories: Record<string, string[]> = {
    wedding: ["formal", "satin"],
    party: ["evening", "satin"],
    formal: ["formal"],
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((product) => product.categoryKey === category);
    }

    if (occasion && occasionCategories[occasion]) {
      result = result.filter((product) =>
        occasionCategories[occasion].includes(product.categoryKey),
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, sort]);

  return (
    <>
      <Header />

      <main className="shop-page">
        <section className="shop-heading">
          <span className="mono">THE NOIRÉ COLLECTION</span>
          <h1>
            انتخاب‌هایی
            <br />
            <em>برای ماندن در خاطر.</em>
          </h1>
          <p>کالکشن لباس‌های شب و مجلسی NOIRÉ</p>
        </section>

        <section className="shop-toolbar">
          <div className="shop-categories">
            {categories.map((item) => (
              <button
                key={item.value}
                className={category === item.value ? "active" : ""}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="shop-sort">
            <ArrowDownUp size={15} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="مرتب‌سازی محصولات"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
            </select>
          </label>
        </section>

        <div className="shop-result-count">
          <span>{filteredProducts.length} محصول</span>
          <SlidersHorizontal size={15} />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid shop-grid">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        ) : (
          <p className="shop-empty">محصولی در این دسته پیدا نشد.</p>
        )}
      </main>
    </>
  );
}
