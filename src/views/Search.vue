<template>
    <div class="search">
        <v-row>
            <v-col cols="6" offset="3">
                <v-card elevation="6">
                    <v-card-title> Search results for: "{{ queryName }}" </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3" v-for="card in cards" :key="card.id">
                <v-card elevation="6">
                    <v-card-title>
                        <span v-if="editId != card.id || !editMode">{{ card.name }}</span>
                        <v-text-field v-model="card.name" v-else></v-text-field>
                    </v-card-title>
                    <v-card-subtitle>
                        {{ formatDate(card.addedDate) }}
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text color="primary" v-if="editId != card.id || !editMode" :to="`/cards/${card.id}`">Details</v-btn>
                        <v-btn text color="success" v-else @click="saveProxy(card)">Save</v-btn>
                    </v-card-actions>

                    <v-speed-dial :id="card.id" top right direction="bottom" transition="scale-transition">
                        <template v-slot:activator>
                            <v-btn :id="card.id" color="white" dark fab text>
                                <v-icon>
                                    mdi-dots-vertical
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-btn fab dark small color="green" @click="editToggle(card.id)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn fab dark small color="red" @click="deleteProxy(card.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-speed-dial>
                </v-card>
            </v-col>
            <v-col cols="6" offset="3" v-if="cards.length == 0">
                <h1 style="text-align: center">Results Not Found</h1>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDate } from "../helpers";

export default {
    name: "Home",

    data() {
        return {
            fab: false,
            name: "",
            editMode: false,
            editId: null,
            editName: "",
        };
    },

    computed: {
        ...mapGetters({
            cards: "cards/cards",
        }),

        queryName() {
            return this.$route.query.q;
        },
    },

    created() {
        this.getCards();
    },

    watch: {
        queryName() {
            this.getCards();
        },
    },

    methods: {
        formatDate,

        ...mapActions({
            getSearchCards: "cards/search",
            delete: "cards/delete",
            edit: "cards/edit",
            alert: "alert/alert",
        }),

        getCards() {
            this.getSearchCards(this.queryName).catch(() => {
                this.alert({
                    color: "red",
                    text: "Something went wrong!",
                });
            });
        },

        saveProxy(card) {
            this.edit(card)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully edited!",
                    });
                    this.editMode = false;
                    this.editId = null;
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        deleteProxy(id) {
            this.delete(id)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully deleted!",
                    });
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        editToggle(id) {
            this.editMode = true;
            this.editId = id;
        },
    },
};
</script>

<style lang="scss">
.v-speed-dial {
    position: absolute !important;
}

.v-btn--floating {
    position: relative;
}
</style>
