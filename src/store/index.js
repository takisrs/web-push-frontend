import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '@/store/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: []
    },
    mutations: {

        setMessage(state, data){
            state.messages.push({
                message: data.message,
                class: data.class
            });

            setTimeout(()=>{
                state.messages.shift();
            }, 4000);
        },
    },
    actions: {

        setMessage({ commit }, message){
            commit("setMessage", message);
        },

        getSubscriptions({ commit, state }){
            fetch(process.env.VUE_APP_ENDPOINT + "/subscriptions", {
                headers: {
                    'Authorization': 'Bearer '+state.auth.token
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
            
            fetch(process.env.VUE_APP_ENDPOINT + '/notifications/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state.auth.token
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
        messages(state){
            return state.messages;
        }
    },
    modules: {
        auth: authModule
    }
})
