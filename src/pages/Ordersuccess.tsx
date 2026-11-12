import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";

import Header from "../components/Header";
import { formatPrice } from "../data/products";
import { getOrderById } from "../utils/orders";
import { label } from "../ui/ui";

export default function OrderSuccess() {
  const { id } = useParams();
  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <>
        <Header />

        <main className="grid min-h-svh place-content-center justify-items-center gap-6 px-6 pt-24 text-center">
          <h1 className="text-3xl font-extralight">سفارش پیدا نشد</h1>

          <Link to="/shop" className="border-b border-gold pb-1 text-gold">
            مشاهده فروشگاه
          </Link>
        </main>
      </>
    );
  }

  const paid = order.paymentStatus === "paid";

  return (
    <>
      <Header />

      <main className="min-h-svh px-[5vw] pb-20 pt-32 md:px-[6vw]">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 grid h-24 w-20 place-items-center rounded-t-full border border-gold text-gold">
              <Check size={28} strokeWidth={1.2} />
            </div>

            <p className={`${label} mb-3 text-gold`}>ORDER CONFIRMED</p>

            <h1 className="mb-4 text-3xl font-extralight md:text-5xl">
              سفارش شما ثبت شد
            </h1>

            <p className="text-sm text-mute">
              شماره سفارش:{" "}
              <span dir="ltr" className="text-ink">
                {order.id}
              </span>
            </p>
          </div>

          <section className="rounded-t-[48px] border border-line bg-[#141210] px-5 pb-8 pt-10 sm:px-10">
            <ul className="mb-6 space-y-4">
              {order.items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[3/4] w-14 rounded-t-full object-cover"
                  />

                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate">{item.name}</p>
                    <p className="text-xs text-mute">
                      سایز {item.size} · تعداد {item.quantity}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs text-gold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line pt-5 text-sm text-mute">
              <div className="flex justify-between gap-4">
                <span>جمع محصولات</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>{order.shippingTitle}</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>

              <div className="flex justify-between gap-4 border-t border-line pt-4 text-ink">
                <span>
                  {paid ? "مبلغ پرداخت‌شده" : "مبلغ قابل پرداخت هنگام تحویل"}
                </span>
                <span className="text-gold">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-line pt-6 text-xs leading-7 text-mute sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm text-ink">آدرس تحویل</p>
                {order.address.fullName} · {order.address.mobile}
                <br />
                {order.address.province}، {order.address.city}
                <br />
                {order.address.address}
                <br />
                کد پستی: {order.address.postalCode}
              </div>

              <div>
                <p className="mb-2 text-sm text-ink">پرداخت</p>
                {paid ? "پرداخت آنلاین (نمایشی) · موفق" : "پرداخت در محل"}
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/shop"
              className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-bg transition hover:bg-ink"
            >
              ادامه خرید
            </Link>

            <Link
              to="/account"
              className="rounded-full border border-line px-8 py-4 text-sm transition hover:border-gold hover:text-gold"
            >
              حساب کاربری
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
