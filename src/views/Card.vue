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
                        <v-btn text color="danger" @click="deleteCurrentCard">Delete</v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                        <v-btn text color="success" @click="saveCurrentCard">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="8" offset="2">
                <v-card elevation="6" class="d-flex justify-center align-center flex-column">
                    <v-text-field label="Name of task" style="width: 75%" class="mt-8" v-model="newTaskText"></v-text-field>
                    <v-card-actions>
                        <v-btn text color="primary" @click="addTaskToCard">Add</v-btn>
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
                        <v-btn text color="primary" @click="saveTask(task)">Save</v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <v-switch v-model="task.done" inset :label="task.done ? 'Done' : 'In Progress'" @change="saveTask(task)"></v-switch>
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
                        <v-btn fab dark small color="red" @click="deleteCardAction(task)">
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
import axios from "axios";

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
        formatDate(date) {
            return new Date(Date.parse(date)).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },

        getCard() {
            axios
                .get(`http://localhost:3228/api/cards/${this.$route.params.id}`)
                .then((response) => {
                    this.card = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getTasks() {
            this.tasks = axios
                .get(`http://localhost:3228/api/cards/${this.$route.params.id}/tasks`)
                .then((response) => {
                    this.tasks = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        ...mapActions({
            deleteCard: "cards/delete",
            editCard: "cards/edit",

            addTask: "tasks/add",
            editTask: "tasks/edit",
            deleteTask: "tasks/delete",
        }),

        deleteCurrentCard() {
            this.deleteCard(this.card.id);
            this.$router.push("/");
        },

        saveCurrentCard() {
            this.editCard(this.card);
            this.editCardMode = false;
        },

        addTaskToCard() {
            let task = {
                text: this.newTaskText,
                addedDate: new Date(),
                done: false,
                card: this.card,
            };
            this.addTask(task);
            this.tasks.push(task);
            this.newTaskText = "";
        },

        saveTask(task) {
            this.editTask(task);
            this.editMode = false;
            this.editId = null;
        },

        editTaskToggle(id) {
            this.editMode = true;
            this.editId = id;
        },

        deleteCardAction(task) {
            this.deleteTask(task.id);
            this.tasks = this.tasks.filter((taskIter) => {
                return task.id != taskIter.id;
            });
        },
    },
};
</script>

<style lang="scss"></style>
