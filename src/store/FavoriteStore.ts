import { IProduct } from "@/types/products";
import { create } from "zustand";

interface FavoriteState {
  favorites: IProduct[];
  toggleToFavorite: (product: IProduct) => void;
}

const getInitialFavorites = (): IProduct[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("favorites");
  if (stored) return JSON.parse(stored);

  return [];
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: getInitialFavorites(),

  toggleToFavorite: (product: IProduct) => {
    const current = get().favorites;
    const inCart = current.find((el) => el.id == product.id);

    let updated: IProduct[] = [];

    if (inCart) {
      updated = current.filter((p) => p.id !== product.id);
    } else {
      updated = [...current, product];
    }

    set({
      favorites: updated,
    });
    localStorage.setItem("favorites", JSON.stringify(updated));
  },
}));
