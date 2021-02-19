import Vue from "vue";
import Vuex from "vuex";

import cards from "./modules/cards";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cards,
        tasks,
    },

    state: {
        user: JSON.parse(window.localStorage.getItem("user")) || null,
        users: [
            {
                id: 1,
                email: "user1@kurr.me",
                password: "password1",
            },
            {
                id: 2,
                email: "user2@kurr.me",
                password: "password2",
            },
        ],
    },

    mutations: {
        login(state, payload) {
            state.user = payload.user;
            if (payload.remember) {
                window.localStorage.setItem("user", JSON.stringify(state.user));
            }
        },

        logout(state) {
            state.user = null;
            window.localStorage.removeItem("user");
        },
    },
});
