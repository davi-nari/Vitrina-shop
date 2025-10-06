import axios from "axios";
import { defineStore } from "pinia";
const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    sizesArr: [],
    search: "",
    selected: "",
    sex: "",
    sizesFilt: "",
  }),
  actions: {
    async fetchProducts() {
      const unique = new Set();
      try {
        const params = {};
        if (this.search.trim()) {
          params.name = `*${this.search.trim()}*`;
        }

        if (this.selected) {
          params.sortBy = `${this.selected}`;
        }

        if (this.sex) {
          params.sex = `${this.sex}`;
        }

        // if (this.sizesFilt) {
        //   params.sizes = `${this.sizes}`;
        // }

        const res = await axios.get(`${apiUrl}/products`, { params });
        this.products = res.data;

        // this.products.forEach((item) => {
        //   item.sizes.forEach((size) => {
        //     if (!uniqueMap.has(size)) {
        //       uniqueMap.set(size, true);
        //     }
        //   });
        // });

        for (const item of this.products) {
          for (const size of item.sizes ?? []) {
            unique.add(size);
          }
        }



        // this.sizes = [...new Set(this.products.flatMap(p => p.sizes ?? []))];

        this.sizes = Array.from(unique);
      } catch (err) {
        console.error("Ошибка: " + err);
      }
    },

    setSearch(v) {
      this.search = v;
      this.fetchProducts();
    },

    setSort(v) {
      this.selected = v;
      this.fetchProducts();
    },

    filterBySex(v) {
      this.sex = v;
      this.fetchProducts();
    },
    setPriceRange(arr) {
      console.log(arr);
    },

    setSize(v) {
      this.size = v;
      this.fetchProducts();
    },
  },
});

// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { ref, watch } from 'vue';
// import { FILTER_PARAM_MAP } from '@/filters.schema';
// import { buildParams, toSearchParams } from '@/params';

// const API = import.meta.env.VITE_API_URL;

// export const useProductsStore = defineStore('products', () => {
//   const items = ref([]);
//   const total = ref(0);
//   const isLoading = ref(false);
//   const error = ref(null);

//   const page = ref(1);
//   const limit = ref(20);
//   const sort = ref({ field: 'createdAt', order: 'desc' });

//   const filters = ref({
//     query: '',
//     gender: null,
//     size: null,
//     colors: [],
//     price: null, // { min: 0, max: 100 }
//   });

//   let abort = null;

//   async function fetchProducts() {
//     isLoading.value = true;
//     error.value = null;

//     if (abort) abort.abort();
//     abort = new AbortController();

//     const filterParams = buildParams(filters.value, FILTER_PARAM_MAP);
//     const base = {
//       _page: page.value,
//       _limit: limit.value,
//       _sort: sort.value.field,
//       _order: sort.value.order,
//       ...filterParams,
//     };
//     const params = toSearchParams(base);

//     try {
//       const res = await axios.get(`${API}/products`, {
//         params,
//         signal: abort.signal, // axios v1+ поддерживает AbortController
//       });
//       items.value = res.data;
//       total.value = Number(res.headers['x-total-count'] ?? res.data?.total ?? res.data?.length ?? 0);
//     } catch (e) {
//       // Игнорируем отменённые запросы
//       const isCanceled = e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED';
//       if (!isCanceled) error.value = e;
//     } finally {
//       isLoading.value = false;
//     }
//   }

//   // Автоперезапрос с дебаунсом при изменении фильтров/сортировки/страницы
//   let t;
//   watch([filters, page, limit, sort], () => {
//     clearTimeout(t);
//     t = setTimeout(fetchProducts, 250);
//   }, { deep: true });

//   // Утилиты для UI
//   function setFilters(partial) { Object.assign(filters.value, partial); page.value = 1; }
//   function setSort(field, order) { sort.value = { field, order }; page.value = 1; }
//   function setPage(p) { page.value = p; }
//   function setLimit(n) { limit.value = n; page.value = 1; }

//   // Первичная загрузка (по желанию)
//   // fetchProducts();

//   return {
//     items, total, isLoading, error,
//     filters, page, limit, sort,
//     fetchProducts, setFilters, setSort, setPage, setLimit,
//   };
// });
