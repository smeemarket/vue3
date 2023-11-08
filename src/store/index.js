import { createStore } from "vuex";

export default createStore({
  state: {
    myName: "Saw Min Oo",
    apiUrl: "http://127.0.0.1:8000/api/v1",
    auth: null,
    token: null,
  },
  getters: {
    myNameLength(state) {
      return state.myName.length;
    },
    myNameToUpper(state) {
      return state.myName.toUpperCase();
    },
    getUrl: (state) => (uri) => state.apiUrl + uri,
  },
  mutations: {},
  actions: {
    setAuth({ state }, auth) {
      return (state.auth = auth);
    },
    setToken({ state }, token) {
      return (state.token = token);
    },
    logout({ state }) {
      state.auth = null;
      state.token = null;
    },
  },
  modules: {},
});
