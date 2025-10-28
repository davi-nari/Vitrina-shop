<template>
  <section class="orders">
    <div class="orders__stats">
      <div class="orders__stats-item">
        <h3>Всего заказов</h3>
        <p>{{ store.orders.length }}</p>
      </div>
      <div class="orders__stats-item">
        <h3>Заказы в работе</h3>
        <p>{{ countOrdersByStatus("processing") }}</p>
      </div>
      <div class="orders__stats-item">
        <h3>Выполненные заказы</h3>
        <p>{{ countOrdersByStatus("completed") }}</p>
      </div>
      <div class="orders__stats-item">
        <h3>Отмененные заказы</h3>
        <p>{{ countOrdersByStatus("cancelled") }}</p>
      </div>
    </div>

    <div class="orders__filters">
      <div class="orders__filters-byStatus">
        <button
          v-for="item in ordersStatusBtns"
          :key="item"
          :class="{ active: store.activeFilter === item.filter }"
          @click="store.setFilter(item.filter)"
        >
          {{ item.text }}
        </button>
      </div>

      <form class="orders__filters-search" @submit.prevent="findByOrderId">
        <input
          type="text"
          placeholder="Поиск по номеру заказа..."
          v-model="q"
        />
        <button><img src="@/assets/icons/search.svg" alt="" /></button>
      </form>
    </div>

    <div class="orders__list">
      <!-- обёртка для скролла -->
      <div class="table-wrap">
        <table v-if="store.orders">
          <thead>
            <tr>
              <th>№</th>
              <th>Номер заказа</th>
              <th>Товар</th>
              <th>Дата заказа</th>
              <th>Цена</th>
              <th>Оплата</th>
              <th>Статус</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in store.filteredOrders"
              :key="item.orderId || index"
              @click="openPaymentModal(item)"
            >
              <td :data-label="'№'">{{ index + 1 }}</td>
              <td :data-label="'Номер заказа'">{{ item.orderId }}</td>
              <td :data-label="'Товар'">
                <div
                  v-for="p in item.items.slice(0, 1)"
                  :key="p.name + p.img_url"
                  class="ordersProduct"
                  @click.stop
                >
                  <img :src="p.img_url" alt="" />
                  <h3>{{ p.name }}</h3>
                  <span
                    v-if="item.items.length > 1"
                    @click="toggleItems(item.orderId)"
                  >
                    {{ item.items.length }} шт.
                  </span>

                  <div
                    class="orderItems"
                    :class="{ 'orderItems--mobile': true }"
                    v-if="openOrderId === item.orderId"
                    @click.stop
                  >
                    <div
                      v-for="prod in item.items"
                      :key="prod.name + prod.img_url"
                    >
                      <img :src="prod.img_url" alt="" />
                      <h3>{{ prod.name }}</h3>
                    </div>
                  </div>
                </div>
              </td>

              <td :data-label="'Дата заказа'">
                {{ new Date(item.createdAt).toLocaleDateString("ru-RU") }}
              </td>

              <td :data-label="'Цена'">{{ item.totalPrice }}₽</td>

              <td
                class="payment"
                :class="{ paid: item.paymentStatus.status == 'paid' }"
                :data-label="'Оплата'"
              >
                {{ item.paymentStatus.val }}
              </td>

              <td :class="item.status.state" :data-label="'Статус'">
                {{ item.status.val }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useOrders } from "@/store/orders";
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
const store = useOrders();
const openOrderId = ref(null);
const q = ref("");

function toggleItems(id) {
  openOrderId.value = openOrderId.value === id ? null : id;
}

function closeAll() {
  openOrderId.value = null;
}

const openPaymentModal = (item) => {
  store.isPaymentModalOpen = true;
  store.currentItem = item;
};

const findByOrderId = () => {
  store.search = q.value;
  console.log(1);
};

onMounted(() => {
  store.fetchOrders();
  window.addEventListener("click", closeAll);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeAll);
});

const countOrdersByStatus = computed(() => (status) => {
  return (store.orders || []).filter((o) => o.status?.state === status).length;
});

const ordersStatusBtns = [
  { filter: "all", text: "Все" },
  { filter: "completed", text: "Выполненные" },
  { filter: "processing", text: "В работе" },
  { filter: "cancelled", text: " Отменённые" },
];
</script>

<style lang="scss">
.orders {
  &__stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    &-item {
      border-radius: 8px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      padding: 16px;

      h3 {
        font-size: 18px;
        line-height: 144%;
        color: #23272e;
        margin-bottom: 16px;
      }
      p {
        font-weight: 700;
        font-size: 32px;
        line-height: 106%;
      }
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    &-byStatus {
      display: flex;
      gap: 30px;
      align-items: center;
      background: #e7f0fc;
      border-radius: 8px;
      padding: 4px;

      button {
        font-weight: 500;
        font-size: 15px;
        padding: 6px 12px;
        border-radius: 6px;
        transition: 0.25s;
        color: #637185;

        &:hover {
          background: #bad7ff;
        }

        &.active {
          background: white;
          color: black;
        }
      }
    }

    &-search {
      display: flex;
      align-self: center;
      gap: 6px;
      background: #f9fafb;
      border-radius: 8px;
      padding: 6px 8px 6px 12px;
      border: 1px solid #c2c2c2;

      button {
        img {
          width: 17px;
          height: 17px;
        }
      }
    }
  }
}
</style>
