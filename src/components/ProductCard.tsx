import { Heart, ArrowUpLeft } from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice } from "../data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          className="favorite-button"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart size={17} />
        </button>

        <button className="quick-view">
          مشاهده محصول
          <ArrowUpLeft size={15} />
        </button>
      </div>

      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>

          <h3>{product.name}</h3>
        </div>

        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
