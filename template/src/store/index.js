import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  gif: '',
};

const actions = {
  fetchGif ({commit, state}, {tag}) {
    return axios.request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13&tag=' + tag).then((response) => {
      state.gif = response.data.data.image_url;
    });
  },
};

export default new Vuex.Store({
  state,
  actions,
});
