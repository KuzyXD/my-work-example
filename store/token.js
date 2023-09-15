export const state = () => ({
  selectedDevice: undefined,
  loggedIn: false,
});

export const getters = {
  selectedDevice(state) {
    return state.selectedDevice;
  },
  loggedIn(state) {
    return state.loggedIn;
  },
}

export const mutations = {
  setSelectedDevice(state, value) {
    state.selectedDevice = value;
  },
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
}
