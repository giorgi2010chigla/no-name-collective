import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";

type CartItem = Product & { quantity: number };
type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "no-name-cart";

function readStoredCart(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    setQuantities(readStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    }
  }, [quantities]);

  const items = useMemo(
    () =>
      products
        .map((product) => ({ ...product, quantity: quantities[product.id] ?? 0 }))
        .filter((item) => item.quantity > 0),
    [quantities],
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (product: Product) => {
    setQuantities((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
  };

  const removeItem = (id: string) => {
    setQuantities((current) => {
      const next = { ...current };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };

  const clearCart = () => setQuantities({});

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart outside CartProvider");
  return context;
}
