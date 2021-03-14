import axios from "axios";
import config from "config";
import { authHeader } from "../helpers";

const BASE_URL = config.api.baseUrl;
const AUTH_BASE_URL = config.api.auth.baseUrl;
const LOGIN_URL = config.api.auth.login;
const REGISTER_URL = config.api.auth.register;
const PROFILE_BASE_URL = config.api.auth.profile.baseUrl;
const PROFILE_UPDATE_URL = config.api.auth.profile.profileUpdate;
const PROFILE_UPDATE_PASSWORD_URL = config.api.auth.profile.passwordUpdate;

class AuthService {
    login({ user, remember }) {
        return axios.post(BASE_URL + AUTH_BASE_URL + LOGIN_URL, user).then((response) => {
            if (response.data.jwtToken && remember) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    register(user) {
        return axios.post(BASE_URL + AUTH_BASE_URL + REGISTER_URL, user).then((response) => {
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    updateProfile(user) {
        return axios
            .post(
                BASE_URL + AUTH_BASE_URL + PROFILE_BASE_URL + PROFILE_UPDATE_URL,
                {
                    email: user.email,
                    fullname: user.fullname,
                },
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }

    updatePassword({ user, oldPassword, newPassword }) {
        return axios
            .post(
                BASE_URL + AUTH_BASE_URL + PROFILE_BASE_URL + PROFILE_UPDATE_PASSWORD_URL,
                {
                    email: user.email,
                    oldPassword,
                    newPassword,
                },
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            });
    }
}

export default new AuthService();
