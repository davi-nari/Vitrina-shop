<template>
  <Transition name="slide-fade">
    <div class="toast" v-if="showToast">
      <img src="@/assets/icons/alarm.svg" alt="" />
      <h3>{{ props.text }}</h3>
      <button @click="showToast = false">
        <img src="@/assets/icons/close_affordance.svg" alt="" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { useCart } from "@/store/cart";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, watch } from "vue";

const store = useCart();

const { showToast } = storeToRefs(store);

const props = defineProps({
  text: {
    type: String,
    default: "Достигнуто максимальное количество товаров",
  },
});

let timerId = null;

watch(
  showToast,
  (val) => {
    if (val) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        showToast.value = false;
        timerId = null;
      }, 3000);
    } else {
      clearTimeout(timerId);
      timerId = null;
    }
  },
  { immediate: false }
);

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<style lang="scss">
.toast {
  position: fixed;
  bottom: 5%;
  right: 5%;
  display: flex;
  width: fit-content;
  z-index: 99;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 16px 20px -8px rgba(3, 5, 18, 0.1);
  background: #101010;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 137%;
  }

  button {
    transition: 0.25s;
    display: grid;
    place-items: center;

    &:hover {
      background: rgba(255, 0, 0, 0.295);
      border-radius: 4px;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
