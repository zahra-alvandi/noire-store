export type CartItem = {
  productId: string;
  size: number;
  quantity: number;
};

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("noire-cart") || "[]");
}

export function getCartCount(): number {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("noire-cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));
}
