import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch, computed } from "vue";
const apiUrl = import.meta.env.VITE_API_URL;

export const useOrders = defineStore("orders", () => {
  const orders = ref([]);
  const isPaymentModalOpen = ref(false);
  const currentItem = ref(null);
  const isPaymentInProgress = ref(false);
  const activeFilter = ref("all");
  const search = ref("");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/orders`);
      orders.value = data;
    } catch (e) {
      console.error(e + " Ошибка при получении всех заказов");
    }
  };

  const selectPaymentMethod = async (val) => {
    try {
      isPaymentInProgress.value = true;
      const res = await axios.patch(
        `${apiUrl}/orders/${currentItem.value.id}`,
        {
          paymentMethod: { key: val.key, val: val.val },
          status: { state: "completed", val: "Выполнен" },
          paymentStatus: { status: "paid", val: "Оплачен" },
        }
      );

      fetchOrders();
      isPaymentInProgress.value = false;
      isPaymentModalOpen.value = false;
    } catch (e) {
      console.error(e + " Ошибка при добавлении оплаты");
      isPaymentInProgress.value = "error";
    }
  };

  const cancelOrder = async () => {
    try {
      const payload = {
        paymentStatus: { status: "cancelled", val: "Отменен" },
      };

      if (currentItem.value.paymentStatus.status === "paid") {
        payload.paymentStatus = { status: "returned", val: "Возвращен" };
      }
      const res = await axios.patch(
        `${apiUrl}/orders/${currentItem.value.id}`,
        {
          status: { state: "cancelled", val: "Отменен" },
          paymentStatus: payload.paymentStatus,
        }
      );

      fetchOrders();
      isPaymentModalOpen.value = false;
    } catch (e) {
      console.error(e + " Ошибка при отмене заказа");
    }
  };

  const filteredOrders = computed(() => {
    const q = (search.value || "").trim().toLowerCase();

    return (orders.value || []).filter((o) => {
      if (
        activeFilter.value !== "all" &&
        o.status?.state !== activeFilter.value
      ) {
        return false;
      }
      if (q) {
        return o.orderId.toLowerCase().includes(q);
      }
      return true;
    });
  });

  const setFilter = (f) => {
    activeFilter.value = f;
  };

  const salesVolume = computed(() =>
    (orders.value || [])
      .filter((item) => item.status?.state === "completed")
      .reduce((sum, el) => sum + (el.totalPrice || 0), 0)
  );

  watch(isPaymentModalOpen, (val) => {
    if (!val) {
      isPaymentInProgress.value = false;
    }
  });

  return {
    orders,
    fetchOrders,
    isPaymentModalOpen,
    currentItem,
    selectPaymentMethod,
    cancelOrder,
    isPaymentInProgress,
    salesVolume,
    activeFilter,
    filteredOrders,
    setFilter,
    search,
  };
});
