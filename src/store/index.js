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
            }).catch(error => {
                commit('setMessage', { message: error, class: 'danger'});
            });
        },

        logout({ commit }){
            commit('logout');
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

        sendNotification({ state, commit }){
            
            fetch(BACKEND_BASE_URL + '/notifications/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state.token
                },
                body: JSON.stringify({
                    title: "Web Push Notifications",
                    message: "Just an example notification",
                    image: "https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg",
                    icon: "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
                    badge: "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
                    vibrate: [100, 20, 100],
                    tag: "alert",
                    renotify: true,
                    data: {
                        url: "https://nodejs.org/en/"	
                    },
                    actions: [
                        {
                            action: "confirm",
                            title: "Read More",
                            icon: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png"
                        },
                        {
                            action: "cancel",
                            title: "Close",
                            icon: "https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png"
                        }
                    ]
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
