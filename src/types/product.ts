export type Product = {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  price: number;
  image: string;
  badge?: string;
  sizes?: number[];
  sizeStock?: Record<number, number>;
  colors?: string[];
  styleTags?: string[];
};
