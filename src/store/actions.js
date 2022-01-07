import router from '../router/index';

export default {
  setMessage({ commit }, message) {
    commit('setMessage', message);
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
        scheduledAt: payload.scheduledAt
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
