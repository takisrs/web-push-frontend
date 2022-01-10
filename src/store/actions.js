import router from '../router/index';

export default {
  setMessage({ commit }, message) {
    commit('setMessage', message);
  },

  fetch({ commit, state }, { endpoint, method = 'GET', payload }) {
    commit('setIsLoading', true);
    return fetch(process.env.VUE_APP_ENDPOINT + endpoint, {
      method: method,
      body: method !== 'GET' ? payload : undefined,
      headers: {
        Authorization: 'Bearer ' + state.auth.token,
      },
    })
      .then(async (response) => {
        commit('setIsLoading', false);
        if (response.ok) {
          const responseData = await response.json();
          if (!responseData.ok) throw new Error(responseData.message);
          return responseData;
        }
      })
      .catch((error) => {
        commit('setIsLoading', false);
        commit('setMessage', { message: error.message, class: 'danger' });
      });
  },

  getNotification({ dispatch }, payload) {
    return dispatch('fetch', {
      endpoint: `/notifications/${payload.id}`,
    });
  },

  getNotifications({ dispatch }, payload) {
    return dispatch('fetch', {
      endpoint: `/notifications?page=${payload.page}`,
    });
  },

  deleteNotification({ dispatch }, payload) {
    return dispatch('fetch', {
      endpoint: `/notifications/${payload.id}`,
      method: 'DELETE',
    });
  },

  copyNotification({ dispatch }, payload) {
    return dispatch('fetch', {
      endpoint: `/notifications/${payload.id}`,
      method: 'COPY',
    });
  },

  getSubscriptions({ dispatch }) {
    return dispatch('fetch', {
      endpoint: '/subscriptions',
    });
  },

  getScript({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      fetch(
        process.env.VUE_APP_ENDPOINT + '/scripts/' + payload.type + '?minify=1',
        {
          headers: {
            Authorization: 'Bearer ' + state.auth.token,
          },
        }
      )
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
    });
  },

  createNotification({ state, commit }, payload) {
    let extraParams = {};
    if (payload.url) {
      extraParams = {
        data: {
          url: payload.url,
        },
        actions: [
          {
            action: 'confirm',
            title: 'Read More',
          },
          {
            action: 'cancel',
            title: 'Close',
          },
        ],
      };
    }
    fetch(process.env.VUE_APP_ENDPOINT + '/notifications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token,
      },
      body: JSON.stringify({
        title: payload.title,
        message: payload.message,
        image: payload.image,
        icon: payload.icon,
        badge: payload.badge,
        vibrate: payload.vibrate,
        tag: 'alert',
        renotify: true,
        status: payload.status,
        scheduledAt: payload.scheduledAt,
        ...extraParams,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          commit('setMessage', { message: data.message, class: 'success' });
          router.push('/notifications');
        } else {
          commit('setMessage', { message: data.message, class: 'danger' });
        }
      })
      .catch((error) => {
        commit('setMessage', { message: error.message, class: 'danger' });
      });
  },

  editNotification({ state, commit }, payload) {
    fetch(process.env.VUE_APP_ENDPOINT + '/notifications/' + payload.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token,
      },
      body: JSON.stringify({
        title: payload.title,
        message: payload.message,
        image: payload.image,
        icon: payload.icon,
        badge: payload.badge,
        vibrate: payload.vibrate,
        status: payload.status,
        data: {
          url: payload.url,
        },
        scheduledAt: payload.scheduledAt,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          commit('setMessage', { message: data.message, class: 'success' });
          router.push('/notifications');
        } else {
          commit('setMessage', { message: data.message, class: 'danger' });
        }
      })
      .catch((error) => {
        commit('setMessage', { message: error.message, class: 'danger' });
      });
  },
};
