import { useMemo, useState } from "react";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useSearchParams } from "react-router-dom";
import { label, productGrid } from "../ui/ui";

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

      <main className="min-h-svh px-[5vw] pb-24 pt-28 md:px-[6vw] md:pt-36">
        <section className="pb-12 pt-6 text-center md:pb-20">
          <span className={label}>THE NOIRÉ COLLECTION</span>
          <h1 className="my-6 text-[clamp(42px,6vw,80px)] font-extralight leading-[1.6]">
            انتخاب‌هایی
            <br />
            <em>برای ماندن در خاطر.</em>
          </h1>
          <p className="text-xs text-mute">کالکشن لباس‌های شب و مجلسی NOIRÉ</p>
        </section>

        <section className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((item) => (
              <button
                key={item.value}
                aria-pressed={category === item.value}
                onClick={() => setCategory(item.value)}
                className="rounded-full border border-line px-5 py-2 text-xs text-mute transition hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-bg"
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2.5 text-mute">
            <ArrowDownUp size={15} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="مرتب‌سازی محصولات"
              className="cursor-pointer bg-transparent text-xs text-ink outline-none"
            >
              <option className="bg-bg" value="newest">
                جدیدترین
              </option>
              <option className="bg-bg" value="price-low">
                ارزان‌ترین
              </option>
              <option className="bg-bg" value="price-high">
                گران‌ترین
              </option>
            </select>
          </label>
        </section>

        <div className="flex items-center justify-between py-6 text-[11px] text-mute">
          <span>{filteredProducts.length} محصول</span>
          <SlidersHorizontal size={15} />
        </div>

        {filteredProducts.length > 0 ? (
          <div className={`${productGrid} pt-4`}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        ) : (
          <p className="py-24 text-center text-mute">
            محصولی در این دسته پیدا نشد.
          </p>
        )}
      </main>
    </>
  );
}
