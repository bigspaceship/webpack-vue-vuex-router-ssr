<template>
  <div id="gif">
    <img v-bind:src="gif"/>
  </div>
</template>

<script>
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueResource from 'vue-resource'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(VueResource){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  data() {
    return {
      gif: null,
      error: null{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  created() {
    this.fetchGif(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  methods: {
    fetchGif() {
      this.$http.jsonp('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13').then((response) => {
        this.gif = response.body.data.image_url{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      }, (response) => {
        this.error = response{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
      }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>
