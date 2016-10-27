<template>
  <div id="gif">
    <img v-bind:src="gif"/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
  data() {
    return {
      gif: null,
      error: null,
    };
  },
  created() {
    this.fetchGif();
  },
  methods: {
    fetchGif() {
      this.$http.jsonp('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13').then((response) => {
        this.gif = response.body.data.image_url;
      }, (response) => {
        this.error = response;
      });
    },
  },
};
</script>
