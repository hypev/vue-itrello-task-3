<template>
    <v-btn text class="mx-2" color="red lighten-1" @click="logout" v-if="user">
        <v-icon>{{ logoutIcon }}</v-icon>
    </v-btn>
</template>

<script>
import { mdiLogout } from "@mdi/js";
export default {
    name: "NavbarLogout",

    data() {
        return {
            logoutIcon: mdiLogout,
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
    },

    methods: {
        logout() {
            this.$store.commit("logout");
        },
    },
};
</script>

<style lang="scss"></style>
