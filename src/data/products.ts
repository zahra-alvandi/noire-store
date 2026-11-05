import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "dress-001",
    name: "پیراهن شب آوین",
    category: "پیراهن مجلسی",
    price: 4850000,
    image:
      "/images/dress-2.jpg",
    badge: "تازه رسیده",
    categoryKey: "evening",
  },
  {
    id: "dress-002",
    name: "لباس ساتن آدرینا",
    category: "ساتن",
    price: 6200000,
    image: "/images/dress-4.jpg",
    categoryKey: "satin",
  },
  {
    id: "dress-003",
    name: "پیراهن مشکی سلین",
    category: "لباس شب",
    price: 5700000,
    image: "/images/dress-1.jpg",
    badge: "پرفروش",
    categoryKey: "evening",
  },
  {
    id: "dress-004",
    name: "پیراهن بلند رُزا",
    category: "پیراهن بلند",
    price: 7100000,
    image: "/images/dress-3.jpg",
    categoryKey: "formal",
  },
];

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;
}
