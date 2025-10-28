<template>
  <section class="catalog">
    <div class="plug">
      <p>В разработке</p>
    </div>

    <h1>Каталог</h1>

    <table v-if="store.products?.length">
      <thead>
        <tr>
          <th>№</th>
          <th>Фото</th>
          <th>Название</th>
          <th>Сумма</th>
          <th>Кол-во</th>
          <th>Применить</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(p, i) in store.products" :key="p.id || p.name">
          <td>{{ i + 1 }}</td>

          <td>
            <img class="thumb" :src="p.img_url" :alt="p.name" />
          </td>

          <td>
            <input class="text" type="text" :value="p.name" disabled />
          </td>

          <td>
            <input
              class="text"
              type="text"
              :value="money(p.final_price ?? p.price)"
              disabled
            />
          </td>

          <td>
            <input class="qty" type="number" min="0" :value="p.quantity" />
          </td>
          <td>
            <button><img src="@/assets/icons/apply.svg" alt="" /></button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty">Товары пока не найдены</div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useFetchProductsStore } from "@/store/products";

const store = useFetchProductsStore();

onMounted(() => {
  store.fetchProducts?.();
});

function money(n) {
  return (Number(n) || 0).toLocaleString("ru-RU") + " ₽";
}
</script>

<style lang="scss">
.catalog {
  padding: 16px 0;
  position: relative;

  h1 {
    margin-bottom: 32px;
  }
}

.plug {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.349);
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  color: white;

  p {
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    color: #323232;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    background: #fbfcff;
  }
}

input.text {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  background: #f8f8f8;
  color: #444;
}
input.text:disabled {
  opacity: 0.9;
}
input.qty {
  width: 90px;
  padding: 6px 8px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
}

.empty {
  padding: 16px;
  color: #6b7280;
}
</style>
