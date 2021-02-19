<template>
    <v-btn text class="mx-2" color="primary" @click="dialog = true" v-if="!user">
        Register
        <v-dialog class="rounded-xl" v-model="dialog" max-width="600px">
            <v-card class="pa-8 rounded-xl">
                <v-card-title>
                    <span class="headline">
                        <strong>Register</strong>
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="email" :rules="emailRules" :label="'Email'" type="email" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        :label="'Password'"
                                        type="password"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="success" text>
                        Register
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
export default {
    name: "NavbarRegister",

    data() {
        return {
            dialog: false,
            email: "",
            emailRules: [
                (value) => !!value || "Required",
                (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email is not valid",
            ],
            password: "",
            passwordRules: [
                (value) => !!value || "Required",
                (value) => (value && value.length >= 6) || "Password must contains at least 6 characters",
            ],
        };
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
    },
};
</script>

<style lang="scss"></style>
