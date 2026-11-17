export type ProductType = "dress" | "dress-accessory" | "wearing-accessory";

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  type: ProductType;
  price: number;
  image: string;
  badge?: string;
  sizes?: number[];
  sizeStock?: Record<number, number>;
  colors?: string[];
  styleTags?: string[];
};
