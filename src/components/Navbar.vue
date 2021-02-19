<template>
    <v-app-bar app class="px-16">
        <span class="mr-4">iTrello</span>
        <v-btn class="mx-2" text to="/">All cards</v-btn>

        <v-spacer></v-spacer>

        <NavbarRegister />
        <NavbarLogin />
        <NavbarLogout />
    </v-app-bar>
</template>

<script>
import NavbarLogin from "./NavbarLogin.vue";
import NavbarRegister from "./NavbarRegister.vue";
import NavbarLogout from "./NavbarLogout.vue";

export default {
    name: "Navbar",

    components: {
        NavbarLogin,
        NavbarRegister,
        NavbarLogout,
    },
};
</script>

<style lang="scss"></style>
