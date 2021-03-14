import axios from "axios";
import config from "config";
import { authHeader } from "../helpers";

const BASE_URL = config.api.baseUrl;
const CARDS_BASE_URL = config.api.cards.baseUrl;
const SEARCH_URL = config.api.cards.search;
const CARD_TASKS_URL = config.api.cards.tasks;

class CardsService {
    all() {
        return axios
            .get(BASE_URL + CARDS_BASE_URL, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    search(q) {
        return axios
            .get(BASE_URL + CARDS_BASE_URL + SEARCH_URL, {
                params: { q },
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    get(id) {
        return axios
            .get(BASE_URL + CARDS_BASE_URL + `/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    tasks(id) {
        return axios
            .get(BASE_URL + CARDS_BASE_URL + `/${id}` + CARD_TASKS_URL, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    add(card) {
        return axios
            .post(BASE_URL + CARDS_BASE_URL, card, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    edit(card) {
        return axios
            .put(BASE_URL + CARDS_BASE_URL + `/${card.id}`, card, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    delete(id) {
        return axios
            .delete(BASE_URL + CARDS_BASE_URL + `/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }
}

export default new CardsService();
