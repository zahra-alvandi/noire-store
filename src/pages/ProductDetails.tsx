import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus, ArrowRight } from "lucide-react";
import { products, formatPrice } from "../data/products";

const sizes = [36, 38, 40, 42, 44, 46];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#111110] text-[#f4f0e8] flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl">محصول پیدا نشد</h1>
        <Link to="/shop" className="text-[#c6a87c] underline">
          بازگشت به فروشگاه
        </Link>
      </main>
    );
  }

  function addToCart() {
    if (!selectedSize) return;

    const cart = JSON.parse(localStorage.getItem("noire-cart") || "[]");

    const existingItem = cart.find(
      (item: { productId: string; size: number }) =>
        item.productId === product.id && item.size === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        size: selectedSize,
        quantity,
      });
    }

    localStorage.setItem("noire-cart", JSON.stringify(cart));
    setAdded(true);
  }

  return (
    <main className="min-h-screen bg-[#111110] text-[#f4f0e8] px-5 md:px-12 pt-32 pb-20">
      <Link
        to="/shop"
        className="mb-10 inline-flex items-center gap-2 text-sm text-[#a6a29a] hover:text-[#c6a87c] transition"
      >
        <ArrowRight size={16} />
        بازگشت به فروشگاه
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover"
          />

          {product.badge && (
            <span className="absolute top-5 right-5 bg-[#c6a87c] text-[#111110] px-4 py-2 text-xs">
              {product.badge}
            </span>
          )}
        </div>

        <section className="flex flex-col items-start">
          <p className="text-xs tracking-[0.2em] text-[#c6a87c] mb-5">
            NOIRÉ COLLECTION
          </p>

          <p className="text-sm text-[#a6a29a]">{product.category}</p>

          <h1 className="text-3xl md:text-5xl font-light mt-3 mb-6">
            {product.name}
          </h1>

          <p className="text-xl text-[#c6a87c] mb-8">
            {formatPrice(product.price)}
          </p>

          <div className="w-full border-t border-white/10 pt-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm">انتخاب سایز</h2>
              <button className="text-xs text-[#a6a29a] underline">
                راهنمای سایز
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setAdded(false);
                  }}
                  className={`h-12 border text-sm transition ${
                    selectedSize === size
                      ? "border-[#c6a87c] bg-[#c6a87c] text-[#111110]"
                      : "border-white/15 hover:border-[#c6a87c]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between w-full mt-8">
            <span className="text-sm">تعداد</span>

            <div className="flex items-center border border-white/15">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:text-[#c6a87c]"
                aria-label="کاهش تعداد"
              >
                <Minus size={15} />
              </button>

              <span className="w-8 text-center">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:text-[#c6a87c]"
                aria-label="افزایش تعداد"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            disabled={!selectedSize}
            className="w-full mt-8 py-4 flex items-center justify-center gap-3 bg-[#c6a87c] text-[#111110] hover:bg-[#d5b991] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ShoppingBag size={18} />
            افزودن به سبد خرید
          </button>

          {added && (
            <p className="text-sm text-[#c6a87c] mt-4">
              محصول با موفقیت به سبد خرید اضافه شد.
            </p>
          )}

          <button
            className="mt-5 flex items-center gap-2 text-sm text-[#a6a29a] hover:text-[#c6a87c] transition"
            type="button"
          >
            <Heart size={17} />
            افزودن به علاقه‌مندی‌ها
          </button>

          <div className="mt-10 pt-6 border-t border-white/10 w-full text-sm leading-8 text-[#a6a29a]">
            <p>طراحی‌شده برای لحظه‌هایی که در خاطر می‌مانند.</p>
            <p>
              برای اطلاعات بیشتر درباره ارسال و شرایط بازگشت، به صفحات مربوطه
              مراجعه کنید.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
