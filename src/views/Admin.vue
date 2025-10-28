<template>
  <div class="drawer">
    <Navbar />
    <main class="adm__main">
      <Sidebar />
      <Content />
    </main>
  </div>
  <PaymentModal />
</template>

<script setup>
import Navbar from "@/components/Admin/Navbar.vue";
import Sidebar from "@/components/Admin/Sidebar.vue";
import Content from "@/components/Admin/Content.vue";
import PaymentModal from "@/components/Admin/PaymentModal.vue";
</script>

<style lang="scss">
.drawer {
  padding: 0 30px 30px;
  height: 100%;
  .adm__item {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    background: #fbfcff;
  }
  .adm__main {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    min-height: calc(100dvh - 144px);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    thead {
      background: #e7f0fc;
    }

    th,
    td {
      padding: 10px 12px;
      cursor: pointer;
      text-align: left;
      border-bottom: 1px solid #d1d5db;

      img {
        width: 40px;
        height: 40px;
      }
      button {
        img {
          width: 25px;
        }
      }

      .ordersProduct {
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;

        span {
          color: #1c75e4;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }

        .orderItems {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: absolute;
          right: -17%;
          top: 0;
          z-index: 99;
          border: 1px solid #d1d5db;
          background: white;
          padding: 12px 8px;
          border-radius: 12px;

          div {
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #d1d5db;
            padding: 8px 0;
          }
        }
      }

      &.processing {
        color: #f59f0a;
      }
      &.cancelled {
        color: #ef4343;
      }
      &.completed {
        color: #21c45d;
      }

      &.payment {
        position: relative;

        &.paid {
          &:before {
            background: #21c45d;
          }
        }

        &:before {
          content: "";
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 100%;
          background: #ef4343;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    tr:hover {
      background: #fafafa;
    }
  }
}

/* Глобальные переменные брейкпоинтов */
$bp-lg: 1200px;
$bp-md: 992px;
$bp-sm: 768px;
$bp-xs: 640px;

/* ===== Drawer / общий каркас ===== */
.drawer {
  padding: 0 30px 30px;
  height: 100%;

  .adm__main {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    min-height: calc(100dvh - 144px);
  }

  /* Таблица — базовая */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;

    thead {
      background: #e7f0fc;
    }

    th,
    td {
      padding: 10px 12px;
      cursor: pointer;
      text-align: left;
      border-bottom: 1px solid #d1d5db;
      position: relative; /* для before на мобилке */

      img {
        width: 40px;
        height: 40px;
      }
      button img {
        width: 25px;
      }

      .ordersProduct {
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;

        span {
          color: #1c75e4;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }

        .orderItems {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: absolute;
          right: -17%;
          top: 0;
          z-index: 99;
          border: 1px solid #d1d5db;
          background: white;
          padding: 12px 8px;
          border-radius: 12px;

          div {
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #d1d5db;
            padding: 8px 0;
          }
        }
      }

      &.processing {
        color: #f59f0a;
      }
      &.cancelled {
        color: #ef4343;
      }
      &.completed {
        color: #21c45d;
      }

      &.payment {
        &.paid {
          &:before {
            background: #21c45d;
          }
        }
        &:before {
          content: "";
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 100%;
          background: #ef4343;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    tr:hover {
      background: #fafafa;
    }
  }

  /* Обёртка для горизонтального скролла на узких экранах */
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

/* ===== Sidebar ===== */
.adm__aside {
  width: 100%;
  max-width: 264px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;

    li a {
      display: flex;
      align-items: center;
      gap: 16px;
      font-weight: 500;
      font-size: 20px;
      color: #637185;
      padding: 16px;
      transition: 0.25s;
      border-radius: 12px;

      &:hover {
        background: #e7f0fc;
      }
      &.router-link-active {
        background: #e7f0fc;
        color: #1c75e4;
        svg path {
          stroke: #1c75e4;
        }
      }
    }
  }
}

/* ===== Orders ===== */
.orders {
  &__stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 32px;

    &-item {
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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
    gap: 12px;
    margin-bottom: 40px;

    &-byStatus {
      display: flex;
      gap: 8px;
      align-items: center;
      background: #e7f0fc;
      border-radius: 8px;
      padding: 4px;
      flex-wrap: wrap;

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
          background: #fff;
          color: #000;
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

      input {
        min-width: 220px;
        border: none;
        background: transparent;
        outline: none;
      }
      button img {
        width: 17px;
        height: 17px;
      }
    }
  }
}

/* ========= Брейкпоинты ========= */

/* <= 992px: сайдбар становится узким столбцом */
@media (max-width: $bp-md) {
  .drawer {
    padding: 0 16px 24px;

    .adm__main {
      gap: 16px;
      /* Сайдбар наверх, контент под ним */
      flex-direction: column;
    }
  }

  .adm__aside {
    max-width: 100%;
    ul li a {
      font-size: 18px;
      padding: 12px;
    }
  }

  .orders__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .orders__filters {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    &-search input {
      min-width: 100%;
    }
  }

  /* Чуть меньше шрифт в таблице */
  .drawer table {
    font-size: 14px;
  }
}

/* <= 768px: усиливаем скролл таблицы, чуть прячем мелочи */
@media (max-width: $bp-sm) {
  .orders__stats .orders__stats-item p {
    font-size: 28px;
  }
  .orders__filters-byStatus {
    gap: 6px;
  }
  .drawer .table-wrap {
    border: 1px dashed #e5e7eb;
    border-radius: 8px;
  }
}

/* <= 640px: карточный вид таблицы */
@media (max-width: $bp-xs) {
  .orders__stats {
    grid-template-columns: 1fr;
    &-item {
      padding: 12px;
    }
  }

  /* Фильтры — стекаем всё в столбик */
  .orders__filters {
    margin-bottom: 24px;

    &-byStatus {
      padding: 6px;
      button {
        flex: 1 1 auto;
      }
    }

    &-search {
      padding: 6px 10px;
      input {
        min-width: 0;
        width: 100%;
      }
    }
  }

  /* Таблица -> карточки */
  .drawer table {
    border: 0;
  }

  .drawer table thead {
    /* скрываем заголовки таблицы */
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  .drawer table tbody,
  .drawer table tr,
  .drawer table td {
    display: block;
    width: 100%;
  }

  .drawer table tr {
    background: #fff;
    margin-bottom: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px 12px;
  }

  .drawer table td {
    display: flex;
    align-items: center;
    border: 0;
    padding: 8px 0 8px 120px; /* место под метку */
    min-height: 44px;
  }

  .drawer table td::before {
    content: attr(data-label) " ";
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    font-weight: 600;
    color: #637185;
    white-space: nowrap;
  }

  /* Колонки, которые можно спрятать/упростить на мобиле */
  .drawer table td[data-label="№"] {
    display: none;
  }

  /* Товар в карточке — вертикально */
  .orders .ordersProduct {
    align-items: flex-start;
    img {
      width: 48px;
      height: 48px;
      flex: 0 0 auto;
    }
    h3 {
      font-size: 14px;
      line-height: 1.25;
    }
  }

  /* Дропдаун товаров — не абсолютный, чтобы не уезжал за экран */
  .orders .ordersProduct .orderItems {
    position: static;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 8px;
    margin-top: 8px;
    max-height: 200px;
    overflow: auto;

    &.orderItems--mobile {
      display: block;
    }
    div {
      padding: 6px 0;
    }
    img {
      width: 36px;
      height: 36px;
    }
  }

  /* Индикатор оплаты — точка слева мешает, уберём на мобиле */
  .drawer table td.payment::before {
    display: none;
  }
}
</style>
