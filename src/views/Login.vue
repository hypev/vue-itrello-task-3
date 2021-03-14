<template>
    <div class="login" v-if="!isLogged">
        <v-row>
            <v-col cols="6" offset="3">
                <v-card class="pa-8 rounded-xl">
                    <v-card-title>
                        <span class="headline">
                            <strong>Login</strong>
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user.email"
                                            prepend-icon="mdi-account"
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
                                            v-model="user.password"
                                            prepend-icon="mdi-key"
                                            :rules="passwordRules"
                                            :label="'Password'"
                                            type="password"
                                            required
                                            clearable
                                            outlined
                                            :loading="loading"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox
                                            v-model="remember"
                                            :label="'Remember Me'"
                                            color="primary"
                                            hide-details
                                            :disabled="loading"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" text @click="loginProxy" :disabled="!valid || !user.email || !user.password" :loading="loading">
                            Login
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
    name: "Login",

    data() {
        return {
            user: new User(),

            loading: false,

            valid: false,
            emailRules: [(value) => !!value || "Required"],
            passwordRules: [(value) => !!value || "Required"],

            remember: false,
        };
    },

    computed: {
        ...mapGetters({
            isLogged: "auth/isLogged",
        }),
    },

    methods: {
        ...mapActions({
            login: "auth/login",
            alert: "alert/alert",
        }),

        loginProxy() {
            this.loading = true;
            if (this.valid) {
                this.login({
                    user: this.user,
                    remember: this.remember,
                })
                    .then(() => {
                        this.$router.push("/cards");
                        this.alert({
                            color: "primary",
                            text: "Succesfully Login!",
                        });
                    })
                    .catch(() => {
                        this.alert({
                            color: "red",
                            text: "Email or password not correct",
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
