import { useMemo, useState, useEffect } from "react";
import {
  ArrowDownUp,
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useSearchParams } from "react-router-dom";
import { label, productGrid } from "../ui/ui";

const categories = [
  { label: "همه محصولات", value: "all" },
  { label: "لباس شب", value: "evening" },
  { label: "ساتن", value: "satin" },
  { label: "لباس مجلسی", value: "formal" },
];

const occasionCategories: Record<string, string[]> = {
  wedding: ["formal", "satin"],
  party: ["evening", "satin"],
  formal: ["formal"],
};

const sizes = [36, 38, 40, 42, 44, 46];

const colorOptions = [
  { label: "مشکی", value: "black", color: "#171717" },
  { label: "عاجی", value: "ivory", color: "#e9dfcc" },
  { label: "زرشکی", value: "burgundy", color: "#702b3b" },
  { label: "طلایی", value: "gold", color: "#c8a97a" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const occasion = searchParams.get("occasion");
  const searchParam = searchParams.get("search") ?? "";

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

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

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((product) =>
        product.sizes?.some((size) => selectedSizes.includes(size)),
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.colors?.some((color) => selectedColors.includes(color)),
      );
    }

    if (minPrice !== "") {
      result = result.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    category,
    occasion,
    search,
    selectedSizes,
    selectedColors,
    minPrice,
    maxPrice,
    sort,
  ]);

  const activeFilters =
    selectedSizes.length +
    selectedColors.length +
    Number(minPrice !== "") +
    Number(maxPrice !== "");

  function toggleSize(size: number) {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  }

  function toggleColor(color: string) {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color],
    );
  }

  function resetFilters() {
    setCategory("all");
    setSearch("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
  }

  function FilterContent() {
    return (
      <div className="flex flex-col gap-8">
        {/* Sizes */}
        <section>
          <h3 className="mb-4 text-sm">سایز</h3>

          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSizes.includes(size)}
                onClick={() => toggleSize(size)}
                className="h-10 border border-line text-xs transition hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-bg"
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section>
          <h3 className="mb-4 text-sm">رنگ</h3>

          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => toggleColor(color.value)}
                aria-label={color.label}
                aria-pressed={selectedColors.includes(color.value)}
                title={color.label}
                className={`grid size-9 place-items-center rounded-full border transition ${
                  selectedColors.includes(color.value)
                    ? "border-gold ring-2 ring-gold/30"
                    : "border-line"
                }`}
              >
                <span
                  className="size-6 rounded-full border border-black/10"
                  style={{ backgroundColor: color.color }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Price */}
        <section>
          <h3 className="mb-4 text-sm">محدوده قیمت (تومان)</h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="از قیمت"
              aria-label="حداقل قیمت"
              className="min-w-0 rounded-full border border-line bg-transparent px-4 py-3 text-xs outline-none transition focus:border-gold"
            />

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="تا قیمت"
              aria-label="حداکثر قیمت"
              className="min-w-0 rounded-full border border-line bg-transparent px-4 py-3 text-xs outline-none transition focus:border-gold"
            />
          </div>
        </section>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center justify-center gap-2 border-b border-line pb-2 text-xs text-mute transition hover:border-gold hover:text-gold"
        >
          <RotateCcw size={13} />
          پاک‌کردن فیلترها
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-svh px-4 pb-20 pt-24 sm:px-6 md:px-[6vw] md:pb-24 md:pt-36">
        {/* Heading */}
        <section className="pb-10 pt-5 text-center sm:pb-14 md:pb-20">
          <span className={label}>THE NOIRÉ COLLECTION</span>

          <h1 className="my-5 text-[clamp(36px,7vw,80px)] font-extralight leading-[1.6]">
            انتخاب‌هایی
            <br />
            <em>برای ماندن در خاطر.</em>
          </h1>

          <p className="text-xs text-mute">کالکشن لباس‌های شب و مجلسی NOIRÉ</p>
        </section>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-3">
          <Search size={16} className="shrink-0 text-mute" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جست‌وجوی لباس..."
            aria-label="جست‌وجوی محصولات"
            className="w-full bg-transparent text-sm outline-none placeholder:text-mute/70"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="پاک کردن جست‌وجو"
              className="text-mute hover:text-gold"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category and sorting */}
        <section className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={category === item.value}
                onClick={() => setCategory(item.value)}
                className="shrink-0 rounded-full border border-line px-4 py-2.5 text-xs text-mute transition hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-bg sm:px-5"
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="flex shrink-0 items-center gap-2.5 text-mute">
            <ArrowDownUp size={15} />

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="مرتب‌سازی محصولات"
              className="cursor-pointer bg-transparent py-2 text-xs text-ink outline-none"
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

        {/* Product count and mobile filter */}
        <div className="flex items-center justify-between py-5 text-[11px] text-mute">
          <span>{filteredProducts.length} محصول</span>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 transition hover:border-gold hover:text-gold md:hidden"
          >
            <SlidersHorizontal size={14} />
            فیلترها
            {activeFilters > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-gold text-bg">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Desktop layout */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden md:block md:sticky md:top-24">
            <FilterContent />
          </aside>

          <section className="min-w-0">
            {filteredProducts.length > 0 ? (
              <div className={`${productGrid} pt-2`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index + 1}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-sm text-mute">
                  محصولی با این مشخصات پیدا نشد.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 border-b border-gold pb-1 text-xs text-gold"
                >
                  پاک‌کردن فیلترها
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setFilterOpen(false)}
        >
          <aside
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-label="فیلتر محصولات"
            className="absolute bottom-0 left-0 right-0 max-h-[85svh] overflow-y-auto rounded-t-[32px] border-t border-gold/30 bg-[#171614] px-6 pb-8 pt-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-lg font-light">فیلتر محصولات</h2>

              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                aria-label="بستن فیلترها"
                className="grid size-10 place-items-center rounded-full border border-line text-mute transition hover:border-gold hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>

            <FilterContent />

            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="mt-8 w-full rounded-full bg-gold py-4 text-sm text-bg transition hover:bg-ink"
            >
              نمایش {filteredProducts.length} محصول
            </button>
          </aside>
        </div>
      )}
    </>
  );
}
