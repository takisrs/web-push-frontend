import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '@/store/modules/auth';
import getters from '@/store/getters';
import actions from '@/store/actions';
import mutations from '@/store/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: []
    },
    mutations,
    actions,
    getters,
    modules: {
        auth: authModule
    }
})
