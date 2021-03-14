<template>
    <div class="home">
        <v-row>
            <v-col cols="6" offset="3">
                <v-img
                    class="greyscale d-flex align-center"
                    :aspect-ratio="16 / 4"
                    width="100%"
                    content-class="d-flex flex-column align-center justify-center"
                    src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                >
                    <v-card>
                        <v-card-title>
                            Manage with your tasks
                        </v-card-title>
                    </v-card>
                    <v-btn class="mt-8" color="primary" to="/register">Register</v-btn>
                </v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" offset="3">
                <v-card>
                    <v-list two-line>
                        <template v-for="(item, index) in items">
                            <v-list-item :key="item.title">
                                <v-list-item-avatar>
                                    <v-icon :color="item.color">
                                        {{ item.icon }}
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon color="green">
                                        mdi-check
                                    </v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "Home",

    data() {
        return {
            items: [
                { title: "Quick Access", subtitle: "Fast and easy", icon: "mdi-clock", color: "blue" },
                { title: "Great Management", subtitle: "Grouping your tasks", icon: "mdi-folder", color: "cyan" },
                { title: "Statistics", subtitle: "Monitoring with your success", icon: "mdi-chart-donut", color: "green" },
                { title: "Cloud Service", subtitle: "Store your data in cloud", icon: "mdi-cloud", color: "red" },
            ],
        };
    },
};
</script>

<style></style>
