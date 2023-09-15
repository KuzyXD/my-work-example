export const state = () => ({
  list: undefined
});

export const getters = {
  list(state) {
    return state.list;
  },
  getById(state) {
    state.list.forEach();
  }
};

export const mutations = {
  setList(state, value) {
    state.list = value;
  }
};
