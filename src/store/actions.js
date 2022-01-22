export default {
  setMessage({ commit }, message) {
    commit('setMessage', message);
  },

  fetch(
    { commit, state },
    { endpoint, method = 'GET', payload, updateLoadingState = true }
  ) {
    if (updateLoadingState) commit('setIsLoading', true);
    return fetch(process.env.VUE_APP_ENDPOINT + endpoint, {
      method: method,
      body: method !== 'GET' ? payload : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    })
      .then(async (response) => {
        if (updateLoadingState) commit('setIsLoading', false);
        const responseData = await response.json();
        if (!responseData.ok) throw new Error(responseData.message);
        return responseData;
      })
      .catch((error) => {
        if (updateLoadingState) commit('setIsLoading', false);
        commit('setMessage', { message: error.message, class: 'danger' });
      });
  },

  getScript({ dispatch }, payload) {
    return dispatch('fetch', {
      endpoint: `/scripts/${payload.type}?minify=1`,
      updateLoadingState: false
    });
  },

  getLogs({ dispatch }) {
    return dispatch('fetch', {
      endpoint: `/logs`
    });
  }
};
