import router from '../router/index';

export default {
  setMessage({ commit }, message) {
    commit('setMessage', message);
  },

  getNotification({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_ENDPOINT + '/notifications/' + payload.id, {
        headers: {
          Authorization: 'Bearer ' + state.auth.token,
        },
      })
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            resolve(data);
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
            reject(data.message);
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
    });
  },

  getNotifications({ commit, state }, payload) {
    commit('setIsLoading', true);
    return new Promise((resolve, reject) => {
      fetch(
        process.env.VUE_APP_ENDPOINT + '/notifications?page=' + payload.page,
        {
          headers: {
            Authorization: 'Bearer ' + state.auth.token,
          },
        }
      )
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          commit('setIsLoading', false);
          if (data.ok) {
            resolve(data);
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
            reject(data.message);
          }
        })
        .catch((error) => {
          commit('setIsLoading', false);
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
    });
  },

  deleteNotification({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_ENDPOINT + '/notifications/' + payload.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + state.auth.token,
        },
      })
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            resolve(data);
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
            reject(data.message);
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
    });
  },

  copyNotification({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_ENDPOINT + '/notifications/' + payload.id, {
        method: 'COPY',
        headers: {
          Authorization: 'Bearer ' + state.auth.token,
        },
      })
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            resolve(data);
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
            reject(data.message);
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
    });
  },

  getSubscriptions({ commit, state }) {
    return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_ENDPOINT + '/subscriptions', {
        headers: {
          Authorization: 'Bearer ' + state.auth.token,
        },
      })
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            resolve(data);
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
            reject(data.message);
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
          reject(error.message);
        });
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
          //if (response.ok && response.status == 200)
          return response.text();
        })
        .then((data) => {
          //if (data.ok) {
          resolve(data);
          //} else {
          //    reject(data.message);
          //}
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
