<template>
  <div class="card skeleton">
    <div class="card__img">
      <span class="skeleton-pill"></span>
      <div class="skeleton-box img"></div>
    </div>

    <h3 class="card__title">
      <span class="skeleton-line"></span>
      <span class="skeleton-line short"></span>
    </h3>

    <h3 class="card__price card__title">
      <span class="skeleton-line price"></span>
      <span class="skeleton-line old-price"></span>
    </h3>

    <div class="card__btns skeleton-btns">
      <span class="skeleton-line btn"></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
:where(.skeleton-box, .skeleton-line, .skeleton-pill, .skeleton-btns) {
  background: linear-gradient(90deg, #e6e6e6 25%, #f2f2f2 37%, #e6e6e6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
}

.card__img {
  background: white;
  border-radius: 12px;
  position: relative;
  width: 162px;
  height: 162px;
  display: grid;
  place-items: center;
}
.card__img .img {
  width: 162px;
  height: 162px;
  border-radius: 12px;
}

.skeleton-pill {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 42px;
  height: 18px;
  border-radius: 16px;
  opacity: 0.8;
}

.card__title {
  font-size: 14px;
  height: 35px;
  display: grid;
  gap: 6px;
}
.skeleton-line {
  display: block;
  height: 12px;
  border-radius: 6px;
  width: 140px;
}
.skeleton-line.short {
  width: 90px;
}

.card__price {
  display: flex;
  align-items: center;
  gap: 8px;
}
.skeleton-line.price {
  width: 80px;
  height: 14px;
}
.skeleton-line.old-price {
  width: 64px;
  height: 12px;
  opacity: 0.7;
}

.card__btns {
  width: 70%;
  border-radius: 20px;
  padding: 2px;
  background: none;
}
.skeleton-btns .btn {
  display: block;
  height: 28px;
  width: 100%;
  border-radius: 16px;
}
</style>
