<template>
  <div class="receipt__wrapper print-area">
    <div class="receipt__template">
      <img src="@/assets/icons/success.svg" alt="" />
      <h3>Оплата прошла успешно! Карма +10!</h3>

      <div class="receipt__template-info">
        <p>
          Номер заказа: <b>{{ item.orderId }}</b>
        </p>
        <p>
          Способ оплаты: <b>{{ item.paymentMethod.val }}</b>
        </p>

        <p v-for="(p, i) in item.items" :key="p.id || i">
          Товар:
          <b>{{ p.name }} — {{ money(p.final_price) }} × {{ p.count }}</b>
        </p>
      </div>

      <p class="receipt__template-totalPrice">
        Итого: <b>{{ money(item.totalPrice) }}</b>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object });
function money(n) {
  return Number(n).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
}
</script>

<style lang="scss">
.receipt__template {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px 0 rgba(170, 170, 170, 0.12);
  background: #fff;

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    color: #121212;
    padding: 16px 0 32px;
    position: relative;
    border-bottom: 1px dashed #dcdee0;
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin: 32px 0 16px;
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    width: 100%;
    line-height: 138%;
    color: #707070;

    b {
      font-weight: 500;
      line-height: 138%;
      color: #121212;
    }
  }

  &-totalPrice {
    border-top: 1px dashed #dcdee0;
    padding-top: 16px;

    b {
      font-size: 20px;
    }
  }
}

@media print {
  body * {
    visibility: hidden;
  }
  .print-area,
  .print-area * {
    visibility: visible;
  }
  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
