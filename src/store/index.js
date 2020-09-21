import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const BACKEND_BASE_URL = "http://localhost:3000";

export default new Vuex.Store({
    state: {
        userId: null,
        token: null,
        messages: []
    },
    mutations: {
        auth(state, data) {
            state.token = data.token;
            state.userId = data.userId;
        },
        setMessage(state, data){
            state.messages.push({
                message: data.message,
                class: data.class
            });

            setTimeout(()=>{
                state.messages = [];
            }, 4000);
        },
        logout(state){
            state.token = null;
            state.userId = null;
        }
    },
    actions: {
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

        login({ commit }, payload) {
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
                    commit('auth', {
                        userId: data.data.userId,
                        token: data.data.token,
                    });
                    commit('setMessage', { message: data.message, class: 'success'});
                } else {
                    commit('setMessage', { message: data.message, class: 'danger'});
                }
            });
        },

        logout({ commit }){
            commit('logout');
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.userId !== null;
        },
        messages(state){
            return state.messages;
        }
    },
    modules: {
    }
})
