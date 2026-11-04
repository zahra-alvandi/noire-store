import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <button className="icon-button mobile-menu" aria-label="منو">
          <Menu size={20} />
        </button>

        <nav className="nav-links">
          <Link to="/">صفحه اصلی</Link>
          <Link to="/shop">فروشگاه</Link>
          <Link to="/shop">تازه‌ترین‌ها</Link>
          <Link to="/shop">کالکشن</Link>
          <Link to="/#stylist">استایلیست هوشمند</Link>
        </nav>
      </div>

      <Link className="wordmark" to="/">
        NOIRÉ<span>®</span>
      </Link>

      <div className="header-actions">
        <button className="icon-button" aria-label="جستجو">
          <Search size={18} />
        </button>

        <button className="icon-button" aria-label="حساب کاربری">
          <UserRound size={18} />
        </button>

        <button className="icon-button" aria-label="علاقه‌مندی‌ها">
          <Heart size={18} />
        </button>

        <button className="icon-button" aria-label="سبد خرید">
          <ShoppingBag size={18} />
          <span className="bag-count">۰</span>
        </button>
      </div>
    </header>
  );
}
