import { ref, computed } from "vue";
import axios from "axios";

import { defineStore } from "pinia";
const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchProductsStore = defineStore("products", () => {
  const products = ref([]);
  const isLoading = ref(false);

  const search = ref("");
  const gender = ref("");
  const size = ref("");
  const color = ref("");
  const sortBy = ref("");

  const fetchProducts = async () => {
    try {
      isLoading.value = true;
      const res = await axios.get(`${apiUrl}/products`);
      products.value = res.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const uniqueGenders = computed(() => {
    const s = new Map();
    products.value.forEach((p) => {
      if (p.sex && p.sex.val && p.sex.key) {
        s.set(p.sex.val, p.sex.key);
      }
    });
    return Array.from(s, ([val, key]) => ({ val, key }));
  });

  const uniqueSizes = computed(() => {
    const s = new Set();
    products.value.forEach((p) => p.sizes.forEach((v) => s.add(v)));
    return Array.from(s);
  });

  const uniqueColors = computed(() => {
    const s = new Set();
    products.value.forEach((p) => p.color_code && s.add(p.color_code));
    return Array.from(s);
  });

  const filteredAndSorted = computed(() => {
    const q = search.value.trim().toLowerCase();

    let list = products.value.filter((p) => {
      if (q && !(p.name || "").toLowerCase().includes(q)) return false;
      if (gender.value && (p.sex.val || "") !== gender.value) return false;
      if (size.value && !(p.sizes || []).includes(size.value)) return false;
      if (color.value && (p.color_code || "") !== color.value) return false;

      return true;
    });

    if (sortBy.value === "cheap") {
      list = [...list].sort((a, b) => a.final_price - b.final_price);
    } else if (sortBy.value === "expensive") {
      list = [...list].sort((a, b) => b.final_price - a.final_price);
    } else if (sortBy.value === "discount") {
      list = [...list].sort((a, b) => b.discount - a.discount);
    }

    return list;
  });

  const resetFilters = () => {
    search.value = "";
    gender.value = "";
    size.value = "";
    color.value = "";
    sortBy.value = "";
  };

  return {
    products,
    isLoading,
    search,
    gender,
    size,
    color,
    sortBy,
    uniqueGenders,
    uniqueSizes,
    uniqueColors,
    filteredAndSorted,
    fetchProducts,
    resetFilters,
  };
});
