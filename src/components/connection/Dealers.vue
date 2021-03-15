<template>
  <div class="dealers-container">
    <slot />
    <div class="dealers-container__connection-container">
      <div class="dealers-container__connection-container_line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dealers',
}
</script>

<style lang="scss">
@import '@/scss/colors';

.dealers-container {
  position: absolute;
  left: 5rem;
  top: 10vh;
  height: 80vh;
  display: grid;
  transition: all 0.6s;

  &__connection-container {
    position: absolute;
    left: 30px;
    top: 20vh;
    height: 40vh;
    transition: all 0.6s;

    &_line {
      height: 100%;
      border-left: 1px $primary solid;
    }
  }

  &:hover {
    top: 0;
    height: 100vh;

    .dealers-container__connection-container {
      top: 25vh;
      height: 50vh;
    }
  }
}
</style>
