<script setup>
import { useFetchProductsStore } from "@/store/fetchProducts";
import { onMounted, ref } from "vue";
import CardItem from "@/components/CardItem.vue";

const store = useFetchProductsStore();
const q = ref("");
const selected = ref("default");
const isSearch = ref(false);

onMounted(() => {
  store.fetchProducts();
});

const onSubmit = () => {
  store.setSearch(q.value);
  isSearch.value = true;
  q.value = "";
};

const onSelect = () => {
  store.setSort(selected.value);
  console.log(selected.value);
};

const clearInput = () => {
  q.value = "";
  isSearch.value = false;
};
</script>

<template>
  <div class="cards">
    <div class="cards__sorting">
      <select @change="onSelect" v-model="selected">
        <option disabled value="default">Сортировка</option>
        <option value="-discount">По размеру скидки</option>
        <option value="-price">Дороже</option>
        <option value="price">Дешевле</option>
      </select>
      <form class="cards__sorting-search" @submit.prevent="onSubmit">
        <input type="text" placeholder="Поиск..." v-model="q" />
        <button type="submit">
          <img src="@/assets/icons/search.svg" alt="search" />
        </button>
        <button v-if="q.trim()">
          <img src="@/assets/icons/cross.svg" alt="clear" @click="clearInput" />
        </button>
      </form>
    </div>
    <h2 v-if="isSearch">
      По вашему запросу
      {{ store.products.length ? "найдено:" : "ничего не найдено" }}
    </h2>

    <div class="cards__box">
      <CardItem
        v-for="item in store.products"
        :key="item.id"
        :cardInfo="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  .cards__sorting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    select {
      background: #b3cdff;
      padding: 12px 18px;
      border-radius: 24px;
      border: 1px solid #c2c2c2;
    }
    &-search {
      display: flex;
      align-items: center;
      border: 1px solid #c2c2c2;
      padding: 8px 16px;
      border-radius: 24px;
      button {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-right: 6px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .cards__box {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 16px;
    column-gap: 12px;
  }
}
</style>
