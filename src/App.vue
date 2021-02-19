<template>
    <v-app>
        <Navbar />
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",

    components: {
        Navbar,
        Footer,
    },
};
</script>

<style lang="scss"></style>
