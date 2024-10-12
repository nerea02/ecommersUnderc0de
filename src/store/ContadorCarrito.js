import { create } from "zustand";

export const useCountStore = create((set) => ({
  count: 0,
  sumar: () => set((state) => ({ count: state.count + 1,  })),
  restar: () => set((state) => ({ count: state.count - 1, })),
}));