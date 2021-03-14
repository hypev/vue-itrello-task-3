<template>
    <div class="register">
        <v-row>
            <v-col cols="6" offset="3">
                <v-card class="pa-8 rounded-xl">
                    <v-card-title>
                        <span class="headline">
                            <strong>Register</strong>
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            v-model="user.fullname"
                                            :rules="fullnameRules"
                                            :label="'Fullname'"
                                            type="text"
                                            required
                                            outlined
                                            :loading="loading"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            prepend-icon="mdi-email"
                                            v-model="user.email"
                                            :rules="emailRules"
                                            :label="'Email'"
                                            type="email"
                                            required
                                            outlined
                                            :loading="loading"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            prepend-icon="mdi-key"
                                            v-model="user.password"
                                            :rules="passwordRules"
                                            :label="'Password'"
                                            type="password"
                                            required
                                            outlined
                                            clearable
                                            :loading="loading"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            prepend-icon="mdi-key-outline"
                                            v-model="repeatPassword"
                                            :rules="repeatPasswordRules"
                                            :label="'Repeat Password'"
                                            type="password"
                                            required
                                            outlined
                                            clearable
                                            :loading="loading"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox v-model="terms" :rules="termsRules" :disabled="loading">
                                            <template v-slot:label>
                                                <div>
                                                    I have read and accepted the
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on }">
                                                            <a target="_blank" href="https://kurr.me" @click.stop v-on="on">
                                                                terms and conditions
                                                            </a>
                                                        </template>
                                                        Opens in new window
                                                    </v-tooltip>
                                                </div>
                                            </template>
                                        </v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="success"
                            text
                            @click="registerProxy"
                            :disabled="!valid || !user.fullname || !user.email || !user.password || !repeatPassword || !terms"
                            :loading="loading"
                        >
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import User from "../models/user";

export default {
    name: "Register",

    data() {
        return {
            user: new User(),

            loading: false,

            valid: false,
            fullnameRules: [(value) => !!value || "Required"],
            emailRules: [
                (value) => !!value || "Required",
                (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email is not valid",
            ],
            passwordRules: [
                (value) => !!value || "Required",
                (value) => (value && value.length >= 6) || "Password must contains at least 6 characters",
            ],
            repeatPassword: "",
            repeatPasswordRules: [(value) => !!value || "Required", (value) => value == this.user.password || "Repeat password doesn't match"],
            terms: false,
            termsRules: [(value) => value || "Read terms and conditions"],
        };
    },

    computed: {
        ...mapGetters({
            isLogged: "auth/isLogged",
        }),
    },

    methods: {
        ...mapActions({
            register: "auth/register",
            alert: "alert/alert",
        }),

        registerProxy() {
            this.loading = true;
            if (this.valid) {
                this.register(this.user)
                    .then(() => {
                        this.$router.push("/login");
                        this.alert({
                            color: "primary",
                            text: "Succesfully Register!",
                        });
                    })
                    .catch(() => {
                        this.alert({
                            color: "red",
                            text: "User with this email exists!",
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else this.loading = false;
        },
    },
};
</script>

<style></style>
