import { create } from "zustand";

interface IProps {
  isFocused: boolean;
  toggleFocus: () => void;
}

export const useSearchFocused = create<IProps>((set, get) => ({
  isFocused: false,

  toggleFocus: () => {
    const { isFocused } = get();

    set({
      isFocused: !isFocused,
    });
  },
}));
