<template>
  <div id="gif">
    <img v-bind:src="gif"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    const tag = 'big+spaceship';
    this.$store.dispatch('fetchGif', {tag});
  },
  computed: {
    gif() {
      return this.$store.state.gif;
    },
  },
};
</script>
