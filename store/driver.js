export const state = () => ({
  selectedDriver: undefined,
  rutokenPlugin: undefined,
  ready: false,
});

export const getters = {
  selectedDriver(state) {
    return state.selectedDriver;
  },
  rutokenPlugin(state) {
    return state.rutokenPlugin;
  },
  ready(state) {
    return state.ready;
  },
}

export const mutations = {
  setSelectedDriver(state, value) {
    state.selectedDriver = value;
  },
  setRutokenPlugin(state, value) {
    state.rutokenPlugin = value;
  },
  setReady(state, value) {
    state.ready = value;
  },
}
