import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      gif: '',
    },
    actions: {
      FETCH_GIF: ({ commit, state }, { tag }) => {
        return axios.request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13&tag=' + tag)
          .then((response) => {
            state.gif = response.data.data.image_url;
          });
      },
    },
  });
}
