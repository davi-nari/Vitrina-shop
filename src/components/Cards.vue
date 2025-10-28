<script setup>
import { useFetchProductsStore } from "@/store/products";
import { onMounted, ref } from "vue";
import CardItem from "@/components/CardItem.vue";
import SkeletonCards from "@/components/SkeletonCards.vue";

const store = useFetchProductsStore();
const q = ref("");
const selected = ref("default");
const isSearch = ref(false);

onMounted(() => {
  store.fetchProducts();
});

const onSubmit = () => {
  store.search = q.value;
  isSearch.value = true;
  q.value = "";
};

const onSelect = () => {
  store.sortBy = selected.value;
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
        <option value="discount">По размеру скидки</option>
        <option value="expensive">Дороже</option>
        <option value="cheap">Дешевле</option>
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

    <h2 v-if="store.search">
      По вашему запросу
      {{ store.filteredAndSorted.length ? "найдено:" : "ничего не найдено" }}
    </h2>

    <div class="cards__box" v-auto-animate>
      <SkeletonCards v-if="store.isLoading" v-for="i in 10" :key="'sk' + i" />
      <CardItem
        v-else
        v-for="item in store.filteredAndSorted"
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
  overflow: hidden;

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
    column-gap: 24px;
  }
}

/* ---------- АДАПТИВ ---------- */

/* планшеты */
@media (max-width: 1200px) {
  .cards .cards__box {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* небольшие планшеты / большие телефоны */
@media (max-width: 992px) {
  .cards .cards__box {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* телефоны */
@media (max-width: 768px) {
  .cards .cards__box {
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
  }

  /* сортировка и поиск в столбик */
  .cards .cards__sorting {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    select {
      width: 100%;
    }

    &-search {
      width: 100%;
      padding: 6px 10px;

      input {
        flex: 1 1 auto;
        min-width: 0;
      }

      button {
        margin-right: 0;
      }
    }
  }
}

@media (max-width: 565px) {
  .cards .cards__box {
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
