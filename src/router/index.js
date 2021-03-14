import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Cards from "../views/Cards.vue";
import Card from "../views/Card.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/cards",
        name: "Cards",
        component: Cards,
    },
    {
        path: "/cards/:id",
        name: "Card",
        component: Card,
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        props: (route) => ({ query: route.query.q }),
    },
    {
        path: "*",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/register", "/"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters["auth/isLogged"];

    if (authRequired && !loggedIn) {
        return next("/login");
    }
    if (!authRequired && loggedIn) {
        return next("/cards");
    }

    next();
});

export default router;
