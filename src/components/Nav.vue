<template>
  <nav class="nav container">
    <a href="" class="logo"><img src="@/assets/icons/logo.svg" alt="logo" /></a>
    <ul class="nav__list">
      <li><a href="#">Главная</a></li>
      <li><a href="#">Категории</a></li>
      <li><a href="#">Корзина</a></li>
    </ul>
    <div class="nav__btns">
      <img class="ava" src="@/assets/images/nav_ava.png" alt="ava" />
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #878787;

  &__list {
    display: flex;

    gap: 12px;
    li {
      padding: 14px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 3px;
        background: #101010;
        bottom: 0;
        transition: 0.25s;
        transform: translateX(-50%);
        left: 50%;
      }
      &:hover {
        &:after {
          width: 100%;
        }
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
    button {
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
