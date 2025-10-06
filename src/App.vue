<template>
  <header class="header">
    <Nav />
  </header>
  <main class="main">
    <Banner />
    <Catalog />
  </main>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Banner from "@/components/Banner.vue";
import Catalog from "@/components/Catalog.vue";
</script>

<style lang="scss" scoped></style>
