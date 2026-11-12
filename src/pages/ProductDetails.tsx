import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus, ArrowRight, X } from "lucide-react";

import { products, formatPrice } from "../data/products";
import { saveCart } from "../utils/cart";
import { isFavorite, toggleWishlist } from "../utils/wishlist";
import Header from "../components/Header";
import { label } from "../ui/ui";

const sizeTable = [
  { size: 36, bust: 84, waist: 66, hip: 92 },
  { size: 38, bust: 88, waist: 70, hip: 96 },
  { size: 40, bust: 92, waist: 74, hip: 100 },
  { size: 42, bust: 96, waist: 78, hip: 104 },
  { size: 44, bust: 100, waist: 82, hip: 108 },
  { size: 46, bust: 104, waist: 86, hip: 112 },
];

const round = "h-[50px] md:h-[54px]";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const availableSizes = product?.sizes ?? [];

  const selectedStock = selectedSize
    ? (product?.sizeStock?.[selectedSize] ?? 0)
    : 0;

  const galleryImages = product
    ? [
        product.image,
        ...products
          .filter((item) => item.id !== product.id)
          .map((item) => item.image),
      ].slice(0, 4)
    : [];

  useEffect(() => {
    setSelectedImage(product?.image ?? "");
    setSelectedSize(null);
    setQuantity(1);
    setAdded(false);
    setCartError("");
  }, [product?.id, product?.image]);

  useEffect(() => {
    const updateFavorite = () => {
      setFavorite(isFavorite(product?.id ?? ""));
    };

    updateFavorite();

    window.addEventListener("wishlist-updated", updateFavorite);

    return () => {
      window.removeEventListener("wishlist-updated", updateFavorite);
    };
  }, [product?.id]);

  if (!product) {
    return (
      <>
        <Header />

        <main className="grid min-h-svh place-content-center justify-items-center gap-6 px-6 pt-24">
          <h1 className="text-3xl font-extralight">محصول پیدا نشد</h1>

          <Link to="/shop" className="border-b border-gold pb-1 text-gold">
            بازگشت به فروشگاه
          </Link>
        </main>
      </>
    );
  }

  function addToCart() {
    if (!product) return;

    if (!selectedSize) {
      setCartError("لطفاً ابتدا سایز موردنظر را انتخاب کنید.");
      return;
    }

    const stock = product.sizeStock?.[selectedSize] ?? 0;

    if (stock <= 0) {
      setCartError("این سایز در حال حاضر موجود نیست.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("noire-cart") || "[]");

    const existingItem = cart.find(
      (item: { productId: string; size: number }) =>
        item.productId === product.id && item.size === selectedSize,
    );

    const currentQuantity = existingItem?.quantity ?? 0;

    if (currentQuantity + quantity > stock) {
      const remaining = Math.max(0, stock - currentQuantity);

      setCartError(
        remaining > 0
          ? `فقط ${remaining} عدد دیگر از این سایز قابل سفارش است.`
          : "تمام موجودی این سایز در سبد خرید شما قرار دارد.",
      );

      return;
    }

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        size: selectedSize,
        quantity,
      });
    }

    saveCart(cart);
    setCartError("");
    setAdded(true);
  }

  function handleFavorite() {
    if (!product) return;

    const updatedWishlist = toggleWishlist(product.id);

    setFavorite(updatedWishlist.includes(product.id));
  }

  return (
    <>
      <Header />

      <main className="min-h-svh px-[5vw] pb-16 pt-24 md:px-[6vw] md:pb-24 md:pt-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-[1.05fr_.95fr] md:gap-[5vw]">
          {/* Product Information */}
          <section className="flex min-w-0 flex-col gap-7">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 self-start text-xs text-mute transition hover:text-gold"
            >
              <ArrowRight size={14} />
              بازگشت به فروشگاه
            </Link>

            {/* Product title and price */}
            <div>
              <p className={label}>NOIRÉ COLLECTION · {product.category}</p>

              <h1 className="mt-3 text-[32px] font-extralight leading-[1.5] tracking-[-.03em] md:text-[clamp(30px,4.2vw,56px)]">
                {product.name}
              </h1>

              <p className="mt-3 text-xl text-gold">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Size selection */}
            <div className="border-t border-line pt-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm">انتخاب سایز</h2>

                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-mute underline underline-offset-4 transition hover:text-gold"
                >
                  راهنمای سایز
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {availableSizes.map((size) => {
                  const stock = product.sizeStock?.[size] ?? 0;
                  const isAvailable = stock > 0;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      aria-pressed={selectedSize === size}
                      onClick={() => {
                        setSelectedSize(size);
                        setQuantity(1);
                        setAdded(false);
                        setCartError("");
                      }}
                      className="relative flex h-[50px] flex-col items-center justify-center rounded-b-sm rounded-t-full border border-line text-sm transition hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-bg disabled:cursor-not-allowed disabled:opacity-35 md:h-[54px]"
                    >
                      <span>{size}</span>

                      {!isAvailable && (
                        <span className="text-[9px] text-mute">ناموجود</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {availableSizes.length === 0 && (
                <p className="mt-3 text-xs text-mute">
                  سایزی برای این محصول تعریف نشده است.
                </p>
              )}

              {selectedSize && (
                <p className="mt-4 text-xs text-mute" aria-live="polite">
                  {selectedStock > 0
                    ? `موجودی این سایز: ${selectedStock} عدد`
                    : "این سایز موجود نیست."}
                </p>
              )}
            </div>

            {/* Quantity and cart */}
            <div>
              <div className="flex items-stretch gap-2 md:gap-2.5">
                {/* Quantity */}
                <div
                  role="group"
                  aria-label="تعداد"
                  className={`${round} inline-flex items-center rounded-full border border-line`}
                >
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid h-full w-10 place-items-center transition hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="کاهش تعداد"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="min-w-5 text-center text-sm">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    disabled={!selectedSize || quantity >= selectedStock}
                    onClick={() =>
                      setQuantity((q) => Math.min(selectedStock, q + 1))
                    }
                    className="grid h-full w-10 place-items-center transition hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="افزایش تعداد"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  type="button"
                  onClick={addToCart}
                  disabled={
                    !selectedSize ||
                    selectedStock <= 0 ||
                    quantity > selectedStock
                  }
                  className={`${round} flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-full border border-gold bg-gold text-sm font-medium text-bg transition enabled:hover:border-ink enabled:hover:bg-ink disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-mute`}
                >
                  <ShoppingBag size={17} />

                  {selectedSize
                    ? "افزودن به سبد خرید"
                    : "ابتدا سایز را انتخاب کنید"}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={handleFavorite}
                  aria-pressed={favorite}
                  title={
                    favorite
                      ? "حذف از علاقه‌مندی‌ها"
                      : "افزودن به علاقه‌مندی‌ها"
                  }
                  aria-label={
                    favorite
                      ? "حذف از علاقه‌مندی‌ها"
                      : "افزودن به علاقه‌مندی‌ها"
                  }
                  className={`${round} grid aspect-square flex-none place-items-center rounded-full border border-line transition hover:border-gold hover:text-gold aria-pressed:border-gold aria-pressed:text-gold`}
                >
                  <Heart size={18} fill={favorite ? "currentColor" : "none"} />
                </button>
              </div>

              <p
                aria-live="polite"
                className="mt-2.5 min-h-5 text-sm text-gold"
              >
                {added && "محصول با موفقیت به سبد خرید اضافه شد."}

                {cartError && <span className="text-red-400">{cartError}</span>}
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-line pt-5 text-xs leading-7 text-mute">
              <p>طراحی‌شده برای لحظه‌هایی که در خاطر می‌مانند.</p>

              <p className="mt-2">
                برای اطلاعات بیشتر درباره ارسال و شرایط بازگشت، به صفحات مربوطه
                مراجعه کنید.
              </p>
            </div>
          </section>

          {/* Product Gallery */}
          <div className="relative order-first min-w-0 md:order-last">
            {/* Main image */}
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-t-full bg-[#191614] md:max-w-none">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="h-[420px] w-full object-cover object-[center_25%] transition duration-500 md:h-[520px]"
              />

              {product.badge && (
                <span className="absolute start-4 top-5 z-10 rounded-full border border-gold px-3 py-1.5 text-[10px] text-gold backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2.5 md:mt-4 md:gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`نمایش تصویر ${index + 1}`}
                    aria-pressed={selectedImage === image}
                    className={`overflow-hidden border transition ${
                      selectedImage === image
                        ? "border-gold"
                        : "border-line hover:border-gold/60"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - تصویر ${index + 1}`}
                      className="h-[100px] w-full object-cover object-[center_25%] transition duration-500 hover:scale-105 md:h-[130px]"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-5 backdrop-blur-sm"
          onClick={() => setSizeGuideOpen(false)}
        >
          <div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[48px] border border-gold/30 bg-[#171614] p-6 pt-10 text-ink md:p-10 md:pt-12"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSizeGuideOpen(false)}
              aria-label="بستن راهنمای سایز"
              className="absolute left-5 top-5 text-mute transition hover:text-gold"
            >
              <X size={20} />
            </button>

            <p className={`${label} mb-3 text-gold`}>NOIRÉ FIT GUIDE</p>

            <h2
              id="size-guide-title"
              className="mb-4 text-2xl font-extralight md:text-3xl"
            >
              راهنمای انتخاب سایز
            </h2>

            <p className="mb-8 text-sm leading-7 text-mute">
              برای انتخاب سایز مناسب، اندازه‌های بدن خود را با جدول زیر مقایسه
              کنید.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-center text-sm">
                <thead>
                  <tr className="border-b border-gold/40 text-gold">
                    <th className="px-4 py-4 font-normal">سایز</th>

                    <th className="px-4 py-4 font-normal">دور سینه</th>

                    <th className="px-4 py-4 font-normal">دور کمر</th>

                    <th className="px-4 py-4 font-normal">دور باسن</th>
                  </tr>
                </thead>

                <tbody>
                  {sizeTable.map((item) => (
                    <tr
                      key={item.size}
                      className="border-b border-line text-ink/85"
                    >
                      <td className="px-4 py-4">{item.size}</td>

                      <td className="px-4 py-4">{item.bust}</td>

                      <td className="px-4 py-4">{item.waist}</td>

                      <td className="px-4 py-4">{item.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs leading-6 text-mute">
              تمام اندازه‌ها بر حسب سانتی‌متر هستند. این جدول فعلاً نمونه و فرضی
              است و برای انتخاب سایز نهایی باید با اندازه‌های واقعی برند جایگزین
              شود.
            </p>

            <button
              type="button"
              onClick={() => setSizeGuideOpen(false)}
              className="mt-8 w-full rounded-full border border-gold/50 py-3 text-sm transition hover:bg-gold hover:text-bg"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
}
