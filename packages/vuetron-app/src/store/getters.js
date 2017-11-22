const getters = {
  subsBool: (state, getters) => Object.keys(state.subscriptions).length > 0,
  allSubs: (state, getters) => state.subscriptions
};

export default getters;
