<template>
  <div
    class="wrapper"
    v-if="store.isPaymentModalOpen"
    @click="store.isPaymentModalOpen = false"
  >
    <div class="content" @click.stop>
      <h2
        v-if="
          !store.isPaymentInProgress &&
          store.currentItem.status.state === 'processing'
        "
      >
        Выберите способ оплаты
      </h2>
      <div
        class="content__payments"
        v-if="
          !store.isPaymentInProgress &&
          store.currentItem.status.state === 'processing'
        "
      >
        <div
          class="content__payments-item"
          v-for="item in payMethod"
          :key="item"
          @click="store.selectPaymentMethod(item)"
        >
          <img :src="item.img" alt="" />
          <h3>{{ item.val }}</h3>
        </div>
      </div>
      <div class="error" v-else-if="store.isPaymentInProgress === 'error'">
        <div class="error-icon">⚠️</div>
        <p>Произошла ошибка при обработке оплаты. Попробуйте позже.</p>
      </div>
      <div class="proccessing" v-else-if="store.isPaymentInProgress">
        <div class="spinner"></div>
        <p>Оплата обрабатывается...</p>
      </div>

      <InfoBlock
        v-if="store.currentItem.status.state === 'cancelled'"
        :imgUrl="cancelled"
        :title="'Заказ отменен!'"
        :text="'Мы всё отменили… кроме вашего настроения'"
      />

      <Receipt
        v-if="store.currentItem.status.state === 'completed'"
        :item="store.currentItem"
      />

      <div class="content__btns">
        <button
          class="content__btns-cancel"
          @click="store.cancelOrder(item)"
          :disabled="store.currentItem.status.state === 'cancelled'"
        >
          Отменить заказ
        </button>
        <button
          :disabled="store.currentItem.status.state !== 'completed'"
          class="content__btns-check"
          @click="printReceipt"
        >
          Печать чека
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrders } from "@/store/orders";
const store = useOrders();

import Receipt from "@/components/Admin/Receipt.vue";
import InfoBlock from "@/components/InfoBlock.vue";

import cash from "@/assets/icons/cash.svg";
import card from "@/assets/icons/card.svg";
import fastPay from "@/assets/icons/fastPay.svg";
import installments from "@/assets/icons/installments.svg";
import cancelled from "@/assets/icons/cancelled.svg";

const payMethod = [
  { img: cash, key: "cash", val: "Наличные" },
  { img: card, key: "card", val: "Карта" },
  {
    img: fastPay,
    key: "fastPay",
    val: "Бесконтактная оплата",
  },
  { img: installments, key: "installments", val: "Рассрочка" },
];

const printReceipt = () => {
  window.print();
};
</script>

<style lang="scss">
.wrapper {
  .content {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    background: #fbfcff;
    border-radius: 20px;
    min-height: 532px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    padding: 24px 48px;
    h2 {
      font-weight: 500;
      font-size: 24px;
      line-height: 122%;
      letter-spacing: -0.02em;
      color: #323232;
    }

    &__payments {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;

      &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        padding: 12px;
        border-radius: 12px;
        gap: 8px;
        cursor: pointer;
        img {
          width: 80%;
          transition: 0.25s;
          filter: grayscale(50%);
        }

        h3 {
          font-size: 18px;
          font-weight: 500;
          color: #323232;
        }

        &:hover {
          img {
            filter: grayscale(0%);
          }
        }
      }
    }

    .proccessing {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: #121212;

      .spinner {
        width: 28px;
        height: 28px;
        border: 3px solid #ccc;
        border-top-color: #42b983;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }

    &__btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      button {
        font-weight: 500;
        font-size: 15px;
        border-radius: 8px;
        padding: 10px 12px;
        transition: 0.25s;

        &:disabled {
          background: #cfcfcf;
          color: white;
          border: none;
        }
      }
      &-cancel {
        border: 1px solid #fec8c8;
        background: #fef1f1;
        color: #ef4343;
        &:hover {
          background: darken(#fec8c8, 10%);
          color: white;
        }
      }

      &-check {
        background: #1c75e4;
        color: white;
        &:hover {
          background: lighten(#1c75e4, 10%);
          color: white;
        }
      }
    }
  }
}
</style>
