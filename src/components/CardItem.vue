<template>
  <div class="card outOfStock">
    <div class="card__img">
      <span>-{{ props.cardInfo.discount }}%</span>
      <img
        loading="lazy"
        :src="props.cardInfo.img_url"
        :alt="props.cardInfo.name"
      />
    </div>
    <h3 class="card__title">{{ props.cardInfo.name }}</h3>
    <h3 class="card__price card__title">
      {{ props.cardInfo.final_price }}₽ <span>{{ props.cardInfo.price }}₽</span>
    </h3>
    <div class="card__btns">
      <button v-if="count > 0" @click="store.removeFromCart(props.cardInfo.id)">
        -
      </button>
      <span v-if="count > 0">{{ count }}</span>
      <button @click="store.addToCart(props.cardInfo)">+</button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from "@/store/cart";
const store = useCart();
import { computed } from "vue";

const props = defineProps({
  cardInfo: Object,
});

const count = computed(() => store.itemCount(props.cardInfo.id));
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;

  &__img {
    background: white;
    border-radius: 12px;
    position: relative;
    span {
      position: absolute;
      font-size: 12px;
      color: #878787;
      top: 8px;
      right: 8px;
    }
    img {
      width: 162px;
      height: 162px;
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 400;
    color: #101010;
    height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
  &__price {
    font-size: 15px;
    font-weight: 700;
    line-height: 143%;
    span {
      font-weight: 400;
      font-size: 14px;
      text-decoration: line-through;
      color: #878787;
    }
  }
  &__btns {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #101010;
    width: 70%;
    padding: 2px;
    color: white;

    button {
      color: white;
      padding: 6px;
      font-weight: 800;
      font-size: 18px;
      max-width: 82px;
      width: 100% !important;
    }
  }
}
</style>
