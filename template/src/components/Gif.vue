<template>
  <div id="gif">
    <img v-bind:src="gif"/>
  </div>
</template>

<script>
export default {
  name: 'gif',
  computed: {
    gif() {
      return this.$store.state.gif;
    },
  },
};
</script>
