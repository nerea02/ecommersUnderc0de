import { create } from "zustand";

// Estado para manejar el carrito de compras
export const useCarritoStore = create((set) => ({
  carrito: [], // El carrito inicial está vacío

  // Función para agregar un producto al carrito
  agregarProducto: (idProducto, idColor, cantidad) => set((state) => {
    const productoExistente = state.carrito.find(
      (item) => item.idProducto === idProducto && item.idColor === idColor
    );

    if (productoExistente) {
      // Si el producto ya existe, sumamos la cantidad
      productoExistente.cantidad += cantidad;
    } else {
      // Si no existe, agregamos el producto al carrito
      state.carrito.push({ idProducto, idColor, cantidad });
    }

    return { carrito: [...state.carrito] };
  }),

  // Función para eliminar un producto del carrito
  eliminarProducto: (idProducto, idColor) => set((state) => {
    const carritoActualizado = state.carrito.filter(
      (item) => item.idProducto !== idProducto || item.idColor !== idColor
    );
    return { carrito: carritoActualizado };
  }),

  // Función para actualizar la cantidad de un producto en el carrito
  actualizarCantidad: (idProducto, idColor, nuevaCantidad) => set((state) => {
    const carritoActualizado = state.carrito.map((item) => {
      if (item.idProducto === idProducto && item.idColor === idColor) {
        item.cantidad = nuevaCantidad;
      }
      return item;
    });
    return { carrito: carritoActualizado };
  }),

  // Función para obtener el carrito actual
  obtenerCarrito: () => set((state) => state.carrito),

  // Función para obtener la cantidad total de productos en el carrito
  obtenerCantidadTotal: () => set((state) => {
    // Sumamos la cantidad de todos los productos en el carrito
    console.log("Datos del carrito:", state.carrito);
    const total = state.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    return { cantidadTotal: total }; // Devolvemos la cantidad total
  }),
}));