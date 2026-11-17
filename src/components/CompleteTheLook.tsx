import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import { inStock, products } from "../data/products";
import type { Product } from "../types/product";
import { h2, label, linkLine, productGrid } from "../ui/ui";

type CompleteTheLookProps = {
  product: Product;
};

export default function CompleteTheLook({ product }: CompleteTheLookProps) {
  const isDress = product.type === "dress";

  const related = useMemo(() => {
    if (!isDress) {
      return products
        .filter((p) => p.type === "dress" && inStock(p))
        .slice(0, 4);
    }

    const dressAccessories = products.filter(
      (p) => p.type === "dress-accessory" && inStock(p),
    );
    const wearing = products.filter(
      (p) => p.type === "wearing-accessory" && inStock(p),
    );

    const mixed: Product[] = [];

    for (
      let i = 0;
      mixed.length < 4 && (i < dressAccessories.length || i < wearing.length);
      i++
    ) {
      if (dressAccessories[i]) mixed.push(dressAccessories[i]);
      if (wearing[i] && mixed.length < 4) mixed.push(wearing[i]);
    }

    return mixed;
  }, [isDress]);

  if (related.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl border-t border-line pt-14 md:mt-28 md:pt-20">
      <div className="mb-10 flex flex-col items-start gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={label}>{isDress ? "COMPLETE THE LOOK" : "WORN WITH"}</p>

          <h2 className={`${h2} mt-3`}>
            {isDress ? (
              <>
                استایل را <em>کامل کن.</em>
              </>
            ) : (
              <>
                همراه با این <em>لباس‌ها.</em>
              </>
            )}
          </h2>
        </div>

        <Link
          to={isDress ? "/shop?type=dress-accessory" : "/shop?type=dress"}
          className={linkLine}
        >
          مشاهده همه
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className={productGrid}>
        {related.map((item, index) => (
          <ProductCard key={item.id} product={item} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
