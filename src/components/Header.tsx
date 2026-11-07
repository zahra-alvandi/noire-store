import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../utils/cart";
import Spotlight from "./Spotlight";

const icon = "relative inline-flex p-1 transition hover:text-gold";
const nav = "transition hover:text-gold";

const navLinks = [
  { to: "/", label: "صفحه اصلی" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/shop", label: "تازه‌ترین‌ها" },
  { to: "/shop", label: "کالکشن" },
  { to: "/#stylist", label: "استایلیست هوشمند" },
];

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());

    updateCount();

    window.addEventListener("cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  // Close the sidebar whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  // While the sidebar is open: lock page scroll and let Esc close it
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <Spotlight />

      <header className="absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-[5vw] py-5 md:px-[6vw] md:py-7">
        <div>
          <button
            type="button"
            className={`${icon} lg:hidden`}
            aria-label="منو"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

          <nav className="hidden gap-6 text-xs text-mute lg:flex">
            {navLinks.map((item) => (
              <Link key={item.label} className={nav} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          to="/"
          className="font-serif text-lg tracking-[.2em] [direction:ltr] md:text-3xl"
        >
          NOIRÉ<span className="ms-0.5 align-top font-label text-[9px]">®</span>
        </Link>

        <div className="hidden md:flex items-center justify-end gap-3.5 md:gap-4">
          <button
            className={`${icon} hidden md:inline-flex`}
            aria-label="جستجو"
          >
            <Search size={18} />
          </button>

          <button
            className={`${icon} hidden md:inline-flex`}
            aria-label="حساب کاربری"
          >
            <UserRound size={18} />
          </button>

          <Link
            to="/wishlist"
            className={`${icon} hidden md:inline-flex`}
            aria-label="علاقه‌مندی‌ها"
          >
            <Heart size={18} />
          </Link>

          <Link to="/cart" className={icon} aria-label="سبد خرید">
            <ShoppingBag size={18} />
            <span className="absolute -end-2 -top-1.5 text-[11px] text-gold">
              {cartCount}
            </span>
          </Link>
        </div>

        <div className="flex md:hidden items-center justify-end gap-3.5 md:gap-4">
          <Link to="/cart" className={icon} aria-label="سبد خرید">
            <ShoppingBag size={18} />
            <span className="absolute -end-2 -top-1.5 text-[11px] text-gold">
              {cartCount}
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          aria-hidden
          onClick={closeMenu}
          className={`fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی"
          inert={!menuOpen}
          className={`fixed inset-y-0 start-0 z-[60] flex w-[84vw] max-w-sm flex-col rounded-e-[40px] border-e border-gold/20 bg-[#100e0c] px-7 pb-8 pt-6 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
            menuOpen
              ? "translate-x-0"
              : "ltr:-translate-x-full rtl:translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-serif text-lg tracking-[.2em] [direction:ltr]"
            >
              NOIRÉ
              <span className="ms-0.5 align-top font-label text-[9px]">®</span>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="بستن منو"
              className={icon}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto">
            {navLinks.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className="group flex items-baseline gap-4 border-b border-line py-4 text-lg font-extralight transition hover:text-gold"
              >
                <span className="font-label text-[10px] tracking-[.2em] text-mute [direction:ltr]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="transition-transform group-hover:-translate-x-1">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2.5 rounded-full border border-line py-3 transition hover:border-gold hover:text-gold"
            >
              <Heart size={16} />
              علاقه‌مندی‌ها
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2.5 rounded-full border border-gold bg-gold py-3 font-medium text-bg transition hover:border-ink hover:bg-ink"
            >
              <ShoppingBag size={16} />
              سبد خرید ({cartCount})
            </Link>

            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-full border border-line py-3 transition hover:border-gold hover:text-gold"
            >
              <Search size={16} />
              جستجو
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-full border border-line py-3 transition hover:border-gold hover:text-gold"
            >
              <UserRound size={16} />
              حساب کاربری
            </button>
          </div>

          <p className="mt-6 text-center font-label text-[9px] uppercase tracking-[.22em] text-mute [direction:ltr]">
            Elegance after dark
          </p>
        </aside>
      </div>
    </>
  );
}
