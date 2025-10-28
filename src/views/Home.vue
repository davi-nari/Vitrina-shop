<template>
  <header class="header">
    <Nav />
  </header>
  <main class="main">
    <Banner />
    <Catalog />
    <Cart />
  </main>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Banner from "@/components/Banner.vue";
import Catalog from "@/components/Catalog.vue";
import Cart from "@/components/Cart.vue";
</script>

<style lang="scss" scoped></style>
