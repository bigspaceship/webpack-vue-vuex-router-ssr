import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  gif: '',
};

export const mutations = {
  fetchGif (state, {tag}) {
    Vue.http.jsonp('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13&tag=' + tag).then((response) => {
      state.gif = response.body.data.image_url;
    }, (response) => {
      state.gif = response;
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
