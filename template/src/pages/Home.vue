<template>
  <div id="home">
    <h1>\{{msg}}</h1>
    <router-link :to="'about'">About</router-link>
    <gif></gif>
  </div>
</template>

<script>
import gif from '../components/Gif.vue';

export default {
  name: 'home',
  components: {
    gif,
  },
  data() {
    return {
      msg: 'Vues from the ship',
    };
  },
  asyncData({ store }) {
    const tag = 'big+spaceship';
    return store.dispatch('FETCH_GIF', tag);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home {
  text-align: center;
}
</style>
