<template>
    <div class="card">
        <v-row class="pb-8">
            <v-col cols="8" offset="2">
                <v-card elevation="6">
                    <v-card-title>
                        <span v-if="!editCardMode">{{ card.name }}</span>
                        <v-text-field v-else v-model="card.name"></v-text-field>
                    </v-card-title>
                    <v-card-subtitle>
                        {{ formatDate(card.addedDate) }}
                    </v-card-subtitle>
                    <v-card-actions v-if="!editCardMode">
                        <v-btn text color="success" @click="editCardMode = true">Edit</v-btn>
                        <v-btn text color="danger" @click="deleteCardProxy">Delete</v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                        <v-btn text color="success" @click="saveCardProxy">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="8" offset="2">
                <v-card elevation="6" class="d-flex justify-center align-center flex-column">
                    <v-text-field label="Name of task" style="width: 75%" class="mt-8" v-model="newTaskText"></v-text-field>
                    <v-card-actions>
                        <v-btn text color="primary" @click="addTaskProxy">Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="8" offset="2" v-for="task in tasks" :key="task.id">
                <v-card elevation="6">
                    <v-card-title>
                        <span v-if="editId != task.id || !editMode">{{ task.text }}</span>
                        <v-text-field v-model="task.text" v-else></v-text-field>
                    </v-card-title>
                    <v-card-subtitle>
                        {{ formatDate(task.addedDate) }}
                    </v-card-subtitle>
                    <v-card-actions v-if="!(editId != task.id || !editMode)">
                        <v-btn text color="primary" @click="saveTaskProxy(task)">Save</v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-switch v-model="task.done" inset :label="task.done ? 'Done' : 'In Progress'" @change="saveTaskProxy(task)"></v-switch>
                    </v-card-text>

                    <v-speed-dial :id="task.id" top right direction="bottom" transition="scale-transition">
                        <template v-slot:activator>
                            <v-btn :id="task.id" color="white" dark fab text>
                                <v-icon>
                                    mdi-dots-vertical
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-btn fab dark small color="green" @click="editTaskToggle(task.id)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn fab dark small color="red" @click="deleteTaskProxy(task)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-speed-dial>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { formatDate } from "../helpers";
import CardsService from "../services/cards.service";

export default {
    name: "Card",

    data() {
        return {
            card: {},
            tasks: [],
            editMode: false,
            editCardMode: false,
            newTaskText: "",
            editId: null,
        };
    },

    created() {
        this.getCard();
        this.getTasks();
    },

    methods: {
        formatDate,

        ...mapActions({
            deleteCard: "cards/delete",
            editCard: "cards/edit",
            addTask: "tasks/add",
            editTask: "tasks/edit",
            deleteTask: "tasks/delete",
            alert: "alert/alert",
        }),

        getCard() {
            CardsService.get(this.$route.params.id)
                .then((data) => {
                    this.card = data;
                })
                .catch(() => {
                    this.$router.push("/cards");
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        getTasks() {
            CardsService.tasks(this.$route.params.id)
                .then((data) => {
                    this.tasks = data;
                })
                .catch(() => {
                    this.$router.push("/cards");
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        deleteCardProxy() {
            this.deleteCard(this.card.id)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully deleted!",
                    });
                    this.$router.push("/");
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        saveCardProxy() {
            this.editCard(this.card)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully saved!",
                    });
                    this.editCardMode = false;
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        addTaskProxy() {
            let task = {
                text: this.newTaskText,
                addedDate: new Date(),
                done: false,
                card: this.card,
            };
            this.addTask(task)
                .then((data) => {
                    this.tasks.push({
                        id: data.id,
                        name: data.name,
                        addedDate: data.addedDate,
                        done: data.done,
                    });
                    this.alert({
                        color: "primary",
                        text: "Succesfully added!",
                    });
                    this.newTaskText = "";
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        saveTaskProxy(task) {
            this.editTask(task)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully saved!",
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

        deleteTaskProxy(task) {
            this.deleteTask(task.id)
                .then(() => {
                    this.alert({
                        color: "primary",
                        text: "Succesfully deleted!",
                    });
                    this.tasks = this.tasks.filter((taskIter) => {
                        return task.id != taskIter.id;
                    });
                })
                .catch(() => {
                    this.alert({
                        color: "red",
                        text: "Something went wrong!",
                    });
                });
        },

        editTaskToggle(id) {
            this.editMode = true;
            this.editId = id;
        },
    },
};
</script>

<style lang="scss"></style>
