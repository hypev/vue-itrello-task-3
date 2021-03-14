import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

const Auth = {
    namespaced: true,

    state: initialState,

    getters: {
        pureUser: (state) => state.user.user,
        user: (state) => state.user,
        isLogged: (state) => state.status.loggedIn,
    },

    mutations: {
        SUCCESS(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },

        FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    },

    actions: {
        login({ commit }, payload) {
            return AuthService.login(payload).then(
                (user) => {
                    commit("SUCCESS", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("FAILURE");
                    return Promise.reject(error);
                }
            );
        },

        logout({ commit }) {
            AuthService.logout();
            commit("FAILURE");
        },

        register({ commit }, user) {
            return AuthService.register(user).then(
                (user) => {
                    commit("SUCCESS", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("FAILURE");
                    return Promise.reject(error);
                }
            );
        },

        updateProfile({ commit }, user) {
            return AuthService.updateProfile(user).then(
                (user) => {
                    commit("SUCCESS", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        updatePassword({ commit }, payload) {
            return AuthService.updatePassword(payload).then(
                (user) => {
                    commit("SUCCESS", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
    },
};

export default Auth;
