import type { Product, ProductType } from "../types/product";

/*  One-size items (accessories)  */
export const ONE_SIZE = 1;

export const isOneSize = (product: Product) =>
  product.sizes?.length === 1 && product.sizes[0] === ONE_SIZE;

export const formatSize = (size: number) =>
  size === ONE_SIZE ? "یک‌سایز" : `سایز ${size}`;

export const inStock = (product: Product) =>
  Object.values(product.sizeStock ?? {}).some((count) => count > 0);

/*  Groups and sub-categories  */
export const productTypes: {
  value: ProductType;
  label: string;
  hint: string;
}[] = [
  { value: "dress", label: "لباس", hint: "پیراهن‌های شب و مجلسی" },
  {
    value: "dress-accessory",
    label: "اکسسوری لباس",
    hint: "شال، کمربند، دستکش و سنجاق؛ جزئیاتی که روی لباس می‌نشینند",
  },
  {
    value: "wearing-accessory",
    label: "اکسسوری",
    hint: "گوشواره، گردنبند، دستبند و کیف؛ همراه کامل هر استایل",
  },
];

export const categoriesByType: Record<
  ProductType,
  { label: string; value: string }[]
> = {
  dress: [
    { label: "لباس شب", value: "evening" },
    { label: "ساتن", value: "satin" },
    { label: "لباس مجلسی", value: "formal" },
  ],
  "dress-accessory": [
    { label: "شال و استول", value: "shawl" },
    { label: "کمربند", value: "belt" },
    { label: "دستکش", value: "gloves" },
    { label: "سنجاق سینه", value: "brooch" },
  ],
  "wearing-accessory": [
    { label: "گوشواره", value: "earrings" },
    { label: "گردنبند", value: "necklace" },
    { label: "دستبند", value: "bracelet" },
    { label: "کیف مجلسی", value: "bag" },
    { label: "اکسسوری مو", value: "hair" },
  ],
};

export const products: Product[] = [
  /*  Dresses  */
  {
    id: "dress-001",
    name: "پیراهن شب آوین",
    category: "پیراهن مجلسی",
    type: "dress",
    price: 4850000,
    image: "/images/dress-2.jpg",
    badge: "تازه رسیده",
    categoryKey: "evening",
    sizes: [36, 38, 40, 42],
    colors: ["black", "burgundy"],
    styleTags: ["classic", "delicate"],
    sizeStock: { 36: 2, 38: 0, 40: 3, 42: 1 },
  },
  {
    id: "dress-002",
    name: "لباس ساتن آدرینا",
    category: "ساتن",
    type: "dress",
    price: 6200000,
    image: "/images/dress-4.jpg",
    categoryKey: "satin",
    sizes: [36, 38, 40, 42],
    colors: ["black", "lavender", "lightblue"],
    styleTags: ["minimal", "delicate"],
    sizeStock: { 36: 0, 38: 2, 40: 1, 42: 0 },
  },
  {
    id: "dress-003",
    name: "پیراهن مشکی سلین",
    category: "لباس شب",
    type: "dress",
    price: 5700000,
    image: "/images/dress-1.jpg",
    badge: "پرفروش",
    categoryKey: "evening",
    sizes: [36, 38, 40, 42],
    colors: ["black"],
    styleTags: ["classic", "bold"],
    sizeStock: { 36: 1, 38: 2, 40: 0, 42: 2 },
  },
  {
    id: "dress-004",
    name: "پیراهن بلند رُزا",
    category: "پیراهن بلند",
    type: "dress",
    price: 7100000,
    image: "/images/dress-3.jpg",
    categoryKey: "formal",
    sizes: [36, 38, 40, 42],
    colors: ["black", "burgundy", "red"],
    styleTags: ["classic", "bold"],
    sizeStock: { 36: 3, 38: 1, 40: 2, 42: 0 },
  },

  /*  Dress accessories  */
  {
    id: "acc-shawl-001",
    name: "شال ساتن آیلین",
    category: "شال و استول",
    type: "dress-accessory",
    categoryKey: "shawl",
    price: 1850000,
    image: "/images/accessories/scarf-1.jpg",
    badge: "تازه رسیده",
    sizes: [ONE_SIZE],
    colors: ["ivory", "black"],
    sizeStock: { [ONE_SIZE]: 6 },
  },
  {
    id: "acc-belt-001",
    name: "کمربند زرین",
    category: "کمربند",
    type: "dress-accessory",
    categoryKey: "belt",
    price: 1200000,
    image: "/images/accessories/belt-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold", "black"],
    sizeStock: { [ONE_SIZE]: 4 },
  },
  {
    id: "acc-gloves-001",
    name: "دستکش بلند ساتن",
    category: "دستکش",
    type: "dress-accessory",
    categoryKey: "gloves",
    price: 950000,
    image: "/images/accessories/gloves-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["black", "ivory"],
    sizeStock: { [ONE_SIZE]: 2 },
  },
  {
    id: "acc-brooch-001",
    name: "سنجاق سینه مروارید",
    category: "سنجاق سینه",
    type: "dress-accessory",
    categoryKey: "brooch",
    price: 780000,
    image: "/images/accessories/brooch-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold", "ivory"],
    sizeStock: { [ONE_SIZE]: 5 },
  },

  /*  Wearing accessories  */
  {
    id: "acc-earrings-001",
    name: "گوشواره مروارید لونا",
    category: "گوشواره",
    type: "wearing-accessory",
    categoryKey: "earrings",
    price: 1400000,
    image: "/images/accessories/earrings-1.jpg",
    badge: "پرفروش",
    sizes: [ONE_SIZE],
    colors: ["ivory", "gold"],
    sizeStock: { [ONE_SIZE]: 8 },
  },
  {
    id: "acc-earrings-002",
    name: "گوشواره آویز زرین",
    category: "گوشواره",
    type: "wearing-accessory",
    categoryKey: "earrings",
    price: 1650000,
    image: "/images/accessories/earrings-2.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold"],
    sizeStock: { [ONE_SIZE]: 3 },
  },
  {
    id: "acc-necklace-001",
    name: "گردنبند ستاره",
    category: "گردنبند",
    type: "wearing-accessory",
    categoryKey: "necklace",
    price: 2300000,
    image: "/images/accessories/necklace-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold", "silver"],
    sizeStock: { [ONE_SIZE]: 5 },
  },
  {
    id: "acc-bracelet-001",
    name: "دستبند زنجیری",
    category: "دستبند",
    type: "wearing-accessory",
    categoryKey: "bracelet",
    price: 1100000,
    image: "/images/accessories/bracelet-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold", "silver"],
    sizeStock: { [ONE_SIZE]: 0 },
  },
  {
    id: "acc-bag-001",
    name: "کلاچ مجلسی شب",
    category: "کیف مجلسی",
    type: "wearing-accessory",
    categoryKey: "bag",
    price: 3200000,
    image: "/images/accessories/bag-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["black", "gold"],
    sizeStock: { [ONE_SIZE]: 2 },
  },
  {
    id: "acc-hair-001",
    name: "سنجاق و تاج مو",
    category: "اکسسوری مو",
    type: "wearing-accessory",
    categoryKey: "hair",
    price: 890000,
    image: "/images/accessories/hair-1.jpg",
    sizes: [ONE_SIZE],
    colors: ["gold", "ivory"],
    sizeStock: { [ONE_SIZE]: 7 },
  },
];

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;
}
