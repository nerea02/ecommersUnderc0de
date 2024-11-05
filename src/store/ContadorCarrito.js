import { create } from "zustand";

export const useCountStore = create((set) => ({
  productos: [], // Lista de productos en el carrito con cantidades
  agregarProducto: (nuevoProducto, cantidad) =>
    set((state) => {
      // Busca si el producto ya existe en el carrito
      const productoExistente = state.productos.find(
        (item) => item.producto.id === nuevoProducto.id
      );

      if (productoExistente) {
        // Si el producto ya existe, suma la cantidad especificada
        return {
          productos: state.productos.map((item) =>
            item.producto.id === nuevoProducto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          ),
        };
      } else {
        // Si el producto no existe, lo agrega con la cantidad especificada
        return {
          productos: [...state.productos, { producto: nuevoProducto, cantidad }],
        };
      }
    }),
  removerProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((item) => item.producto.id !== id),
    })),
  cantidadTotal: () =>
    set((state) =>
      state.productos.reduce((total, item) => total + item.cantidad, 0)
    ),
}));