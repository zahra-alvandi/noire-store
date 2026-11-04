import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

export default function Header() {
  return (
    <>
      <div className="announcement">
        برای لحظه‌هایی که فراموش نمی‌شوند · ارسال به سراسر ایران
      </div>

      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="منو">
          <Menu size={20} />
        </button>

        <nav className="nav-links">
          <a href="#new">تازه‌ترین‌ها</a>
          <a href="#collection">کالکشن</a>
          <a href="#stylist">استایلیست هوشمند</a>
        </nav>

        <a className="wordmark" href="#">
          NOIRÉ<span>®</span>
        </a>

        <div className="header-actions">
          <button className="icon-button" aria-label="جستجو">
            <Search size={19} />
          </button>

          <button className="icon-button" aria-label="حساب کاربری">
            <UserRound size={19} />
          </button>

          <button className="icon-button" aria-label="علاقه‌مندی‌ها">
            <Heart size={19} />
          </button>

          <button className="icon-button bag-button" aria-label="سبد خرید">
            <ShoppingBag size={19} />
            <span className="bag-count">۰</span>
          </button>
        </div>
      </header>
    </>
  );
}
