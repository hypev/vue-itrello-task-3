import CardsService from "../services/cards.service";

const Cards = {
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
            return CardsService.all().then((data) => {
                commit("SET_CARDS", data);
                return data;
            });
        },

        search({ commit }, queryName) {
            return CardsService.search(queryName).then((data) => {
                commit("SET_CARDS", data);
                return data;
            });
        },

        add({ commit }, card) {
            return CardsService.add(card).then((data) => {
                commit("ADD_CARD", data);
                return data;
            });
        },

        edit({ commit }, card) {
            return CardsService.edit(card).then((data) => {
                commit("EDIT_CARD", data);
                return data;
            });
        },

        delete({ commit }, id) {
            return CardsService.delete(id).then((data) => {
                commit("DELETE_CARD", id);
                return data;
            });
        },
    },

    getters: {
        cards: (state) => state.cards,
    },
};

export default Cards;
