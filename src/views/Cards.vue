<template>
    <div class="cards">
        <v-row>
            <v-col cols="6" offset="3">
                <v-card elevation="6" class="d-flex justify-center align-center flex-column">
                    <v-text-field label="Name of card" style="width: 75%" class="mt-8" v-model="name"></v-text-field>
                    <v-card-actions>
                        <v-btn text color="primary" @click="addProxy">Add</v-btn>
                    </v-card-actions>
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
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDate } from "../helpers";

export default {
    name: "Cards",

    data() {
        return {
            fab: false,
            name: "",
            editMode: false,
            editId: null,
            editName: "",
        };
    },

    computed: mapGetters({
        cards: "cards/cards",
    }),

    created() {
        this.getCards().catch(() => {
            this.alert({
                color: "red",
                text: "Something went wrong!",
            });
        });
    },

    methods: {
        formatDate,

        ...mapActions({
            getCards: "cards/all",
            delete: "cards/delete",
            add: "cards/add",
            edit: "cards/edit",
            alert: "alert/alert",
        }),

        addProxy() {
            this.add({
                name: this.name,
                addedDate: new Date(),
            })
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully added!",
                    });
                    this.name = "";
                })
                .catch(() => {
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
