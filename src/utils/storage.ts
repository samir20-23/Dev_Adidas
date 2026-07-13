import type { Product } from '../data/products';

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export const getCart = (): CartItem[] =>
  JSON.parse(localStorage.getItem('cart') || '[]');

export const saveCart = (cart: CartItem[]) =>
  localStorage.setItem('cart', JSON.stringify(cart));

export const addToCart = (product: Product, size: number) => {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id && i.selectedSize === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, selectedSize: size, quantity: 1 });
  }
  saveCart(cart);
  window.dispatchEvent(new Event('cartUpdated'));
};

export const removeFromCart = (productId: number, size: number) => {
  saveCart(getCart().filter(i => !(i.id === productId && i.selectedSize === size)));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const updateQty = (productId: number, size: number, qty: number) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.selectedSize === size);
  if (item) item.quantity = qty;
  saveCart(cart);
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getWishlist = (): number[] =>
  JSON.parse(localStorage.getItem('wishlist') || '[]');

export const toggleWishlist = (productId: number) => {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) list.splice(idx, 1);
  else list.push(productId);
  localStorage.setItem('wishlist', JSON.stringify(list));
  window.dispatchEvent(new Event('wishlistUpdated'));
};

export const isWishlisted = (productId: number) =>
  getWishlist().includes(productId);
