export const state = () => ({
  id: undefined,
  status: undefined,
});

export const getters = {
  id(state) {
    return state.id;
  },
  status(state) {
    return state.status;
  },
}

export const mutations = {
  setId(state, value) {
    state.id = value;
  },
  setStatus(state, value) {
    state.status = value;
  },
}
