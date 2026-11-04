import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "dress-001",
    name: "پیراهن شب آوین",
    category: "پیراهن مجلسی",
    price: 4850000,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    badge: "تازه رسیده",
  },
  {
    id: "dress-002",
    name: "لباس ساتن آدرینا",
    category: "ساتن",
    price: 6200000,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "dress-003",
    name: "پیراهن مشکی سلین",
    category: "لباس شب",
    price: 5700000,
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85",
    badge: "پرفروش",
  },
  {
    id: "dress-004",
    name: "پیراهن بلند رُزا",
    category: "پیراهن بلند",
    price: 7100000,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=85",
  },
];

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;
}
