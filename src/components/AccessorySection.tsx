import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { productTypes, products } from "../data/products";
import { h2, label } from "../ui/ui";

const eyebrow: Record<string, string> = {
  "dress-accessory": "FOR THE DRESS",
  "wearing-accessory": "FOR YOU",
};

export default function AccessorySection() {
  const groups = productTypes
    .filter((type) => type.value !== "dress")
    .map((type) => ({ ...type, items: products.filter((p) => p.type === type.value) }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section id="accessories" className="px-[6vw] pb-20 md:pb-32">
      <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-2 md:items-end">
        <span className={`${label} md:col-span-2`}>FINISHING TOUCHES</span>

        <h2 className={h2}>
          جزئیاتی که
          <br />
          <em>استایل را کامل می‌کنند.</em>
        </h2>

        <p className="text-xs leading-[2.4] text-mute md:justify-self-end">
          لباس، شروع داستان است.
          <br />
          اکسسوری، پایان‌بندی آن.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {groups.map((group, i) => (
          <Link
            key={group.value}
            to={`/shop?type=${group.value}`}
            className={`group relative block h-[440px] overflow-hidden rounded-t-full bg-[#191614] sm:h-[500px] md:h-[580px] ${
              i % 2 === 1 ? "md:mt-20" : ""
            }`}
          >
            <img
              src={group.items[0].image}
              alt={group.label}
              loading="lazy"
              className="size-full object-cover object-[center_30%] grayscale-[.35] brightness-75 transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-[.1] group-hover:brightness-[.85]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-bg/95 via-bg/40 to-transparent p-7 pt-28 text-center md:p-10 md:pt-32">
              <span className={`${label} text-[9px]`}>
                {String(i + 1).padStart(2, "0")} / {eyebrow[group.value]}
              </span>

              <h3 className="my-3 text-2xl font-light md:text-3xl">{group.label}</h3>

              <p className="mx-auto mb-5 max-w-xs text-xs leading-7 text-mute">{group.hint}</p>

              <span className="inline-flex items-center gap-2.5 text-[11px] text-gold transition-all group-hover:gap-4">
                مشاهده {group.items.length.toLocaleString("fa-IR")} محصول
                <ArrowLeft size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}