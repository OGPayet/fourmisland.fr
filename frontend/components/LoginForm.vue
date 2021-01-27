<template>
    <v-form
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
        <v-btn 
            :class="breakpointName != 'xs' ? 'float-right' : 'forgot-password-btn-mobile float-right'" 
            text 
            color="primary" 
            @click="forgotPassword()"
        >
            Mot de passe oublié ?
        </v-btn>

        <p v-if="isErrorLogin" class="text-white red lighten-2 mt-12">Adresse e-mail ou mot de passe invalide !</p>
        <p v-if="isErrorConfirmedEmail" class="text-white red lighten-2 mt-12">Veuillez confirmer votre adresse mail !</p>
        <p><v-btn
            v-if="isErrorConfirmedEmail && !$store.state.isSendConfirmationEmailClicked"
            :disabled="$store.state.isSendConfirmationEmailClicked"
            color="indigo text-white"
            class="mr-0"
            @click="resendConfirmationMail()"
        >
            Renvoyer l'email de confirmation
        </v-btn></p>

        <v-btn
            :disabled="!valid"
            color="success"
            :class="breakpointName != 'xs' ? 'mr-4 mt-7' : 'mr-4 mt-7 mb-7'"
            large
            @click="connection()"
        >
            Se connecter
        </v-btn>
    </v-form>
</template>

<script>
export default {
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
        errorForgotPassword: null,
        errorSendConfirmationEmail: false,
        successLoginTextSnackbar: 'Vous êtes maintenant connecté.',
    };
  },
  computed: {
    breakpointName() {
      return this.$vuetify.breakpoint.name;
    },
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
    forgotPassword() {
        this.$emit('forgotPassword');
    },
    async resendConfirmationMail() {
        try {
            await this.$strapi.sendEmailConfirmation({ email: this.email });
        } catch(error) {
            this.errorSendConfirmationEmail = error;
            console.info(error.message);
        }

        if (!this.errorSendConfirmationEmail) {
            this.$store.commit('isSendConfirmationEmailClicked', true);
        }
    },
    async connection () {
        if (this.$refs.form.validate()) {
            try {
                this.loginResponse = await this.$strapi.login({ identifier: this.email, password: this.password });
                if (this.loginResponse.jwt != undefined) {
                    this.$store.commit('isUserLogged', true);
                    this.$emit('successLogin', this.successLoginTextSnackbar);
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
        }
    },
  },
  mounted() {
    this.resetForm();
  },
};
</script>
