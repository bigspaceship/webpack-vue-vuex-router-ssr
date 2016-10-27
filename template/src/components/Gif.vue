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
  data() {
    return {
      gif: null,
      error: null,
    };
  },
  created() {
    this.$store.commit('fetchGif', {'big + spaceship'})
  },
  computed: {
    gif() {
      return this.$store.state.gif;
    },
  },
};
</script>
