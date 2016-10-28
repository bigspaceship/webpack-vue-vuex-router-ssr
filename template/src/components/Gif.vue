<template>
  <div id="gif">
    <img v-bind:src="gif"/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
import { mapMutations } from 'vuex';

Vue.use(VueResource);

export default {
  created() {
    const tag = 'big+spaceship';
    this.$store.commit('fetchGif', {tag});
  },
  computed: {
    gif() {
      return this.$store.state.gif;
    },
  },
};
</script>
