export type ShippingId = "normal" | "express";
export type PaymentMethod = "online" | "cod";

export const shippingOptions = [
  { id: "normal", title: "ارسال عادی", eta: "۳ تا ۵ روز کاری", price: 150000 },
  {
    id: "express",
    title: "ارسال اکسپرس",
    eta: "۱ تا ۲ روز کاری",
    price: 350000,
  },
] as const;

export type Address = {
  fullName: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  note: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  size: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  userEmail?: string;
  items: OrderItem[];
  address: Address;
  shippingId: ShippingId;
  shippingTitle: string;
  shippingCost: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "pay-on-delivery";
  subtotal: number;
  total: number;
};

export function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

const clean = (value: string) => toEnglishDigits(value).replace(/[\s-]/g, "");

export function validateAddress(a: Address) {
  const e: Partial<Record<keyof Address, string>> = {};

  if (a.fullName.trim().length < 3)
    e.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
  if (!/^09\d{9}$/.test(clean(a.mobile)))
    e.mobile = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
  if (!a.province) e.province = "استان را انتخاب کنید.";
  if (a.city.trim().length < 2) e.city = "شهر را وارد کنید.";
  if (!/^\d{10}$/.test(clean(a.postalCode)))
    e.postalCode = "کد پستی باید ۱۰ رقم باشد.";
  if (a.address.trim().length < 10)
    e.address = "آدرس کامل (خیابان، پلاک، واحد) را وارد کنید.";

  return e;
}

export function normalizeAddress(a: Address): Address {
  return {
    ...a,
    fullName: a.fullName.trim(),
    mobile: clean(a.mobile),
    city: a.city.trim(),
    postalCode: clean(a.postalCode),
    address: a.address.trim(),
    note: a.note.trim(),
  };
}

const ORDERS_KEY = "noire-orders";

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getOrderById(id: string) {
  return getOrders().find((order) => order.id === id);
}

export function saveOrder(order: Order) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...getOrders()]));
  window.dispatchEvent(new Event("orders-updated"));
}

export function createOrderId() {
  return `NR-${Date.now().toString().slice(-7)}${Math.floor(Math.random() * 90 + 10)}`;
}
