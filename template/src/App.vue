<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';

html {
  height: 100%;
  width: 100%;
  font-size: 62.5%;
}

body {
  height: 100%;
}
</style>
