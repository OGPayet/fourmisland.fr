<template>
    <div id="my-commands">
        <div v-if="showCommand" id="command">
            <Command :command="selectedCommand" @displayMyCommands="showCommand = false" />
        </div>

        <div v-if="!showCommand" id="commands-list">
            <v-list three-line>
                <template v-for="(command, index) in commands">
                    <v-card v-if="page == command.page" class="mb-5 ml-10 mr-10" outlined :key="index">
                        <v-list-item :key="index">
                            <v-list-item-avatar size="60">
                                <v-icon
                                    class="grey lighten-1"
                                    size="30"
                                    dark
                                >
                                    mdi-package-variant-closed
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <strong><v-list-item-title class="cart-list-item-title">
                                    Commande du {{ $moment(command.created_at).format('LL') }}
                                </v-list-item-title></strong>

                                <v-list-item-subtitle class="mt-2">
                                    Montant : {{ command.prixTotal }} €
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="mt-4">
                                    <v-btn color="#e8eae6" @click="selectedCommand = command; showCommand = true;">
                                        Voir ma commande
                                    </v-btn>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>

                    <v-divider v-if="commands.length > 100 && index != (commands.length - 1)" :key="index"></v-divider>
                </template>
            </v-list>

            <div v-if="commands.length > 4" class="text-center">
                <v-pagination
                    v-model="page"
                    :length="Math.ceil(commands.length / 4)"
                    :total-visible="7"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Command from './Command'

export default {
  components: { Command }, 
  props: {},
  data() {
    return {
        command: {},
        showCommand: false,
        page: 1,
        error: null,
    };
  },
  computed: {
    commands() {
        let page = 1;
        let commandsList = this.$store.state.commands;
        commandsList.forEach((command, index) => {
            index != 0 ? Number.isInteger(index/4) ? page++ : '' : '';
            commandsList[index].page = page;
        });
        
        return commandsList;
    },
    selectedCommand: {
        get() {
            return this.command;
        },
        set(value) {
            this.command = value;
        }
    },
  },
  methods: {},
  async mounted() {
    try {
        this.$store.commit('setCommands', await this.$strapi.$commandes.find({ 'utilisateur.id': this.$strapi.user.id }));
    } catch (error) {
        this.error = error;
    }
  },
};
</script>
