import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  Heart,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

const menuItems = [
  { id: "profile", label: "اطلاعات شخصی", icon: UserRound },
  { id: "orders", label: "سفارش‌های من", icon: Package },
  { id: "addresses", label: "آدرس‌های من", icon: MapPin },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main dir="rtl" className="min-h-screen bg-bg px-5 pb-24 pt-32 md:px-[6vw]">
      <div className="mx-auto max-w-6xl">
        {/* Back to store */}
        <Link
          to="/"
          className="mb-12 inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold"
        >
          <ArrowLeft size={15} />
          بازگشت به فروشگاه
        </Link>

        {/* Page heading */}
        <header className="mb-12 border-b border-line pb-9">
          <span className="font-label text-[10px] tracking-[.25em] text-gold">
            MY ACCOUNT
          </span>

          <h1 className="mt-4 text-4xl font-extralight md:text-6xl">
            حساب <em>شخصی</em>
          </h1>

          <p className="mt-4 text-sm text-mute">فضای شخصی شما در NOIRÉ</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">
          {/* Sidebar */}
          <aside>
            <div className="mb-7 flex items-center gap-4 border-b border-line pb-7">
              <div className="flex size-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                <UserRound size={20} />
              </div>

              <div>
                <p className="text-sm">حساب کاربری</p>
                <p className="mt-1 text-xs text-mute">به NOIRÉ خوش آمدید</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-4 text-sm transition ${
                      isActive
                        ? "bg-gold/[0.08] text-gold"
                        : "text-mute hover:bg-white/[0.03] hover:text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} />
                      {item.label}
                    </span>

                    <ChevronLeft size={15} />
                  </button>
                );
              })}

              <Link
                to="/wishlist"
                className="flex items-center justify-between rounded-lg px-4 py-4 text-sm text-mute transition hover:bg-white/[0.03] hover:text-ink"
              >
                <span className="flex items-center gap-3">
                  <Heart size={17} />
                  علاقه‌مندی‌ها
                </span>

                <ChevronLeft size={15} />
              </Link>
            </nav>

            <div className="mt-8 border-t border-line pt-6">
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 text-xs text-mute transition hover:text-gold"
              >
                <LogOut size={16} />
                خروج از حساب
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0">
            {activeTab === "profile" && (
              <div>
                <div className="mb-10">
                  <h2 className="text-2xl font-extralight">اطلاعات شخصی</h2>

                  <p className="mt-3 text-xs text-mute">
                    اطلاعات حساب شما در این بخش نمایش داده می‌شود.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {["نام و نام خانوادگی", "شماره موبایل", "ایمیل"].map(
                    (field) => (
                      <div key={field} className="border-b border-line py-5">
                        <span className="text-xs text-mute">{field}</span>

                        <p className="mt-3 text-sm text-mute/50">
                          پس از ورود نمایش داده می‌شود
                        </p>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-8 border border-line/70 p-5 md:p-6">
                  <p className="text-sm">اطلاعات حساب شما</p>

                  <p className="mt-2 text-xs leading-7 text-mute">
                    پس از ورود به حساب کاربری، اطلاعات شخصی شما در این قسمت
                    نمایش داده خواهد شد.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-extralight">سفارش‌های من</h2>

                <div className="mt-10 flex min-h-[280px] flex-col items-center justify-center border border-line px-6 text-center">
                  <Package size={30} strokeWidth={1} className="text-gold" />

                  <p className="mt-6 text-base font-light">
                    هنوز سفارشی ثبت نکرده‌اید
                  </p>

                  <p className="mt-3 max-w-xs text-xs leading-7 text-mute">
                    سفارش‌های شما پس از ثبت خرید در این بخش نمایش داده می‌شوند.
                  </p>

                  <Link
                    to="/shop"
                    className="mt-7 inline-flex items-center gap-3 border-b border-gold pb-2 text-xs transition hover:gap-5 hover:text-gold"
                  >
                    مشاهده کالکشن
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className="text-2xl font-extralight">آدرس‌های من</h2>

                <div className="mt-10 flex min-h-[280px] flex-col items-center justify-center border border-line px-6 text-center">
                  <MapPin size={30} strokeWidth={1} className="text-gold" />

                  <p className="mt-6 text-base font-light">
                    هنوز آدرسی ثبت نشده است
                  </p>

                  <p className="mt-3 max-w-xs text-xs leading-7 text-mute">
                    آدرس‌های ارسال شما در آینده از این قسمت قابل مدیریت خواهند
                    بود.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
