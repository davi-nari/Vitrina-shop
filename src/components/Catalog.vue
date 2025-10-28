<template>
  <section class="catalog container">
    <Sidebar />
    <Cards />
    <Toast />
  </section>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Cards from "@/components/Cards.vue";
import Toast from "@/components/Toast.vue";
</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  align-items: start;
  gap: 16px;
  margin-bottom: 48px;
}
</style>
