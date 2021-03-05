<template>
    <form action="/search" method="GET">
        <v-text-field class="mt-6" label="Search..." solo clearable dense append-icon="mdi-magnify" name="q"></v-text-field>
    </form>
</template>

<script>
export default {
    name: "NavbarSearch",
};
</script>

<style lang="scss"></style>
