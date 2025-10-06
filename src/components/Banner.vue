<template>
  <div class="container">
    <section class="banner">
      <div class="banner__info">
        <p>Cuci Gudang</p>
        <h2>Special Offer</h2>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  min-height: 265px;
  height: 100%;
  overflow: hidden;
  padding-left: 18px;
  margin: 16px auto 32px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  background-image: url("src/assets/images/banner.png");
  background-size: cover;
  background-position: 25% 65%;
  border-radius: 16px;

  &__info {
    position: absolute;
    h2 {
      font-size: 32px;
      font-weight: 600;
      line-height: 125%;
      letter-spacing: -0.03em;
      color: #fff;
    }
    p {
      font-weight: 600;
      line-height: 133%;
      color: #fde463;
    }
  }
}
</style>
