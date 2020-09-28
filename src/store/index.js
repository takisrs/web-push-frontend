import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex);

const BACKEND_BASE_URL = "http://localhost:3000";

export default new Vuex.Store({
    state: {
        userData: null,
        token: null,
        messages: []
    },
    mutations: {
        auth(state, data) {
            state.token = data.token;
            state.userData = data.userData;
        },
        setMessage(state, data){
            state.messages.push({
                message: data.message,
                class: data.class
            });

            setTimeout(()=>{
                state.messages.shift();
            }, 4000);
        },
        logout(state){
            state.token = null;
            state.userData = null;
        }
    },
    actions: {
        setMessage({ commit }, message){
            commit("setMessage", message);
        },
        signup({ commit }, payload) {
            fetch(BACKEND_BASE_URL + "/auth/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    website: payload.website
                })
            }).then(response => {
                //if (response.ok && response.status == 200)
                return response.json();
            }).then(data => {
                if (data.ok) {
                    commit('setMessage', { message: data.message, class: 'success'});
                } else {
                    commit('setMessage', { message: data.message, class: 'danger'});
                }
            }).catch(error => {
                commit('setMessage', { message: error.message, class: 'danger'});
            });
        },

        checkAutoLogin({ commit }){
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData'));
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            const now = new Date();

            if (token && tokenExpiration && userData && now <= new Date(tokenExpiration)){
                commit('auth', {
                    token: token,
                    userData : userData
                })
            }
        },

        login({ commit, dispatch }, payload) {
            fetch(BACKEND_BASE_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                if (data.ok) {
                    const userData = {
                        userId: data.data.userId,
                        userEmail: data.data.userEmail,
                        website: data.data.website,
                        vapidPublicKey: data.data.vapidPublicKey
                    };
                    commit('auth', {
                        userData: userData,
                        token: data.data.token,
                    });
                    let now = new Date();
                    now.setSeconds( now.getSeconds() + 3600 );
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    localStorage.setItem('tokenExpiration', now);
                    dispatch('setAutoLogout', 3600);
                    commit('setMessage', { message: data.message, class: 'success'});
                    router.push('/');
                } else {
                    commit('setMessage', { message: data.message, class: 'danger'});
                }
            }).catch(error => {
                commit('setMessage', { message: error, class: 'danger'});
            });
        },

        setAutoLogout({ commit }, expiration){
            setTimeout(() => 
                commit('logout'), 
                expiration * 1000
            )
        },

        logout({ commit }){
            commit('logout');
            localStorage.clear();
            router.push('/login');
        },

        getSubscriptions({ commit, state }){
            fetch(BACKEND_BASE_URL + "/subscriptions", {
                headers: {
                    'Authorization': 'Bearer '+state.token
                }
            }).then(response => {
                //if (response.ok && response.status == 200)
                return response.json();
            }).then(data => {
                if (data.ok) {
                    commit('setMessage', { message: data.message, class: 'success'});
                } else {
                    commit('setMessage', { message: data.message, class: 'danger'});
                }
            }).catch(error => {
                commit('setMessage', { message: error.message, class: 'danger'});
            });
        },

        sendNotification({ state, commit }, payload){
            
            fetch(BACKEND_BASE_URL + '/notifications/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state.token
                },
                body: JSON.stringify({
                    title: payload.title,
                    message: payload.message,
                    image: payload.image,
                    icon: payload.icon,
                    badge: payload.badge,
                    vibrate: payload.vibrate,
                    tag: "alert",
                    renotify: true
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                if (data.ok) {
                    commit('setMessage', { message: data.message, class: 'success'});
                } else {
                    commit('setMessage', { message: data.message, class: 'danger'});
                }
            }).catch(error => {
                commit('setMessage', { message: error.message, class: 'danger'});
            });
        }
    },
    getters: {
        userData(state){
            return state.userData;
        },
        isAuthenticated(state) {
            return state.userData !== null;
        },
        messages(state){
            return state.messages;
        }
    },
    modules: {
    }
})
