<template>
    <div class="profile">
        <v-row>
            <v-col cols="6" offset="3">
                <v-card rounded="lg">
                    <v-card-title>
                        Profile
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="formProfile" v-model="validProfile" lazy-validation>
                            <v-row>
                                <v-col cols="8" offset="2">
                                    <v-text-field
                                        v-model="user.email"
                                        prepend-icon="mdi-email"
                                        :label="'Email'"
                                        type="email"
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="8" offset="2">
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
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="updateProfileProxy" :disabled="!validProfile || !user.fullname" :loading="loading">
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" offset="3">
                <v-card rounded="lg">
                    <v-card-title>
                        Password
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="formPassword" v-model="validPassword" lazy-validation>
                            <v-row>
                                <v-col cols="8" offset="2">
                                    <v-text-field
                                        prepend-icon="mdi-key-outline"
                                        v-model="oldPassword"
                                        :rules="oldPasswordRules"
                                        :label="'Old Password'"
                                        type="password"
                                        required
                                        outlined
                                        clearable
                                        :loading="loading"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="8" offset="2">
                                    <v-text-field
                                        prepend-icon="mdi-key"
                                        v-model="newPassword"
                                        :rules="newPasswordRules"
                                        :label="'New Password'"
                                        type="password"
                                        required
                                        outlined
                                        clearable
                                        :loading="loading"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="8" offset="2">
                                    <v-text-field
                                        prepend-icon="mdi-key"
                                        v-model="repeatPassword"
                                        :rules="repeatPasswordRules"
                                        :label="'Repeat New Password'"
                                        type="password"
                                        required
                                        outlined
                                        clearable
                                        :loading="loading"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="updatePasswordProxy"
                            :disabled="!validPassword || !oldPassword || !newPassword || !repeatPassword"
                            :loading="loading"
                        >
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Profile",

    data() {
        return {
            loading: false,

            validProfile: false,
            fullnameRules: [(value) => !!value || "Required"],

            validPassword: false,
            oldPassword: "",
            oldPasswordRules: [(value) => !!value || "Required"],
            newPassword: "",
            newPasswordRules: [
                (value) => !!value || "Required",
                (value) => (value && value.length >= 6) || "Password must contains at least 6 characters",
            ],
            repeatPassword: "",
            repeatPasswordRules: [(value) => !!value || "Required", (value) => value == this.newPassword || "Repeat password doesn't match"],
            terms: false,
            termsRules: [(value) => value || "Read terms and conditions"],
        };
    },

    computed: {
        ...mapGetters({
            user: "auth/pureUser",
        }),
    },

    methods: {
        ...mapActions({
            updateProfile: "auth/updateProfile",
            updatePassword: "auth/updatePassword",
            alert: "alert/alert",
        }),

        updateProfileProxy() {
            this.loading = true;
            if (this.validProfile) {
                this.updateProfile(this.user)
                    .then(() => {
                        this.alert({
                            color: "primary",
                            text: "Succesfully update!",
                        });
                    })
                    .catch(() => {
                        this.alert({
                            color: "red",
                            text: "Something went wrong!",
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else this.loading = false;
        },

        updatePasswordProxy() {
            this.loading = true;
            if (this.validPassword) {
                this.updatePassword({
                    user: this.user,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                })
                    .then(() => {
                        this.alert({
                            color: "primary",
                            text: "Succesfully update!",
                        });
                        this.oldPassword = "";
                        this.newPassword = "";
                        this.repeatPassword = "";
                        this.$refs.formPassword.reset();
                    })
                    .catch(() => {
                        this.alert({
                            color: "red",
                            text: "Old password isn't correct!",
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
