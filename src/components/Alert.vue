<template>
    <v-snackbar v-model="enableProxy" top>
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn :color="color" text v-bind="attrs" @click="disable">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            enableProxy: false,
        };
    },

    computed: {
        ...mapGetters({
            enable: "alert/enable",
            color: "alert/color",
            text: "alert/text",
        }),
    },

    watch: {
        enable() {
            this.enableProxy = this.enable;
        },

        enableProxy() {
            if (!this.enableProxy) {
                this.disable();
            }
        },
    },

    methods: {
        ...mapActions({
            disable: "alert/disable",
        }),
    },
};
</script>

<style></style>
