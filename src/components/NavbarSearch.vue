<template>
    <form action="/search" method="GET" @submit.prevent="handleSubmit">
        <v-text-field class="mt-6" label="Search..." solo clearable dense append-icon="mdi-magnify" v-model="query"></v-text-field>
    </form>
</template>

<script>
export default {
    name: "NavbarSearch",

    data() {
        return {
            query: "",
        };
    },

    methods: {
        handleSubmit() {
            this.$router.push({
                name: "Search",
                query: {
                    q: this.query,
                },
            });
            this.query = "";
        },
    },
};
</script>

<style lang="scss"></style>
