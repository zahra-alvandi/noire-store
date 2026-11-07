import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../utils/cart";
import Spotlight from "./Spotlight";

const icon = "relative inline-flex p-1 transition hover:text-gold";
const nav = "transition hover:text-gold";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

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

  return (
    <>
      <Spotlight />

      <header className="absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-[5vw] py-5 md:px-[6vw] md:py-7">
        <div>
          <button className={`${icon} lg:hidden`} aria-label="منو">
            <Menu size={20} />
          </button>

          <nav className="hidden gap-6 text-xs text-mute lg:flex">
            <Link className={nav} to="/">صفحه اصلی</Link>
            <Link className={nav} to="/shop">فروشگاه</Link>
            <Link className={nav} to="/shop">تازه‌ترین‌ها</Link>
            <Link className={nav} to="/shop">کالکشن</Link>
            <Link className={nav} to="/#stylist">استایلیست هوشمند</Link>
          </nav>
        </div>

        <Link to="/" className="font-serif text-2xl tracking-[.2em] [direction:ltr] md:text-3xl">
          NOIRÉ<span className="ms-0.5 align-top font-label text-[9px]">®</span>
        </Link>

        <div className="flex items-center justify-end gap-3.5 md:gap-4">
          <button className={`${icon} hidden md:inline-flex`} aria-label="جستجو">
            <Search size={18} />
          </button>

          <button className={`${icon} hidden md:inline-flex`} aria-label="حساب کاربری">
            <UserRound size={18} />
          </button>

          <Link to="/wishlist" className={icon} aria-label="علاقه‌مندی‌ها">
            <Heart size={18} />
          </Link>

          <Link to="/cart" className={icon} aria-label="سبد خرید">
            <ShoppingBag size={18} />
            <span className="absolute -end-2 -top-1.5 text-[11px] text-gold">{cartCount}</span>
          </Link>
        </div>
      </header>
    </>
  );
}