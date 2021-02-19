import axios from "axios";

const BASE_URL = "http://localhost:3228/api/tasks";

const tasks = {
    namespaced: true,
    state: {
        tasks: [],
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },

        ADD_TASK(state, task) {
            state.tasks.unshift(task);
        },

        EDIT_TASK(state, newTask) {
            const index = state.tasks.findIndex((task) => task.id === newTask.id);
            if (index != -1) {
                state.tasks.splice(index, 1, newTask);
            }
        },

        DELETE_TASK(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
    },
    actions: {
        all({ commit }) {
            axios.get(BASE_URL).then((response) => {
                commit("SET_TASKS", response.data);
            });
        },

        add({ commit }, task) {
            axios.post(BASE_URL, task).then((response) => {
                commit("ADD_TASK", response.data);
            });
        },

        edit({ commit }, task) {
            axios.put(BASE_URL + `/${task.id}`, task).then((response) => {
                commit("EDIT_TASK", response.data);
            });
        },

        delete({ commit }, id) {
            axios.delete(BASE_URL + `/${id}`).then(() => {
                commit("DELETE_TASK", id);
            });
        },
    },
    getters: {
        tasks: (state) => state.tasks,
    },
};

export default tasks;
