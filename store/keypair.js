export const state = () => ({
  id: undefined,
});

export const getters = {
  id(state) {
    return state.id;
  },
}

export const mutations = {
  setId(state, value) {
    state.id = value;
  },
}
