import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUI = defineStore("ui", () => {
  const isFiltersOpen = ref(false);
  const toggleFilters = () => (isFiltersOpen.value = !isFiltersOpen.value);
  const closeFilters = () => (isFiltersOpen.value = false);

  watch(isFiltersOpen, (v) => {
    document.documentElement.style.overflow = v ? "hidden" : "";
  });

  return { isFiltersOpen, toggleFilters, closeFilters };
});
