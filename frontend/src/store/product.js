import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (product) => set(product),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();

    if (response.ok) {
      set((state) => ({
        products: [...state.products, data],
      }));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  },

  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ products: data.data });
  },

  deleteProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      // update the ui by removing the deleted product imidiately
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();

    if (response.ok) {
      // update the ui by replacing the old product with the updated product
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  },
}));
