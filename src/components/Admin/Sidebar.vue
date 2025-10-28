<style lang="scss">
.adm__aside {
  width: 100%;
  max-width: 264px;
  z-index: 100;
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;

    li {
      a {
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

          svg {
            path {
              stroke: #1c75e4;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <aside class="adm__item adm__aside">
    <ul>
      <li>
        <router-link to="/admin/orders">
          <svg
            width="20"
            height="24"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.67469 3.5H8.32101C10.5151 3.5 10.7345 4.52581 10.8829 5.77742L11.4637 10.6161C11.6509 12.2032 11.1604 13.5 8.90179 13.5H3.10036C0.83528 13.5 0.344836 12.2032 0.538432 10.6161L1.11923 5.77742C1.2612 4.52581 1.4806 3.5 3.67469 3.5Z"
              stroke="#637185"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.5 4.5V2.16667C3.5 1.16667 4.125 0.5 5.0625 0.5H6.9375C7.875 0.5 8.5 1.16667 8.5 2.16667V4.5"
              stroke="#637185"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 9.5H3.5"
              stroke="#637185"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Заказы
        </router-link>
      </li>
      <li>
        <router-link to="/admin/catalog"
          ><svg
            width="24"
            height="24"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.625 0.636194V12.4865C13.625 12.4865 7.0625 12.0627 7.0625 13.5789C7.0625 13.5789 7.0625 5.52554 7.0625 2.36365C7.0625 -0.220619 13.625 0.636194 13.625 0.636194Z"
              stroke="#637185"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.499997 0.636682V12.487C0.499997 12.487 7.0625 12.0632 7.0625 13.5794C7.0625 13.5794 7.0625 5.52603 7.0625 2.36414C7.0625 -0.220131 0.499997 0.636682 0.499997 0.636682Z"
              stroke="#637185"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
          >Каталог</router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script setup></script>
