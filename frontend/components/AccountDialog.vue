<template>
    <v-row v-if="isUserLogged" justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
            @click:outside="closeDialog()"
        >
            <v-card>
                <v-app-bar
                    color="#6A76AB"
                    dark
                    :src="require('~/assets/img/banner.jpeg')"
                >
                    <template v-slot:img="{ props }">
                        <v-img
                            v-bind="props"
                            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                        ></v-img>
                    </template>
                    <v-toolbar-title class="cart-title">
                        Mon compte
                    </v-toolbar-title>

                    <template v-slot:extension>
                        <v-tabs align-with-title>
                            <v-tab @click="activeTab = 1">Mes infos</v-tab>
                            <v-tab @click="activeTab = 2">Mon adresse de livraison</v-tab>
                            <v-tab @click="activeTab = 3">Mes commandes</v-tab>
                        </v-tabs>
                    </template>
                </v-app-bar>

                <v-card-text v-if="activeTab == 1" class="login-dialog-text mt-16">
                    <AccountInfosForm />
                </v-card-text>
                <v-card-text v-if="activeTab == 2" class="login-dialog-text mt-16">
                    <DeliveryInfosForm />
                </v-card-text>
                <v-card-text v-if="activeTab == 3" class="login-dialog-text mt-16">
                    <MyCommands />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        @click="closeDialog()"
                    >
                        <v-icon class="mr-2">
                            mdi-keyboard-return
                        </v-icon>
                        Retourner à la boutique
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import AccountInfosForm from './AccountInfosForm'
import DeliveryInfosForm from './DeliveryInfosForm'
import MyCommands from './MyCommands'

export default {
  components: { AccountInfosForm, DeliveryInfosForm, MyCommands },
  props: {
    dialog: Boolean,
    isUserLogged: Boolean,
  },
  data() {
    return {
        activeTab: 1,
        singleCommand: {},
    };
  },
  computed: {
    command: {
        get() {
            return this.singleCommand;
        },
        set(value) {
            this.singleCommand = value;
        }
    }
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
    },
  },
};
</script>
