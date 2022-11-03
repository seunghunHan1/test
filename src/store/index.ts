import { createStore } from "vuex";

export default createStore({
  state: {
    answer: "",
  },
  getters: {
    getAnswer(state) {
      return state;
    },
  },
  mutations: {
    setAnswer(state, data: string) {
      state.answer = data;
    },
  },
  actions: {},
  modules: {},
});
