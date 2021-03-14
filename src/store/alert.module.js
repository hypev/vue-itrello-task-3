const Alert = {
    namespaced: true,

    state: {
        enable: false,
        color: "primary",
        text: "",
    },

    getters: {
        enable: (state) => state.enable,
        color: (state) => state.color,
        text: (state) => state.text,
    },

    mutations: {
        SET_ENABLE(state, enable) {
            state.enable = enable;
        },

        SET_OPTIONS(state, options) {
            state.color = options.color;
            state.text = options.text;
        },

        CLEAR(state) {
            state.enable = false;
            state.color = "primary";
            state.text = "";
        },
    },

    actions: {
        alert({ commit }, options) {
            commit("SET_OPTIONS", options);
            commit("SET_ENABLE", true);
        },

        disable({ commit }) {
            commit("SET_ENABLE", false);
        },
    },
};

export default Alert;
