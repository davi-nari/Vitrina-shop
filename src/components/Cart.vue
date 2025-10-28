<template>
  <!-- фон-оверлей -->
  <Transition name="fade">
    <div
      class="wrapper"
      v-show="isCartOpen"
      @click="isCartOpen = false"
      aria-hidden="true"
    />
  </Transition>

  <!-- сам шит/модалка -->
  <Transition name="sheet">
    <div
      v-show="isCartOpen"
      class="cart"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <!-- хедер для мобилки -->
      <div class="cart__header">
        <span class="drag-handle" aria-hidden="true"></span>
        <h2>Корзина</h2>
        <button class="close-btn" type="button" @click="isCartOpen = false">
          <img src="@/assets/icons/cross.svg" alt="Закрыть" />
        </button>
      </div>

      <div class="cart__list" v-if="cart.length" v-auto-animate>
        <div class="cart__list-item" v-for="item in cart" :key="item.id">
          <div class="cart__item-img">
            <img :src="item.img_url" :alt="item.name" />
          </div>

          <div class="cart__item-info">
            <h3 class="cart__item-title">{{ item.name }}</h3>

            <div class="cart__item-btns">
              <div>
                <button type="button" @click="store.removeFromCart(item.id)">
                  -
                </button>
                <span>{{ item.count }}</span>
                <button type="button" @click="store.addToCart(item)">+</button>
              </div>

              <Transition name="fade">
                <span class="unitPrice" v-show="item.count > 1">
                  {{ item.final_price }}₽ /ед
                </span>
              </Transition>
            </div>

            <h3 class="cart__item-price">{{ totalUnitPrice(item) }}₽</h3>
          </div>

          <button
            class="cart__item-delete"
            type="button"
            @click="store.deleteItem(item.id)"
          >
            <img src="@/assets/icons/cross.svg" alt="Удалить" />
          </button>
        </div>
      </div>

      <InfoBlock
        v-if="store.orderCreated"
        :imgUrl="orderCreatedIcon"
        :title="'Заказ успешно оформлен!'"
        :text="'API сказал “ок”. И даже ничего не сломалось...'"
      />

      <div class="cart__footer" v-else-if="cart.length">
        <h3>
          {{ totalPrice }}₽
          <span>Кол-во товаров: {{ qtyInCart }}</span>
        </h3>
        <button
          class="main__btn"
          type="button"
          @click="store.createOrder()"
          :disabled="store.isCreatingOrder"
        >
          {{ isCreatingOrder ? "Оформление" : "Оформить заказ" }}
        </button>
      </div>

      <InfoBlock
        v-else
        :imgUrl="empty_cart"
        :title="'Она пуста, но не сломлена'"
        :text="'Ну ладно, корзина подождёт… но не вечно'"
      />
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { useCart } from "@/store/cart";
import { storeToRefs } from "pinia";
import InfoBlock from "@/components/InfoBlock.vue";

import empty_cart from "@/assets/icons/emptyCart.svg";
import orderCreatedIcon from "@/assets/icons/orderCreated.svg";

const store = useCart();
const { isCartOpen, cart, totalPrice, qtyInCart, isCreatingOrder } =
  storeToRefs(store);

const totalUnitPrice = (item) => item.count * item.final_price;

// esc для закрытия
const onKey = (e) => {
  if (e.key === "Escape") isCartOpen.value = false;
};

watch(isCartOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
  store.orderCreated = false;
});

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style lang="scss">
/* Оверлей */
.wrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 998;

  display: flex;
  justify-content: center;
  align-items: center;
}

.cart {
  position: fixed;
  z-index: 1000;
  background: #eff1fe;
  color: #101010;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 80dvh;
  overflow: hidden;
  /* Десктоп (>=769px): модалка по центру */
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(860px, 90vw);

  .cart__header {
    position: sticky;
    top: 0;
    background: #eff1fe;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 48px 8px;
    border-bottom: 1px solid rgba(54, 54, 64, 0.15);

    .drag-handle {
      display: none;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
    }
    .close-btn {
      position: absolute;
      right: 12px;
      top: 10px;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    padding: 8px 24px 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-gutter: stable;
    &-item {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      align-items: center;
      gap: 16px;
      border-bottom: 0.5px #a3a3a3 solid;
      padding-bottom: 16px;
      margin: 16px 0;

      .cart__item-img {
        width: 90px;
        height: 90px;
        background: #fff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .cart__item-info {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 12px;

        .cart__item-title {
          grid-column: 1 / -1;
          font-size: 16px;
        }

        .cart__item-btns {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          div {
            display: flex;
            align-items: center;
            gap: 8px;
            button {
              width: 28px;
              height: 28px;
              font-size: 18px;
              border-radius: 6px;
            }
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 500;
              font-size: 16px;
              border: 0.5px solid #d9d9d9;
              border-radius: 6px;
              width: 44px;
              height: 32px;
            }
          }

          .unitPrice {
            position: absolute;
            font-size: 13px;
            color: #7f7f7f;
            bottom: -20px;
          }
        }

        .cart__item-price {
          font-weight: 600;
        }
      }

      .cart__item-delete {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: 0.2s;
        border-color: transparent;
        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  &__footer {
    position: sticky;
    bottom: 0;
    background: #eff1fe;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(54, 54, 64, 0.15);
    box-shadow: 0 -1px 3px 0 #36374014, 0 -1px 2px 0 #36374014;
    border-radius: 16px;

    h3 {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      line-height: 150%;
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
      }
    }
    .main__btn {
      border-radius: 10px;
      padding: 14px 28px;
      &:disabled {
        background: #cfcfcf;
      }
    }
  }
}

/* ---- Мобильный режим: bottom sheet ---- */
@media (max-width: 768px) {
  .cart {
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    width: 100%;
    max-width: 100%;
    height: 85dvh;
    max-height: 92dvh;
    border-radius: 16px 16px 0 0;
    transform: translateY(0); /* управляется анимацией */

    .cart__header {
      padding: 10px 48px 8px;
      .drag-handle {
        display: block;
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        width: 36px;
        height: 4px;
        border-radius: 999px;
        background: #cfcfcf;
      }
      h2 {
        font-size: 18px;
      }
    }

    &__list {
      padding: 8px 16px 0;
    }

    &__footer {
      padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
      border-radius: 12px 12px 0 0;
      z-index: 1001;
      .main__btn {
        width: 52%;
        padding: 14px 16px;
      }
      h3 {
        font-size: 16px;
        span {
          font-size: 13px;
        }
      }
    }
  }
}

/* анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* bottom sheet анимация */
.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.28s ease, opacity 0.28s ease;
}
@media (max-width: 768px) {
  .sheet-enter-from,
  .sheet-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
}
@media (min-width: 769px) {
  .sheet-enter-from,
  .sheet-leave-to {
    transform: translate(-50%, calc(-50% + 20px));
    opacity: 0;
  }
}
</style>
