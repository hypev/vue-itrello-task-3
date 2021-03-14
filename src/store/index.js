import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import cards from "./cards.module";
import tasks from "./tasks.module";

import alert from "./alert.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        cards,
        tasks,

        alert,
    },
});
