import store from "../store";

export function authHeader() {
    let user = store.getters["auth/user"];

    if (user && user.jwtToken) {
        return { Authorization: "Bearer " + user.jwtToken };
    } else {
        return {};
    }
}
