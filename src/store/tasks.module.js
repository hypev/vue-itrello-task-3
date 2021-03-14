import TasksService from "../services/tasks.service";

const Tasks = {
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
            return TasksService.all().then((data) => {
                commit("SET_TASKS", data);
                return data;
            });
        },

        add({ commit }, task) {
            return TasksService.add(task).then((data) => {
                commit("ADD_TASK", data);
                return data;
            });
        },

        edit({ commit }, task) {
            return TasksService.edit(task).then((data) => {
                commit("EDIT_TASK", data);
                return data;
            });
        },

        delete({ commit }, id) {
            return TasksService.delete(id).then((data) => {
                commit("DELETE_TASK", id);
                return data;
            });
        },
    },
    getters: {
        tasks: (state) => state.tasks,
    },
};

export default Tasks;
