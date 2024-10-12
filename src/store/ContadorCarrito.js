import { create } from "zustand";

export const useCountStore = create((set) => ({
  count: 0,
  sumar: (value) => set((state) => ({ count: state.count + value,  })),
  restar: (value) => set((state) => ({ count: state.count - value, })),
}));

export const useCargarTalle = create((set) => ({
  count: "",
  talle: (value) => set((state) => ({ count: state.count = value,  })),
  
}));