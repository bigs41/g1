import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assets: [],
    gameInfo: '',
  },
  mutations: {
    SET_ASSETS(state, assets) {
      state.assets = assets;
    },
    SET_GAME_INFO(state, gameInfo) {
      state.gameInfo = gameInfo;
    },
  },
  actions: {
    async fetchAssets({ commit }) {
      try {
        const response = await axios.get('/api/assets');
        commit('SET_ASSETS', response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    },
    async fetchGameInfo({ commit }) {
      try {
        const response = await axios.get('/api/game-info');
        commit('SET_GAME_INFO', response.data);
      } catch (error) {
        console.error('Error fetching game information:', error);
      }
    },
    async interactWithAIDM({ commit }, payload) {
      try {
        const response = await axios.post('/api/ai-dm', payload);
        // Handle the response from the AI DM
        console.log('AI DM response:', response.data);
      } catch (error) {
        console.error('Error interacting with AI DM:', error);
      }
    },
  },
  getters: {
    assets: (state) => state.assets,
    gameInfo: (state) => state.gameInfo,
  },
});
