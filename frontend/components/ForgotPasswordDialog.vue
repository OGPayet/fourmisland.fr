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
                        Mot de passe oublié
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text v-if="!mailSend" class="login-dialog-text mt-16">
                    <v-form
                        class="form ml-4"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Votre adresse mail"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-email"
                            outlined
                            required
                        ></v-text-field>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mt-7"
                            large
                            @click="forgotPassword()"
                        >
                          Réinitialiser le mot de passe
                        </v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text v-else class="login-dialog-text text-center mt-10">
                  <v-icon size="200" color="green">
                    mdi-checkbox-marked-circle-outline
                  </v-icon>

                  <h2 class="forgot-password-title font-weight-bold mt-7">E-mail de réinitialisation de mot de passe envoyé</h2>

                  <p class="forgot-password-text mt-7">Un e-mail a été envoyé à votre adresse. Suivez les instructions fournies pour réinitialiser votre mot de passe.</p>
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
export default {
  props: {
    dialog: Boolean,
    isUserLogged: Boolean,
  },
  data() {
    return {
      valid: true,
      email: null,
      emailRules: [
          v => !!v || "L'adresse email est requise",
          v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
      ],
      errorForgotPassword: null,
      mailSend: false,
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    closeDialog() {
      this.$emit('onClose');
      this.mailSend ? '' : this.resetForm();
    },
    async forgotPassword() {
      try {
        await this.$strapi.forgotPassword({ email: this.email });
      } catch(error) {
        this.errorForgotPassword = error;
        console.info(error.message);
      }

      if (this.errorForgotPassword == null) {
        this.mailSend = true;
      }
    },
  },
};
</script>
