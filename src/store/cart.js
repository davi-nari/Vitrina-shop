import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const useCart = defineStore("cart", () => {
  const cart = ref([]);
  const isCartOpen = ref(false);
  const showToast = ref(false);
  const isCreatingOrder = ref(false);
  const orderCreated = ref(false);

  const addToCart = (item) => {
    const found = cart.value.find((el) => el.id === item.id);
    if (found) {
      if (found.count < found.quantity) {
        found.count++;
      } else {
        showToast.value = true;
      }
    } else {
      cart.value.push({ ...item, count: 1 });
    }
  };

  const removeFromCart = (id) => {
    const found = cart.value.find((el) => el.id === id);
    if (!found) return;
    found.count--;

    if (found.count <= 0) {
      cart.value = cart.value.filter((el) => el.id !== id);
    }
  };

  const deleteItem = (id) => {
    cart.value = cart.value.filter((el) => el.id !== id);
  };

  const createOrder = async () => {
    isCreatingOrder.value = true;
    try {
      for (const item of cart.value) {
        if (item.count > item.quantity) {
          throw new Error(`Товара "${item.name}" недостаточно на складе`);
        }
      }

      const { data } = await axios.post(`${apiUrl}/orders`, {
        orderId: generateOrderNumber(),
        paymentStatus: { status: "unpaid", val: "Не оплачен" },
        status: { state: "processing", val: "Обрабатывается" },
        createdAt: new Date(),
        items: cart.value,
        totalPrice: totalPrice.value,
      });
      orderCreated.value = true;
      cart.value = [];

      await Promise.all(
        cart.value.map((p) => {
          const newQty = (p.quantity || 0) - p.count;
          return axios.patch(`${apiUrl}/products/${p.id}`, {
            quantity: newQty,
          });
        })
      );

      return data;
    } catch (error) {
      console.error("Ошибка при создании заказа " + error);
    } finally {
      isCreatingOrder.value = false;
    }
  };

  const saved = localStorage.getItem("cart");
  if (saved) {
    try {
      cart.value = JSON.parse(saved);
    } catch {
      cart.value = [];
    }
  }

  const itemCount = computed(() => {
    return (id) => {
      const found = cart.value.find((el) => el.id === id);
      return found ? found.count : 0;
    };
  });

  const totalPrice = computed(() =>
    cart.value.reduce((sum, el) => sum + el.final_price * el.count, 0)
  );

  const qtyInCart = computed(() =>
    cart.value.reduce((q, el) => q + el.count, 0)
  );

  function generateOrderNumber() {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `#ORD${random}`;
  }

  watch(
    cart,
    () => {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    },
    {
      deep: true,
    }
  );

  return {
    isCartOpen,
    cart,
    addToCart,
    removeFromCart,
    deleteItem,
    itemCount,
    totalPrice,
    qtyInCart,
    showToast,
    isCreatingOrder,
    orderCreated,
    createOrder,
  };
});
