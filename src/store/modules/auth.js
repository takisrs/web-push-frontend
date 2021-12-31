import router from '../../router/index';

export default {
  state: {
    userData: null,
    token: null,
  },
  mutations: {
    auth(state, data) {
      state.token = data.token;
      state.userData = data.userData;
    },
    logout(state) {
      state.token = null;
      state.userData = null;
    },
  },
  actions: {
    signup({ commit }, payload) {
      fetch(process.env.VUE_APP_ENDPOINT + '/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
          website: payload.website,
        }),
      })
        .then((response) => {
          //if (response.ok && response.status == 200)
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            commit('setMessage', { message: data.message, class: 'success' });
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error.message, class: 'danger' });
        });
    },

    checkAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData'));
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const now = new Date();

      if (
        token &&
        tokenExpiration &&
        userData &&
        now <= new Date(tokenExpiration)
      ) {
        commit('auth', {
          token: token,
          userData: userData,
        });
      }
    },

    login({ commit, dispatch }, payload) {
      fetch(process.env.VUE_APP_ENDPOINT + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            const userData = {
              userId: data.data.userId,
              userEmail: data.data.userEmail,
              website: data.data.website,
              vapidPublicKey: data.data.vapidPublicKey,
            };
            commit('auth', {
              userData: userData,
              token: data.data.token,
            });
            let now = new Date();
            now.setSeconds(now.getSeconds() + 3600);
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('tokenExpiration', now);
            dispatch('setAutoLogout', 3600);
            commit('setMessage', { message: data.message, class: 'success' });
            router.push('/');
          } else {
            commit('setMessage', { message: data.message, class: 'danger' });
          }
        })
        .catch((error) => {
          commit('setMessage', { message: error, class: 'danger' });
        });
    },

    setAutoLogout({ commit }, expiration) {
      setTimeout(() => commit('logout'), expiration * 1000);
    },

    logout({ commit }) {
      commit('logout');
      localStorage.clear();
      router.push('/login');
    },
  },

  getters: {
    token(state) {
      return state.token;
    },
    userData(state) {
      return state.userData;
    },
    isAuthenticated(state) {
      return state.userData !== null;
    },
  },
};
