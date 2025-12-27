import { create } from "zustand";
import { IProduct } from "@/types/products";

interface ICart {
  carts: IProduct[];
  handleAddToCart: (product: IProduct) => void;
  handleDeleteFromCart: (product: IProduct) => void;
  handleDeleteProduct: (product: IProduct) => void;
}

export const useCartsStore = create<ICart>((set, get) => ({
  carts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carts") || "[]")
      : [],

  handleAddToCart: (product: IProduct) => {
    const { carts } = get();

    const updated = carts.some((item) => item.id === product.id)
      ? carts.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      : [{ ...product, count: 1 }, ...carts];

    set({ carts: updated });
    localStorage.setItem("carts", JSON.stringify(updated));
  },

  handleDeleteFromCart: (product: IProduct) => {
    const { carts } = get();
    const inCart = carts.find((el) => el.id == product.id);

    let updated;

    if (inCart?.count === 1) {
      updated = carts.filter((el) => el.id !== product.id);
    } else {
      updated = carts.map((el) =>
        el.id == product.id ? { ...el, count: el.count - 1 } : el
      );
    }

    set({ carts: updated });
    localStorage.setItem("carts", JSON.stringify(updated));
  },

  handleDeleteProduct: (product: IProduct) => {
    const { carts } = get();

    let updated = carts.filter((el) => el.id != product.id);

    set({ carts: updated });
    localStorage.setItem("carts", JSON.stringify(updated));
  },
}));
