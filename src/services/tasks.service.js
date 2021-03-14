import axios from "axios";
import config from "config";
import { authHeader } from "../helpers";

const BASE_URL = config.api.baseUrl;
const TASKS_BASE_URL = config.api.tasks.baseUrl;

class CardsService {
    all() {
        return axios
            .get(BASE_URL + TASKS_BASE_URL, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    add(task) {
        return axios
            .post(BASE_URL + TASKS_BASE_URL, task, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    edit(task) {
        return axios
            .put(BASE_URL + TASKS_BASE_URL + `/${task.id}`, task, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    delete(id) {
        return axios
            .delete(BASE_URL + TASKS_BASE_URL + `/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }
}

export default new CardsService();
