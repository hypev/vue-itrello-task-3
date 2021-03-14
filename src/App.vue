<template>
    <v-app>
        <Navbar />
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
        <Footer />
        <Alert />
    </v-app>
</template>

<script>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",

    components: {
        Alert,
        Navbar,
        Footer,
    },
};
</script>

<style lang="scss"></style>
