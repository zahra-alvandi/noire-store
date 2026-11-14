import { Truck, Zap } from "lucide-react";
import PageShell, { Block } from "../components/PageShell";
import { formatPrice } from "../data/products";
import { siteInfo } from "../data/Siteinfo";
import { shippingOptions } from "../utils/orders";

export default function Shipping() {
  return (
    <PageShell
      eyebrow="SHIPPING & DELIVERY"
      title={
        <>
          ارسال به <em>سراسر ایران</em>
        </>
      }
      intro="سفارش شما با دقت بسته‌بندی می‌شود و در کوتاه‌ترین زمان به دستتان می‌رسد."
    >
      <Block n={1} title="آماده‌سازی سفارش">
        <p>
          پس از ثبت سفارش، آماده‌سازی و بسته‌بندی آن {siteInfo.processing} طول
          می‌کشد. در این مدت لباس شما یک‌بار دیگر بررسی می‌شود.
        </p>
      </Block>

      <Block n={2} title="روش‌ها و هزینه ارسال">
        <p>هنگام خرید می‌توانید یکی از دو روش زیر را انتخاب کنید:</p>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          {shippingOptions.map((option) => (
            <div key={option.id} className="rounded-3xl border border-line p-5">
              {option.id === "express" ? (
                <Zap size={20} className="mb-4 text-gold" />
              ) : (
                <Truck size={20} className="mb-4 text-gold" />
              )}

              <p className="text-sm text-ink">{option.title}</p>
              <p className="mt-1 text-xs">تحویل در {option.eta}</p>
              <p className="mt-4 text-sm text-gold">
                {formatPrice(option.price)}
              </p>
            </div>
          ))}
        </div>

        <p className="pt-2 text-xs">
          زمان تحویل، از لحظه ارسال سفارش حساب می‌شود.
        </p>
      </Block>

      <Block n={3} title="پیگیری سفارش">
        <p>
          پس از ثبت سفارش، شماره سفارش (مثل NR-1234567) به شما نمایش داده
          می‌شود. برای پیگیری یا هر سؤال دیگری، با این شماره از صفحه تماس با ما
          پیام بدهید.
        </p>
      </Block>

      <Block n={4} title="هنگام تحویل">
        <p>
          لطفاً هنگام تحویل، بسته را بررسی کنید. اگر بسته آسیب دیده بود یا مشکلی
          داشت، همان لحظه به ما اطلاع دهید.
        </p>
      </Block>
    </PageShell>
  );
}
