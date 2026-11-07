import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { formatPrice } from "../data/products";
import { Link } from "react-router-dom";
import { isFavorite, toggleWishlist } from "../utils/wishlist";
import { archShape, lit } from "../ui/ui";

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const updateFavorite = () => {
      setFavorite(isFavorite(product.id));
    };

    updateFavorite();

    window.addEventListener("wishlist-updated", updateFavorite);

    return () => {
      window.removeEventListener("wishlist-updated", updateFavorite);
    };
  }, [product.id]);

  function handleFavorite() {
    const updatedWishlist = toggleWishlist(product.id);
    setFavorite(updatedWishlist.includes(product.id));
  }

  return (
    // every second card sits lower, so the grid doesn't look like a standard shop grid
    <article className="group even:mt-12 md:even:mt-24">
      <div className="mb-3.5 font-serif text-[40px] font-extralight leading-none text-line md:text-[64px]">
        {String(index).padStart(2, "0")}
      </div>

      <div className={`${archShape} bg-[#1a1816]`}>
        <Link
          to={`/product/${product.id}`}
          aria-label={`مشاهده ${product.name}`}
          className="block h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={lit}
          />
        </Link>

        {product.badge && (
          <span className="pointer-events-none absolute start-3 top-[18%] z-10 rounded-full border border-gold px-3 py-1.5 text-[10px] text-gold backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          aria-label="علاقه‌مندی‌ها"
          className="absolute bottom-3.5 end-3.5 z-10 grid size-9 place-items-center rounded-full border border-ink/35 bg-bg/45 backdrop-blur-sm transition hover:bg-gold hover:text-bg"
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex justify-between gap-2.5 pt-4">
        <div>
          <p className="mb-1.5 text-[10px] text-mute">{product.category}</p>

          <Link
            to={`/product/${product.id}`}
            className="transition hover:text-gold"
          >
            <h3 className="text-sm font-normal">{product.name}</h3>
          </Link>
        </div>

        <span className="whitespace-nowrap pt-4 text-[11px] text-gold">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}
