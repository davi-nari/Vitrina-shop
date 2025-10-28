<template>
  <aside class="filters skeleton">
    <div class="filters__title">
      <span class="sk-line sk-title"></span>
      <span class="sk-pill sk-btn"></span>
    </div>

    <div class="filters__sex">
      <div class="filters__title">
        <span class="sk-line sk-subtitle"></span>
      </div>
      <div class="filters__btns">
        <span v-for="i in 3" :key="'sx' + i" class="sk-pill sk-chip"></span>
      </div>
    </div>

    <div class="filters__size">
      <div class="filters__title">
        <span class="sk-line sk-subtitle"></span>
      </div>
      <div class="filters__btns">
        <span v-for="i in 6" :key="'sz' + i" class="sk-pill sk-size"></span>
      </div>
    </div>

    <div class="filters__colors">
      <div class="filters__title">
        <span class="sk-line sk-subtitle"></span>
      </div>
      <div class="filters__btns">
        <span v-for="i in 8" :key="'cl' + i" class="sk-color"></span>
      </div>
    </div>
  </aside>
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
.skeleton :where(.sk-line, .sk-pill, .sk-color) {
  background: linear-gradient(90deg, #e6e6e6 25%, #f2f2f2 37%, #e6e6e6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 188px;
  width: 100%;
}
.filters__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.sk-title {
  width: 80px;
  height: 18px;
  border-radius: 6px;
}
.sk-subtitle {
  width: 60px;
  height: 16px;
  border-radius: 6px;
}

.sk-btn {
  width: 96px;
  height: 32px;
  border-radius: 8px;
}

.filters__btns {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.sk-chip {
  width: 78px;
  height: 34px;
  border-radius: 16px;
}

.sk-size {
  width: 85px;
  height: 40px;
  border-radius: 4px;
}

.sk-color {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
</style>
