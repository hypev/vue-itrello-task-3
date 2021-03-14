module.exports = {
    transpileDependencies: ["vuetify"],
    configureWebpack: {
        externals: {
            config: JSON.stringify({
                api: {
                    baseUrl: "http://localhost:3228/api",
                    auth: {
                        baseUrl: "/auth",
                        login: "/login",
                        register: "/register",
                        profile: {
                            baseUrl: "/profile",
                            profileUpdate: "/update",
                            passwordUpdate: "/update-password",
                        },
                    },
                    cards: {
                        baseUrl: "/cards",
                        search: "/search",
                        tasks: "/tasks",
                    },
                    tasks: {
                        baseUrl: "/tasks",
                    },
                },
            }),
        },
    },
};
