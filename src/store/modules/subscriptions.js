export default {
  actions: {
    getSubscriptions({ dispatch }) {
      return dispatch('fetch', {
        endpoint: '/subscriptions',
        updateLoadingState: true
      });
    }
  }
};
