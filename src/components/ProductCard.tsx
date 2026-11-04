import { Heart } from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice } from "../data/products";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article className="card">
      <div className="card-num">{String(index).padStart(2, "0")}</div>

      <div className="arch">
        <Link
          to={`/product/${product.id}`}
          aria-label={`مشاهده ${product.name}`}
        >
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        {product.badge && <span className="badge">{product.badge}</span>}

        <button
          className="fav"
          aria-label="افزودن به علاقه‌مندی‌ها"
          type="button"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="card-info">
        <div>
          <p>{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>

        <span className="price">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
