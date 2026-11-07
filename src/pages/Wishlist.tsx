import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { products } from "../data/products";
import { getWishlist } from "../utils/wishlist";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { label, productGrid } from "../ui/ui";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>(getWishlist());

  useEffect(() => {
    const updateWishlist = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("wishlist-updated", updateWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", updateWishlist);
    };
  }, []);

  const favoriteProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <>
      <Header />

      <main dir="rtl" className="min-h-svh px-[5vw] pb-20 pt-32 md:px-[6vw]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center justify-between border-b border-line pb-6">
            <div>
              <p className={`${label} mb-3 text-gold`}>YOUR FAVORITES</p>

              <h1 className="text-3xl font-extralight md:text-5xl">
                علاقه‌مندی‌های شما
              </h1>

              <p className="mt-3 text-sm text-mute">
                {favoriteProducts.length} محصول ذخیره‌شده
              </p>
            </div>

            <Heart
              className="hidden text-gold md:block"
              size={30}
              strokeWidth={1}
            />
          </div>

          {favoriteProducts.length > 0 ? (
            <div className={productGrid}>
              {favoriteProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
              <Heart size={42} strokeWidth={1} className="mb-6 text-gold" />

              <h2 className="mb-3 text-xl font-light">
                هنوز محصولی ذخیره نکرده‌اید
              </h2>

              <p className="mb-8 text-sm text-mute">
                محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 rounded-full border border-gold px-7 py-3 text-sm transition hover:bg-gold hover:text-bg"
              >
                مشاهده فروشگاه
                <ArrowLeft size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
