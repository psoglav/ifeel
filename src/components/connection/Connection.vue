<template>
  <div class="connection-container">
    <div class="connection-container_line"></div>
  </div>
</template>

<script>
export default {
  name: 'Connection',
}
</script>

<style lang="scss">
@import '@/scss/colors';

.connection-container {
  height: 100px;

  &_line {
    height: 100%;
    border-left: 1px $primary solid;
  }
}
</style>
