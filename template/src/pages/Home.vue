<template>
  <div id="home">
    <h1>\{{msg}}</h1>
    <gif></gif>
  </div>
</template>

<script>
import Gif from '../components/Gif';

export default {
  name: 'home',
  components: {
    Gif,
  },
  data() {
    return {
      msg: 'Vues from the ship',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home {
  text-align: center;
}
</style>
