const WISHLIST_KEY = "noire-wishlist";

export function getWishlist(): string[] {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
}

export function isFavorite(productId: string): boolean {
  return getWishlist().includes(productId);
}

export function toggleWishlist(productId: string): string[] {
  const wishlist = getWishlist();

  const updatedWishlist = wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));

  window.dispatchEvent(new Event("wishlist-updated"));

  return updatedWishlist;
}

export function removeFromWishlist(productId: string): string[] {
  const updatedWishlist = getWishlist().filter((id) => id !== productId);

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));

  window.dispatchEvent(new Event("wishlist-updated"));

  return updatedWishlist;
}
