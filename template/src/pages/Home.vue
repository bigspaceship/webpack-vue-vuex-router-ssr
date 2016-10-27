<template>
  <div id="home">
    <h1>\{{msg}}</h1>
    <gif></gif>
  </div>
</template>

<script>
import Gif from '../components/Gif'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  name: 'home',
  components: {
    Gif{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
    return {
      msg: 'Vues from the ship'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home {
  text-align: center;
}
</style>
