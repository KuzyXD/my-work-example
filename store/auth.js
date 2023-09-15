export const state = () => ({
  login: "",
  pass: "",
  loggedIn: false,
});

export const getters = {
  login(state) {
    return state.login;
  },
  pass(state) {
    return state.pass;
  },
  loggedIn(state) {
    return state.loggedIn;
  },
}

export const mutations = {
  setLogin(state, value) {
    state.login = value;
  },
  setPass(state, value) {
    state.pass = value;
  },
  setLoginStatus(state, value) {
    state.loggedIn = value;
  },
}
