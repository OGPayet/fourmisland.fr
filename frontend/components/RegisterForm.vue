<template>
    <div>
        <v-form
            v-if="!successRegister"
            :class="breakpointName != 'xs' ? 'form ml-4' : 'form-mobile'"
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
                :class="breakpointName != 'xs' ? 'mr-4 mt-7' : 'mr-4 mt-7 mb-7'"
                large
                @click="register()"
            >
                Créer un compte
            </v-btn>
        </v-form>
        <div v-else class="login-dialog-text text-center">
            <v-icon size="200" color="green">
                mdi-checkbox-marked-circle-outline
            </v-icon>

            <h2 class="dialog-auth-title font-weight-bold mt-7">E-mail de confirmation envoyé</h2>

            <p class="dialog-auth-text mt-7">Un e-mail a été envoyé à votre adresse. Cliquez sur le lien fourni pour confirmer votre adresse e-mail.</p>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 mt-7"
                large
                @click="$emit('goToLogin')"
            >
                se connecter
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
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
        successRegister: false,
        successRegisterTextSnackbar: 'Compte créé avec succès ! Un e-mail de confirmation vous a été envoyé.',
        error: null,
    };
  },
  computed: {
    breakpointName() {
      return this.$vuetify.breakpoint.name;
    },
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
    async register() {
        if (this.$refs.form.validate()) {
            try {
                await this.$strapi.register({ email: this.email, username: this.username, password: this.password });
            } catch (error) {
                this.error = error;
                console.info(this.error.message);
                if (this.error.message == 'Email is already taken.') {
                    this.isEmailAlreadyTaken = true;
                    this.email = '';
                } else if (this.error.message == 'Username already taken') {
                    this.isUsernameAlreadyTaken = true;
                    this.username = '';
                }
            }

            if (this.error == null) {
                this.successRegister = true;
                this.$emit('successRegister', this.successRegisterTextSnackbar);
            }
        }
    },
  },
};
</script>
