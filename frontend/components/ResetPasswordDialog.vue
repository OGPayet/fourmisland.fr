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
                        Réinitialiser le mot de passe
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text class="login-dialog-text mt-16">
                    <v-form
                        class="form ml-4"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Nouveau mot de passe"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="confirmPassword"
                            type="password"
                            :rules="passwordRules"
                            label="Confirmer le nouveau mot de passe"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            required
                        ></v-text-field>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mt-7"
                            large
                            @click="resetPassword()"
                        >
                            Valider
                        </v-btn>
                    </v-form>
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
    code: String,
  },
  data() {
    return {
        valid: true,
        password: null,
        confirmPassword: null,
        passwordRules: [
            v => !!v || "Le mot de passe est requis",
        ],
    };
  },
  methods: {
    resetForm() {
        this.$refs.form.reset();
    },
    closeDialog() {
        this.$emit('onClose');
        this.resetForm();
    },
    async resetPassword() {
      try {
        await this.$strapi.resetPassword({ code: this.code, password: this.password, passwordConfirmation: this.confirmPassword })
      } catch(error) {
        console.info(error.message);
      }
    },
  },
};
</script>
