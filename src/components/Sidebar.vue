<template>
  <aside class="filters">
    <h3 class="filters__title">Фильтры</h3>
    <div class="filters__sex">
      <h4 class="filters__title">Пол</h4>
      <div class="filters__btns">
        <button
          class="filters__button"
          @click="onFilterBySex(item.sex)"
          v-for="item in sex_filters"
          :key="item.sex"
          :class="{ active: selectedSex === item.sex }"
        >
          {{ item.key }}
        </button>
      </div>
    </div>
    <!-- <div class="filters__range">
      <label class="filters__title">Ценовой диапазон</label>
      <div ref="sliderEl" style="margin: 12px 0"></div>
      <div>{{ price[0] }}₽ — {{ price[1] }}₽</div>
    </div> -->
    <div class="filters__size">
      <h4 class="filters__title">Размер</h4>
      <div class="filters__btns">
        <button
          class="filters__button"
          v-for="item in store.sizes"
          :key="item"
          @click="onFilterBySize(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div class="filters__colors">
      <h4 class="filters__title">Цвет</h4>
      <div class="filters__btns">
        <button class="filters__colors-item">
          <span>
            <svg
              width="12"
              height="10"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.46875 3.97664L2.36659 5.87448L7.11118 1.12988"
                stroke="white"
                stroke-width="0.948919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
        <button class="filters__colors-item">
          <span>
            <svg
              width="12"
              height="10"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.46875 3.97664L2.36659 5.87448L7.11118 1.12988"
                stroke="white"
                stroke-width="0.948919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
        <button class="filters__colors-item">
          <span>
            <svg
              width="12"
              height="10"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.46875 3.97664L2.36659 5.87448L7.11118 1.12988"
                stroke="white"
                stroke-width="0.948919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import noUiSlider from "nouislider";

import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useFetchProductsStore } from "@/store/fetchProducts";

const store = useFetchProductsStore();

const sex_filters = reactive([
  { sex: "m", key: "Мужской" },
  { sex: "w", key: "Женский" },
  { sex: "uni", key: "Унисекс" },
]);

const sliderEl = ref(null);

const selectedSex = ref(null);

const onFilterBySex = (param) => {
  store.filterBySex(param);
  selectedSex.value = param;
};

const onFilterBySize = (val) => {
  store.setSize(val);
};

const colors = store.products?.forEach((item) => {
  item.color_code;
});

console.log(colors);

// const price = ref([1161, 11042]);

// onMounted(() => {
//   noUiSlider.create(sliderEl.value, {
//     start: price.value,
//     connect: true,
//     step: 200,
//     range: { min: 1161, max: 11042 },
//   });

//   sliderEl.value.noUiSlider.on("change", (values) => {
//     price.value = values.map((v) =>
//       Math.round(parseFloat(String(v).replace(/\s/g, "")))
//     );
//     console.log(price.value);
//   });
// });

// onBeforeUnmount(() => {
//   sliderEl.value?.noUiSlider?.destroy();
// });
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 275px;
  &__sex {
    .filters__button {
      padding: 8px 12px;
      &.active {
        background: #101010;
        color: white;
      }
    }
  }
  &__size {
    .filters__button {
      max-width: 85px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 12px;
    }
  }
  &__colors {
    &-item {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #c2c2c2;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;

      path {
        stroke: #eff1fe;
      }
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65%;
        height: 65%;
        background: red;
        border-radius: 50%;
      }
    }
  }
  &__title {
    font-weight: 600;
    line-height: 150%;
    color: #101010;
    font-size: 18px;
    margin-bottom: 8px;
  }
  &__button {
    background: white;
    border-radius: 16px;
    color: black;
    transition: 0.25s;
    align-items: center;
    border: 1px solid #c2c2c2;
    font-weight: 600;

    &:hover {
      border: 1px solid #101010;
    }
  }
  .filters__btns {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
  }
}
</style>
