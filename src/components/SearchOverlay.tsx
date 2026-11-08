import { Search, X, ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products, formatPrice } from "../data/products";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? products
        .filter((product) => {
          const normalizedQuery = query.trim().toLowerCase();

          return (
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.category.toLowerCase().includes(normalizedQuery)
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = query.trim();
    if (!value) return;

    onClose();
    navigate(`/shop?search=${encodeURIComponent(value)}`);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] overflow-y-auto bg-bg/95 backdrop-blur-md"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="جستجوی محصولات"
        dir="rtl"
        className="mx-auto min-h-full w-full max-w-3xl px-5 pb-12 pt-8 sm:px-8 md:pt-14"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="font-label text-[10px] tracking-[.2em] text-mute">
            NOIRÉ SEARCH
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جستجو"
            className="p-2 text-mute transition hover:text-gold"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={submitSearch}
          className="flex items-center gap-4 border-b border-gold/50 pb-4"
        >
          <Search size={20} className="shrink-0 text-gold" />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="دنبال چه لباسی می‌گردید؟"
            aria-label="جستجوی محصولات"
            className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-mute/70 sm:text-lg"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="پاک کردن جستجو"
              className="text-mute transition hover:text-gold"
            >
              <X size={17} />
            </button>
          )}
        </form>

        {query.trim() ? (
          <div className="mt-8">
            <p className="mb-5 text-xs text-mute">
              {results.length > 0
                ? `${results.length} نتیجه مرتبط`
                : "نتیجه‌ای پیدا نشد"}
            </p>

            <div className="flex flex-col">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 border-b border-line py-4 transition hover:text-gold"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-20 shrink-0 object-cover object-top"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{product.name}</p>
                    <p className="mt-1 text-xs text-mute">{product.category}</p>
                    <p className="mt-2 text-xs text-gold">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <ArrowLeft
                    size={16}
                    className="shrink-0 text-mute transition group-hover:-translate-x-1 group-hover:text-gold"
                  />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
              }}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-gold py-3.5 text-sm transition hover:bg-gold hover:text-bg"
            >
              مشاهده همه نتایج
              <ArrowLeft size={16} />
            </button>
          </div>
        ) : (
          <p className="mt-8 text-xs text-mute">
            نام لباس یا دسته‌بندی موردنظرت رو وارد کن.
          </p>
        )}
      </section>
    </div>
  );
}
