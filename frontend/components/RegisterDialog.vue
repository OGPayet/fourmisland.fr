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
                            v-model="username"
                            :rules="usernameRules"
                            label="Votre pseudo"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-account-arrow-right"
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
                        
                        <p v-if="isEmailAlreadyTaken" class="text-white red lighten-2 mt-2">Cette adresse e-mail est déjà utilisée, veuillez saisir une autre adresse e-mail !</p>
                        <p v-if="usernameAlreadyTaken" class="text-white red lighten-2 mt-2">Ce pseudo est déjà utilisé, veuillez saisir un autre pseudo !</p>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mt-7"
                            large
                            @click="register()"
                        >
                            Créer un compte
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
        username: null,
        password: null,
        emailRules: [
            v => !!v || "L'adresse email est requise",
            v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
        ],
        usernameRules: [
            v => !!v || "Le pseudo est requis",
        ],
        passwordRules: [
            v => !!v || "Le mot de passe est requis",
        ],
        emailAlreadyTaken: false,
        usernameAlreadyTaken: false,
        successRegisterTextSnackbar: 'Compte créé avec succès ! Vous êtes maintenant connecté.',
    };
  },
  computed: {
    isEmailAlreadyTaken: {
        get() {
            return this.emailAlreadyTaken;
        },
        set(value) {
            this.emailAlreadyTaken = value;
        }
    },
    isUsernameAlreadyTaken: {
        get() {
            return this.usernameAlreadyTaken;
        },
        set(value) {
            this.usernameAlreadyTaken = value;
        }
    },
  },
  methods: {
    resetForm() {
        this.$refs.form.reset();
        this.isEmailAlreadyTaken = false;
        this.isUsernameAlreadyTaken = false;
    },
    closeDialog() {
        this.$emit('onClose');
        this.resetForm();
    },
    async register() {
        this.$refs.form.validate();
        try {
            await this.$strapi.register({ email: this.email, username: this.username, password: this.password });
            this.$store.commit('userLogged', true);
            this.closeDialog();
            this.$emit('successRegister', this.successRegisterTextSnackbar);
        } catch (error) {
            if (error.message == 'Email is already taken.') {
                this.isEmailAlreadyTaken = true;
                this.email = '';
            } else if (error.message == 'Username already taken') {
                this.isUsernameAlreadyTaken = true;
                this.username = '';
            }
        }
    },
  },
};
</script>
