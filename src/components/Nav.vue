<template>
  <nav class="nav container">
    <div class="nav__left">
      <button class="burger" type="button" @click="ui.toggleFilters">
        <span></span><span></span><span></span>
      </button>

      <RouterLink to="/" class="logo">
        <img src="@/assets/icons/logo.svg" alt="logo" />
      </RouterLink>
    </div>

    <ul class="nav__list">
      <li :class="{ active: route.path === '/' }">
        <RouterLink to="/">Главная</RouterLink>
      </li>
      <li>
        <a href="#" @click.prevent="store.isCartOpen = true">Корзина</a>
        <span v-if="cart.length">{{ qtyInCart }}</span>
      </li>
    </ul>

    <RouterLink to="/admin" class="nav__btns">
      <img class="ava" src="@/assets/images/nav_ava.png" alt="ava" />
    </RouterLink>
  </nav>

  <nav class="bottom-nav">
    <RouterLink :class="{ active: route.path === '/' }" to="/">
      <img src="@/assets/icons/home.svg" alt="home" />
      <span>Главная</span>
    </RouterLink>

    <button class="cart-btn" type="button" @click="store.isCartOpen = true">
      <img src="@/assets/icons/cart.svg" alt="cart" />
      <span>Корзина</span>
      <i v-if="cart.length" class="badge">{{ qtyInCart }}</i>
    </button>
  </nav>
</template>

<script setup>
import { useCart } from "@/store/cart";
import { storeToRefs } from "pinia";
import { useRoute, RouterLink } from "vue-router";
import { useUI } from "@/store/ui";

const route = useRoute();
const store = useCart();
const ui = useUI();
const { cart, qtyInCart } = storeToRefs(store);
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #878787;

  .nav__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .burger {
    display: none !important; 
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #cfcfcf;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background: #fff;
    span {
      width: 18px;
      height: 2px;
      background: #101010;
    }
  }

  .logo img {
    height: 24px;
  }

  &__list {
    display: flex;
    gap: 12px;
    li {
      padding: 14px;
      position: relative;
      &.active:after {
        width: 100%;
      }
      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 3px;
        background: #101010;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.25s;
      }
      &:hover:after {
        width: 100%;
      }
      span {
        position: absolute;
        top: 14px;
        right: -9px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #101010;
        color: #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 14px;
        font-weight: 600;
      }
      a {
        color: #181818;
      }
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    gap: 16px;
    .ava {
      width: 24px;
      height: 24px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}

/* Нижняя таб-навигация (мобилка) */
.bottom-nav {
  display: none; /* desktop скрыт */
}

/* --- Адаптив --- */
@media (max-width: 768px) {
  .nav {
    padding: 15px;
    .burger {
      display: flex;
    }
    &__list {
      display: none;
    } /* убираем верхние ссылки */
  }

  .bottom-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 16px env(safe-area-inset-bottom);
    border-top: 1px solid #e6e6e6;
    background: #fff;
    z-index: 1000;

    a,
    .cart-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #181818;
      background: transparent;
      border: 0;
      padding: 6px 10px;
      img {
        width: 22px;
        height: 22px;
      }
      &.active span {
        font-weight: 700;
      }
      position: relative;
      .badge {
        position: absolute;
        top: -4px;
        right: 2px;
        background: #101010;
        color: #fff;
        border-radius: 10px;
        min-width: 18px;
        height: 18px;
        font-size: 11px;
        line-height: 18px;
        padding: 0 5px;
      }
    }
  }
}
</style>
