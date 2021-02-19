import axios from "axios";

const BASE_URL = "http://localhost:3228/api/cards";

const cards = {
    namespaced: true,

    state: {
        cards: [],
    },

    mutations: {
        SET_CARDS(state, cards) {
            state.cards = cards;
        },

        ADD_CARD(state, card) {
            state.cards.unshift(card);
        },

        EDIT_CARD(state, newCard) {
            const index = state.cards.findIndex((card) => card.id === newCard.id);
            if (index != -1) {
                state.cards.splice(index, 1, newCard);
            }
        },

        DELETE_CARD(state, id) {
            state.cards = state.cards.filter((card) => card.id !== id);
        },
    },

    actions: {
        all({ commit }) {
            axios.get(BASE_URL).then((response) => {
                commit("SET_CARDS", response.data);
            });
        },

        add({ commit }, card) {
            axios.post(BASE_URL, card).then((response) => {
                commit("ADD_CARD", response.data);
            });
        },

        edit({ commit }, card) {
            axios.put(BASE_URL + `/${card.id}`, card).then((response) => {
                commit("EDIT_CARD", response.data);
            });
        },

        delete({ commit }, id) {
            axios.delete(BASE_URL + `/${id}`).then(() => {
                commit("DELETE_CARD", id);
            });
        },
    },

    getters: {
        cards: (state) => state.cards,
    },
};

export default cards;
