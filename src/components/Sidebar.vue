<template>
  <!-- Оверлей только на мобилке, клик = закрыть -->
  <div
    class="filters-backdrop"
    v-if="ui.isFiltersOpen"
    @click="ui.closeFilters"
  ></div>

  <aside class="filters" :class="{ open: ui.isFiltersOpen }">
    <h3 class="filters__title">
      Фильтры
      <button
        title="Сбросить фильтры"
        class="main__btn"
        type="button"
        @click="store.resetFilters()"
      >
        Сбросить
      </button>
    </h3>

    <div class="filters__sex">
      <h4 class="filters__title">Пол</h4>
      <div class="filters__btns">
        <button
          class="filters__button"
          v-for="item in store.uniqueGenders"
          :key="item.val"
          @click="filterBySex(item.val)"
          :class="{ active: store.gender === item.val }"
          type="button"
        >
          {{ item.key }}
        </button>
      </div>
    </div>

    <div class="filters__size">
      <h4 class="filters__title">Размер</h4>
      <div class="filters__btns">
        <button
          class="filters__button"
          v-for="item in store.uniqueSizes"
          :key="item"
          @click="onFilterBySize(item)"
          :class="{ active: store.size === item }"
          type="button"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div class="filters__colors">
      <h4 class="filters__title">Цвет</h4>
      <div class="filters__btns">
        <button
          class="filters__colors-item"
          v-for="item in store.uniqueColors"
          :key="item"
          @click="filterByColor(item)"
          :class="{ active: store.color === item }"
          type="button"
        >
          <span :style="{ background: item }">
            <svg
              width="12"
              height="10"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.46875 3.97664L2.36659 5.87448L7.11118 1.12988"
                :stroke="item"
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
import { useFetchProductsStore } from "@/store/products";
import { useUI } from "@/store/ui";

const store = useFetchProductsStore();
const ui = useUI();

const onFilterBySize = (selectedSize) => {
  store.size = store.size === selectedSize ? null : selectedSize;
};
const filterBySex = (selectedGender) => {
  store.gender = store.gender === selectedGender ? null : selectedGender;
};
const filterByColor = (selectedColor) => {
  store.color = store.color === selectedColor ? null : selectedColor;
};
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 188px;
  width: 100%;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(88vw, 320px);
    max-width: 88vw;
    padding: 24px 16px;
    background: #fff;
    border-right: 1px solid #eaeaea;
    transform: translateX(-100%);
    transition: transform 0.28s ease;
    z-index: 1100; /* выше bottom-nav */
    overflow-y: auto;

    &.open {
      transform: translateX(0);
    }
  }

  &__sex {
    .filters__button {
      padding: 8px 12px;
      &.active {
        background: #101010;
        color: #fff;
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
      background: #fff;
      &:hover span {
        width: 100%;
        height: 100%;
      }
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65%;
        height: 65%;
        border-radius: 50%;
        transition: 0.25s;
      }
      &.active {
        span {
          width: 100%;
          height: 100%;
        }
        path {
          stroke: #eff1fe;
          mix-blend-mode: difference;
        }
      }
    }
  }
  &__title {
    font-weight: 600;
    line-height: 150%;
    color: #101010;
    font-size: 18px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
    .main__btn {
      padding: 8px 12px;
    }
  }
  &__button {
    background: #fff;
    border-radius: 16px;
    color: #000;
    transition: 0.25s;
    align-items: center;
    border: 1px solid #c2c2c2;
    font-weight: 600;
    &:hover {
      border: 1px solid #101010;
    }
    &.active {
      background: #101010;
      color: #fff;
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

/* затемнение под офф-канвас на мобилке */
.filters-backdrop {
  display: none;
}
@media (max-width: 768px) {
  .filters-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(1px);
    z-index: 1090;
  }
}
</style>
