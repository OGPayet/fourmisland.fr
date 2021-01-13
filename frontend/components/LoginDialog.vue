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
                        Se connecter
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
                            v-model="email"
                            :rules="emailRules"
                            label="Votre adresse mail"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-email"
                            outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Votre mot de passe"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            required
                        ></v-text-field>

                        <p v-if="isErrorLogin" class="text-white red lighten-2 mt-2">Adresse e-mail ou mot de passe invalide !</p>
                        <p v-if="isErrorConfirmedEmail" class="text-white red lighten-2 mt-2">Veuillez confirmer votre adresse mail !</p>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mt-7"
                            large
                            @click="connection()"
                        >
                            Se connecter
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
  },
  data() {
    return {
        valid: true,
        email: null,
        password: null,
        emailRules: [
            v => !!v || "L'adresse email est requise",
            v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
        ],
        passwordRules: [
            v => !!v || "Le mot de passe est requis",
        ],
        loginResponse: {},
        errorLogin: false,
        errorConfirmedEmail: false,
        successLoginTextSnackbar: 'Vous êtes maintenant connecté.',
    };
  },
  computed: {
    isErrorLogin: {
        get() {
            return this.errorLogin;
        },
        set(value) {
            this.errorLogin = value;
        }
    },
    isErrorConfirmedEmail: {
        get() {
            return this.errorConfirmedEmail;
        },
        set(value) {
            this.errorConfirmedEmail = value;
        }
    },
  },
  methods: {
    resetForm() {
        this.$refs.form.reset();
        this.isErrorLogin = false;
        this.isErrorConfirmedEmail = false;
    },
    closeDialog() {
        this.$emit('onClose');
        this.resetForm();
    },
    async connection () {
        this.$refs.form.validate();
        try {
            this.loginResponse = await this.$strapi.login({ identifier: this.email, password: this.password });
            if (this.loginResponse.jwt != undefined) {
                this.closeDialog();
                this.$emit('successLogin', this.successLoginTextSnackbar);
                this.$store.commit('isUserLogged', true);
            }
        } catch(error) {
            console.info(error.message);
            if (error.message == 'Please provide your username or your e-mail.' || error.message == 'Identifier or password invalid.') {
                this.isErrorLogin = true;
                this.email = '';
                this.password = '';
            } else if (error.message == 'Your account email is not confirmed') {
                this.isErrorConfirmedEmail = true;
            }
        }   
    },
  },
};
</script>
