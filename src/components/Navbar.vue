<template>
    <v-app-bar app class="px-16">
        <span class="mr-4">iTrello</span>
        <v-btn class="mx-2" text to="/" v-if="!isLogged">Home</v-btn>
        <v-btn class="mx-2" text to="/cards" v-if="isLogged">All cards</v-btn>

        <v-spacer></v-spacer>

        <v-btn text class="mx-2" color="primary" to="/register" v-if="!isLogged">
            Register
        </v-btn>
        <v-btn text class="mx-2" color="primary" to="/login" v-if="!isLogged">
            Login
        </v-btn>

        <NavbarSearch v-if="isLogged" />
        <v-btn text class="mx-2" color="primary" to="/profile" v-if="isLogged">
            {{ fullname }}
        </v-btn>
        <v-btn text class="mx-2" color="primary" v-if="isLogged" @click="logoutProxy">
            Logout
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NavbarSearch from "./NavbarSearch.vue";

export default {
    name: "Navbar",

    components: {
        NavbarSearch,
    },

    computed: {
        ...mapGetters({
            isLogged: "auth/isLogged",
            user: "auth/pureUser",
        }),

        fullname() {
            return this.user && this.user.fullname ? this.user.fullname : "Profile";
        },
    },

    methods: {
        ...mapActions({
            logout: "auth/logout",
        }),

        logoutProxy() {
            this.logout();
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="scss"></style>
