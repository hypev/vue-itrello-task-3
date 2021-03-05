import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
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
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
