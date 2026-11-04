import { Heart } from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice } from "../data/products";

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article className="card">
      <div className="card-num">{String(index).padStart(2, "0")}</div>

      <div className="arch">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className="fav" aria-label="افزودن به علاقه‌مندی‌ها">
          <Heart size={16} />
        </button>
      </div>

      <div className="card-info">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="price">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
