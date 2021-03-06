import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
import BackendService from "../services/BackendService"
export const store = new Vuex.Store({
    state: {
        user: false,
        room: false,

    },
    getters: {
        getUser(state) {
            return state.user;
        },

        getRoom(state) {
            return state.room;
        },

    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        },

        setRoom(state, value) {
            state.room = value;
        },

    },
    actions: {
        async postLogin({ commit }, user) {
            const data = await BackendService.postLogin(user);
            console.log(data.user)
            commit("setUser", data.user);
            commit("setRoomMessage", data.allMessage);
            return data;
        },
    }
})