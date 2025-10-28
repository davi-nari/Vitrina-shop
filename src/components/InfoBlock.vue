<template>
  <div class="infoBlock">
    <img :src="imgUrl" alt="" />
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  imgUrl: String,
  title: String,
  text: String,
});
</script>

<style lang="scss">
.infoBlock {
  display: flex;
  padding: 32px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    margin-bottom: 32px;
    max-width: 360px;
  }
  h3 {
    margin-bottom: 8px;
  }
  p {
    color: #a0a0a0;
  }
}
</style>
