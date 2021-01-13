<template>
    <v-row justify="center">
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
                        Merci de votre commande !
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text class="transaction-completed-dialog-text mt-16">
                    <span v-if="$store.state.payer != undefined && $store.state.payer.name != undefined">
                        {{ $store.state.payer.name.given_name + ' ' + $store.state.payer.name.surname }} 
                    </span>
                    votre commande a été effectué avec succès !
                    <br /><br />
                    <span v-if="$store.state.payer != undefined && $store.state.payer.email_address != undefined">
                        Un mail de confirmation va vous être envoyé à votre adresse email : {{ $store.state.payer.email_address }}
                    </span>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        large
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
export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
        this.$store.commit('isTransactionCompleted', false);
    },
  },
};
</script>
