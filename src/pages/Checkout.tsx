import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Lock,
  Truck,
  Zap,
} from "lucide-react";

import Header from "../components/Header";
import { products, formatPrice } from "../data/products";
import { provinces } from "../data/provinces";
import { getCart, saveCart } from "../utils/cart";
import { useCheckoutUser } from "../utils/checkoutuser";
import {
  createOrderId,
  normalizeAddress,
  saveOrder,
  shippingOptions,
  validateAddress,
} from "../utils/orders";
import type {
  Address,
  Order,
  OrderItem,
  PaymentMethod,
  ShippingId,
} from "../utils/orders";
import { label } from "../ui/ui";

type StepNumber = 1 | 2 | 3;

const DRAFT_KEY = "noire-checkout-address";

const stepsMeta = [
  { n: 1, title: "آدرس" },
  { n: 2, title: "ارسال" },
  { n: 3, title: "پرداخت" },
] as const;

const input =
  "w-full rounded-full border border-line bg-transparent px-5 py-3.5 text-sm outline-none transition placeholder:text-mute/60 focus:border-gold aria-invalid:border-red-400/70";
const panel =
  "rounded-t-[56px] border border-line bg-[#141210] px-5 pb-8 pt-10 sm:px-10 sm:pt-12";
const primaryBtn =
  "inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-bg transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40";
const ghostBtn =
  "inline-flex items-center gap-2 text-xs text-mute transition hover:text-gold";
const choice =
  "flex w-full items-center gap-4 rounded-3xl border border-line p-4 text-start transition hover:border-gold/60 aria-checked:border-gold aria-checked:bg-gold/5 sm:p-5";

function loadDraft(): Address | null {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
  } catch {
    return null;
  }
}

function Field({
  id,
  text,
  error,
  children,
}: {
  id: string;
  text: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs text-mute">
        {text}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Summary({
  lines,
  subtotal,
  shippingCost,
  total,
}: {
  lines: OrderItem[];
  subtotal: number;
  shippingCost: number | null;
  total: number;
}) {
  return (
    <>
      <ul className="mb-6 space-y-4">
        {lines.map((line) => (
          <li
            key={`${line.productId}-${line.size}`}
            className="flex items-center gap-4"
          >
            <div className="relative flex-none">
              <img
                src={line.image}
                alt={line.name}
                className="aspect-[3/4] w-14 rounded-t-full object-cover"
              />
              <span className="absolute -end-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-gold text-[10px] text-bg">
                {line.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1 text-sm">
              <p className="truncate">{line.name}</p>
              <p className="text-xs text-mute">سایز {line.size}</p>
            </div>

            <span className="whitespace-nowrap text-xs text-gold">
              {formatPrice(line.price * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 border-t border-line pt-5 text-sm text-mute">
        <div className="flex justify-between gap-4">
          <span>جمع محصولات</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span>هزینه ارسال</span>
          <span>
            {shippingCost === null ? "در مرحله بعد" : formatPrice(shippingCost)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-4 border-t border-line pt-5">
        <span>مبلغ قابل پرداخت</span>
        <span className="text-gold">{formatPrice(total)}</span>
      </div>
    </>
  );
}

function Notice({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action: ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="grid min-h-svh place-content-center justify-items-center gap-5 px-6 pt-28 text-center">
        <div className="text-gold">{icon}</div>
        <h1 className="text-2xl font-extralight md:text-3xl">{title}</h1>
        <p className="max-w-sm text-sm leading-8 text-mute">{text}</p>
        {action}
      </main>
    </>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useCheckoutUser();

  const [cart] = useState(getCart);
  const [step, setStep] = useState<StepNumber>(1);
  const [showErrors, setShowErrors] = useState(false);
  const [shippingId, setShippingId] = useState<ShippingId>("normal");
  const [method, setMethod] = useState<PaymentMethod>("online");
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [payError, setPayError] = useState("");

  const [address, setAddress] = useState<Address>(
    () =>
      loadDraft() ?? {
        fullName: user?.name ?? "",
        mobile: user?.phone ?? "",
        province: "",
        city: "",
        postalCode: "",
        address: "",
        note: "",
      },
  );

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, gatewayOpen]);

  const lines = useMemo(
    () =>
      cart.flatMap((item) => {
        const product = products.find((p) => p.id === item.productId);

        return product
          ? [
              {
                productId: product.id,
                name: product.name,
                image: product.image,
                size: item.size,
                quantity: item.quantity,
                price: product.price,
              },
            ]
          : [];
      }),
    [cart],
  );

  // Stock is checked again here, because the cart may be old
  const issues = useMemo(
    () =>
      cart.flatMap((item) => {
        const product = products.find((p) => p.id === item.productId);

        if (!product) return ["یکی از محصولات سبد خرید دیگر موجود نیست."];

        const stock = product.sizeStock?.[item.size] ?? 0;

        return item.quantity > stock
          ? [
              stock > 0
                ? `«${product.name}» سایز ${item.size}: فقط ${stock} عدد موجود است.`
                : `«${product.name}» سایز ${item.size} ناموجود شده است.`,
            ]
          : [];
      }),
    [cart],
  );

  const errors = validateAddress(address);
  const shown = (field: keyof Address) =>
    showErrors ? errors[field] : undefined;

  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const shipping = shippingOptions.find((option) => option.id === shippingId)!;
  const shippingCost = step >= 2 ? shipping.price : null;
  const total = subtotal + (shippingCost ?? 0);

  function setField(field: keyof Address, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  function goToShipping() {
    setShowErrors(true);

    if (Object.keys(errors).length === 0) setStep(2);
  }

  function goToStep(target: StepNumber) {
    setGatewayOpen(false);
    setStep(target);
  }

  function placeOrder(paymentStatus: Order["paymentStatus"]) {
    const order: Order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      userEmail: user?.email,
      items: lines,
      address: normalizeAddress(address),
      shippingId,
      shippingTitle: shipping.title,
      shippingCost: shipping.price,
      paymentMethod: method,
      paymentStatus,
      subtotal,
      total: subtotal + shipping.price,
    };

    saveOrder(order);
    saveCart([]);
    navigate(`/order-success/${order.id}`, { replace: true });
  }

  function pay() {
    setPayError("");

    if (method === "cod") placeOrder("pay-on-delivery");
    else setGatewayOpen(true);
  }

  /* ---- Guards ---- */
  if (!isAuthenticated) {
    return (
      <Notice
        icon={<Lock size={34} strokeWidth={1} />}
        title="برای ادامه وارد شوید"
        text="برای تکمیل خرید ابتدا وارد حساب کاربری خود شوید. سبد خرید شما همین‌جا می‌ماند."
        action={
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/login"
              state={{ from: "/checkout" }}
              className={primaryBtn}
            >
              ورود به حساب کاربری
            </Link>
            <Link
              to="/register"
              state={{ from: "/checkout" }}
              className={ghostBtn}
            >
              حساب ندارم، ثبت‌نام
            </Link>
          </div>
        }
      />
    );
  }

  if (lines.length === 0) {
    return (
      <Notice
        icon={<Check size={34} strokeWidth={1} />}
        title="سبد خرید شما خالی است"
        text="برای ادامه، ابتدا چند محصول به سبد خرید اضافه کنید."
        action={
          <Link to="/shop" className={primaryBtn}>
            مشاهده فروشگاه
          </Link>
        }
      />
    );
  }

  if (issues.length > 0) {
    return (
      <Notice
        icon={<AlertTriangle size={34} strokeWidth={1} />}
        title="موجودی تغییر کرده است"
        text={issues.join(" ")}
        action={
          <Link to="/cart" className={primaryBtn}>
            اصلاح سبد خرید
          </Link>
        }
      />
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-svh px-[5vw] pb-20 pt-32 md:px-[6vw]">
        <div className="mx-auto max-w-6xl">
          <Link to="/cart" className={ghostBtn}>
            <ArrowRight size={14} />
            بازگشت به سبد خرید
          </Link>

          <p className={`${label} mb-4 mt-8 flex items-center gap-2 text-gold`}>
            <Lock size={12} />
            SECURE CHECKOUT
          </p>

          <h1 className="mb-8 text-4xl font-extralight md:text-6xl">
            تکمیل خرید
          </h1>

          {/* Steps */}
          <ol className="mb-8 flex items-center gap-3 text-xs md:mb-10">
            {stepsMeta.map((s, i) => (
              <li key={s.n} className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={s.n > step}
                  onClick={() => goToStep(s.n)}
                  aria-current={step === s.n ? "step" : undefined}
                  className="flex items-center gap-2.5 disabled:cursor-default"
                >
                  <span
                    className={`grid size-7 place-items-center rounded-full border text-[11px] transition ${
                      step === s.n
                        ? "border-gold bg-gold text-bg"
                        : step > s.n
                          ? "border-gold text-gold"
                          : "border-line text-mute"
                    }`}
                  >
                    {step > s.n ? (
                      <Check size={13} />
                    ) : (
                      s.n.toLocaleString("fa-IR")
                    )}
                  </span>

                  <span className={step === s.n ? "text-ink" : "text-mute"}>
                    {s.title}
                  </span>
                </button>

                {i < stepsMeta.length - 1 && (
                  <span className="h-px w-6 bg-line sm:w-12" />
                )}
              </li>
            ))}
          </ol>

          {/* Order summary on phones (collapsed) */}
          <details className="mb-6 rounded-3xl border border-line bg-[#141210] lg:hidden">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm">
              <span>خلاصه سفارش</span>
              <span className="text-gold">{formatPrice(total)}</span>
            </summary>

            <div className="border-t border-line p-5">
              <Summary
                lines={lines}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
              />
            </div>
          </details>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              {/* STEP 1: address */}
              {step === 1 && (
                <section className={panel}>
                  <h2 className="mb-8 text-xl font-light">آدرس تحویل</h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="fullName"
                      text="نام و نام خانوادگی"
                      error={shown("fullName")}
                    >
                      <input
                        id="fullName"
                        autoComplete="name"
                        value={address.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        aria-invalid={!!shown("fullName")}
                        className={input}
                      />
                    </Field>

                    <Field
                      id="mobile"
                      text="شماره موبایل"
                      error={shown("mobile")}
                    >
                      <input
                        id="mobile"
                        type="tel"
                        dir="ltr"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="09123456789"
                        value={address.mobile}
                        onChange={(e) => setField("mobile", e.target.value)}
                        aria-invalid={!!shown("mobile")}
                        className={`${input} text-end`}
                      />
                    </Field>

                    <Field id="province" text="استان" error={shown("province")}>
                      <select
                        id="province"
                        value={address.province}
                        onChange={(e) => setField("province", e.target.value)}
                        aria-invalid={!!shown("province")}
                        className={input}
                      >
                        <option value="" className="bg-bg">
                          انتخاب استان
                        </option>
                        {provinces.map((p) => (
                          <option key={p} value={p} className="bg-bg">
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="city" text="شهر" error={shown("city")}>
                      <input
                        id="city"
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={(e) => setField("city", e.target.value)}
                        aria-invalid={!!shown("city")}
                        className={input}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field
                        id="address"
                        text="آدرس کامل"
                        error={shown("address")}
                      >
                        <textarea
                          id="address"
                          rows={3}
                          autoComplete="street-address"
                          placeholder="خیابان، کوچه، پلاک، واحد"
                          value={address.address}
                          onChange={(e) => setField("address", e.target.value)}
                          aria-invalid={!!shown("address")}
                          className={`${input} rounded-3xl`}
                        />
                      </Field>
                    </div>

                    <Field
                      id="postalCode"
                      text="کد پستی"
                      error={shown("postalCode")}
                    >
                      <input
                        id="postalCode"
                        dir="ltr"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="1234567890"
                        value={address.postalCode}
                        onChange={(e) => setField("postalCode", e.target.value)}
                        aria-invalid={!!shown("postalCode")}
                        className={`${input} text-end`}
                      />
                    </Field>

                    <Field id="note" text="توضیحات سفارش (اختیاری)">
                      <input
                        id="note"
                        value={address.note}
                        onChange={(e) => setField("note", e.target.value)}
                        className={input}
                      />
                    </Field>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <button
                      type="button"
                      onClick={goToShipping}
                      className={primaryBtn}
                    >
                      ادامه و انتخاب نحوه ارسال
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 2: shipping */}
              {step === 2 && (
                <section className={panel}>
                  <h2 className="mb-6 text-xl font-light">نحوه ارسال</h2>

                  <div className="mb-8 flex items-start justify-between gap-4 rounded-3xl border border-line p-4 text-xs leading-7 text-mute">
                    <p>
                      {address.fullName} · {address.mobile}
                      <br />
                      {address.province}، {address.city}، {address.address}
                    </p>

                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="shrink-0 text-gold"
                    >
                      ویرایش
                    </button>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="نحوه ارسال"
                    className="space-y-3"
                  >
                    {shippingOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={shippingId === option.id}
                        onClick={() => setShippingId(option.id)}
                        className={choice}
                      >
                        {option.id === "express" ? (
                          <Zap size={20} className="text-gold" />
                        ) : (
                          <Truck size={20} className="text-gold" />
                        )}

                        <span className="flex-1">
                          <span className="block text-sm">{option.title}</span>
                          <span className="mt-1 block text-xs text-mute">
                            تحویل در {option.eta}
                          </span>
                        </span>

                        <span className="text-sm text-gold">
                          {formatPrice(option.price)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className={ghostBtn}
                    >
                      <ArrowRight size={14} />
                      مرحله قبل
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className={primaryBtn}
                    >
                      ادامه و پرداخت
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 3: payment (mock) */}
              {step === 3 && !gatewayOpen && (
                <section className={panel}>
                  <h2 className="mb-6 text-xl font-light">روش پرداخت</h2>

                  {payError && (
                    <p
                      role="alert"
                      className="mb-6 rounded-3xl border border-red-400/40 p-4 text-sm leading-7 text-red-400"
                    >
                      {payError}
                    </p>
                  )}

                  <div
                    role="radiogroup"
                    aria-label="روش پرداخت"
                    className="space-y-3"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={method === "online"}
                      onClick={() => setMethod("online")}
                      className={choice}
                    >
                      <CreditCard size={20} className="text-gold" />

                      <span className="flex-1">
                        <span className="block text-sm">پرداخت آنلاین</span>
                        <span className="mt-1 block text-xs text-mute">
                          انتقال به درگاه پرداخت (نسخه نمایشی)
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      role="radio"
                      aria-checked={method === "cod"}
                      onClick={() => setMethod("cod")}
                      className={choice}
                    >
                      <Banknote size={20} className="text-gold" />

                      <span className="flex-1">
                        <span className="block text-sm">پرداخت در محل</span>
                        <span className="mt-1 block text-xs text-mute">
                          هنگام تحویل سفارش پرداخت کنید
                        </span>
                      </span>
                    </button>
                  </div>

                  <p className="mt-6 text-xs leading-7 text-mute">
                    این یک نسخه آزمایشی است و هیچ مبلغی از حساب شما کسر نمی‌شود.
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className={ghostBtn}
                    >
                      <ArrowRight size={14} />
                      مرحله قبل
                    </button>

                    <button type="button" onClick={pay} className={primaryBtn}>
                      {method === "online" ? "پرداخت " : "ثبت سفارش "}
                      {formatPrice(total)}
                    </button>
                  </div>
                </section>
              )}

              {/* Mock payment gateway */}
              {step === 3 && gatewayOpen && (
                <section className={`${panel} text-center`}>
                  <CreditCard
                    size={32}
                    strokeWidth={1}
                    className="mx-auto mb-5 text-gold"
                  />

                  <p className={`${label} mb-3`}>MOCK PAYMENT GATEWAY</p>

                  <h2 className="mb-3 text-xl font-light">
                    درگاه پرداخت (نمایشی)
                  </h2>

                  <p className="mb-8 text-sm text-mute">
                    مبلغ قابل پرداخت:{" "}
                    <span className="text-gold">{formatPrice(total)}</span>
                  </p>

                  <div className="mx-auto flex max-w-sm flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => placeOrder("paid")}
                      className={primaryBtn}
                    >
                      شبیه‌سازی پرداخت موفق
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setGatewayOpen(false);
                        setPayError(
                          "پرداخت ناموفق بود یا لغو شد. مبلغی از حساب شما کسر نشده است؛ می‌توانید دوباره تلاش کنید.",
                        );
                      }}
                      className="rounded-full border border-line px-8 py-4 text-sm transition hover:border-red-400/60 hover:text-red-400"
                    >
                      شبیه‌سازی پرداخت ناموفق
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* Order summary on desktop */}
            <aside className="sticky top-28 hidden h-fit rounded-t-[40px] border border-line bg-[#141210] p-6 pt-9 lg:block">
              <h2 className="mb-6 text-lg font-light">خلاصه سفارش</h2>

              <Summary
                lines={lines}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
