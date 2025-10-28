<template>
  <nav class="navbar adm__item">
    <a href="/admin">
      <img src="@/assets/icons/logo_admin.svg" alt="" />
    </a>
    <div class="navbar__items">
      <div class="salesVolume">
        <h4>Объем продаж</h4>
        <h4>{{ store.salesVolume }} ₽</h4>
      </div>

      <router-link class="backToSite" to="/" title="Вернуться на сайт">
        <img src="@/assets/icons/backToShop.svg" alt="" />
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useOrders } from "@/store/orders";
const store = useOrders();
</script>

<style lang="scss">
.navbar {
  border-radius: 0 0 20px 20px !important;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  position: relative;
  &__items {
    display: flex;
    align-items: center;
    gap: 32px;

    .salesVolume {
      text-align: center;
      border-radius: 60px;
      background: #1c75e4;
      color: white;
      padding: 8px 32px;
    }
    .backToSite {
      img {
        width: 45px;
        height: 45px;
      }
    }
  }
}
</style>
