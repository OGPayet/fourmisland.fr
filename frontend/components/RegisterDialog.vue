<template>
    <v-row v-if="!isUserLogged" justify="center">
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
                        Créer votre compte
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text v-if="!registerDone" class="login-dialog-text mt-16">
                    <RegisterForm @successRegister="successRegister" @closeDialog="closeDialog" />
                </v-card-text>
                <v-card-text v-else class="login-dialog-text text-center mt-10">
                  <v-icon size="200" color="green">
                    mdi-checkbox-marked-circle-outline
                  </v-icon>

                  <h2 class="dialog-auth-title font-weight-bold mt-7">Compte créé avec succès ! Un e-mail de confirmation vous a été envoyé.</h2>

                  <p class="dialog-auth-text mt-7">Un e-mail a été envoyé à votre adresse. Veillez cliquez sur le lien indiqué dans l'e-mail pour valider votre compte.</p>
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
import RegisterForm from './RegisterForm'

export default {
  components: { RegisterForm },
  props: {
    dialog: Boolean,
    isUserLogged: Boolean,
  },
  data() {
    return {
        registerDone: false,
    };
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
    },
    successRegister(snackbarText) {
        this.registerDone = true;
    }
  },
};
</script>
