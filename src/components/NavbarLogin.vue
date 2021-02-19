<template>
    <v-btn text class="mx-2" color="primary" @click="dialog = true" v-if="!user">
        Login
        <v-dialog class="rounded-xl" v-model="dialog" max-width="600px">
            <v-card class="pa-8 rounded-xl">
                <v-card-title>
                    <span class="headline">
                        <strong>Login</strong>
                    </span>
                </v-card-title>
                <v-alert border="left" color="red" dense elevation="2" type="error" v-if="error">Email or password incorrect!</v-alert>
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
                                <v-col cols="12">
                                    <v-checkbox v-model="remember" :label="'Remember Me'" color="primary" hide-details></v-checkbox>
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
                    <v-btn color="success" text @click="login">
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
export default {
    name: "NavbarLogin",

    data() {
        return {
            dialog: false,
            error: false,
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
            remember: false,
        };
    },

    computed: {
        users() {
            return this.$store.state.users;
        },

        user() {
            return this.$store.state.user;
        },
    },

    methods: {
        login() {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].email == this.email) {
                    if (this.users[i].password == this.password) {
                        this.$store.commit("login", {
                            user: this.users[i],
                            remember: this.remember,
                        });
                        this.error = false;
                    }
                    this.error = true;
                    return;
                }
            }
            this.error = true;
        },
    },
};
</script>

<style lang="scss"></style>
