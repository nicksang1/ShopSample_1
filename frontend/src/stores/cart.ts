import { reactive } from "vue";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly itemCount: number;
}

export const cart: Cart = reactive<Cart>({
  items: [],

  addToCart(product: Product) {
    const existing = cart.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
  },

  increaseQty(id: string) {
    const item = cart.items.find((i) => i.id === id);
    if (item) item.quantity++;
  },

  decreaseQty(id: string) {
    const item = cart.items.find((i) => i.id === id);
    if (item && item.quantity > 1) item.quantity--;
  },

  removeItem(id: string) {
    cart.items = cart.items.filter((i) => i.id !== id);
  },

  get subtotal() {
    return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  get tax() {
    return cart.subtotal * 0.07;
  },

  get total() {
    return cart.subtotal + cart.tax;
  },
  get itemCount() {
    return this.items.reduce((acc: any, item: { quantity: any }) => acc + item.quantity, 0);
  },
});
