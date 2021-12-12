import axios from "axios";

const state = {
  quoteClose: false,
  auotherQuotes: null,
};
const getters = {
  auotherQuotes: (state) => state.auotherQuotes,
};
const mutations = {
  setData(state, payload) {
    state.auotherQuotes = payload;
  },
};
const actions = {
  randomQuotes() {
    return axios
      .get("https://quote-garden.herokuapp.com/api/v3/quotes")
      .then((res) => {
        return res;
      });
  },
  getAllAuthourQuotes({ commit }, payload) {
    return axios
      .get(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${payload}`)
      .then((res) => {
        commit("setData", res.data.data);
        console.log(res);
        return res;
      });
  },

  getAllAuthQuotesOnChange({ commit }, payload) {
    return axios
      .get(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${payload.author}&page=${payload.page}`
      )
      .then((res) => {
        commit("setData", res.data.data);
        console.log(res);
        return res;
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
