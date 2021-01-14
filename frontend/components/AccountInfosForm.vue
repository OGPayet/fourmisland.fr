<template>
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
            class="my-account-input"
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
        
        <p v-if="isEmailAlreadyTaken" class="text-white red lighten-2 mt-2">Cette adresse e-mail est déjà utilisée, veuillez saisir une autre adresse e-mail !</p>
        <p v-if="usernameAlreadyTaken" class="text-white red lighten-2 mt-2">Cet pseudo est déjà utilisé, veuillez saisir un autre pseudo !</p>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 mt-7"
            large
            @click="updateAccountInfos()"
        >
            Sauvegarder
        </v-btn>

        <v-snackbar
            v-model="snackbar"
            centered
            timeout="2000"
            color="deep-purple accent-4"
            elevation="24"
        >
            {{ textSnackbar }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Fermer
                </v-btn>
            </template>
        </v-snackbar>
    </v-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        valid: true,
        email: null,
        username: null,
        emailRules: [
            v => !!v || "L'adresse email est requise",
            v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
        ],
        usernameRules: [
            v => !!v || "Le pseudo est requis",
        ],
        emailAlreadyTaken: false,
        usernameAlreadyTaken: false,
        snackbar: false,
        text: '',
    };
  },
  computed: {
    userEmail() {
        return this.$strapi.user.email;
    },
    userUsername() {
        return this.$strapi.user.username;
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
    textSnackbar: {
        get() {
            return this.text;
        },
        set(value) {
            this.text = value;
        }
    },
  },
  methods: {
    initInfos() {
        this.valid = true;
        this.email = this.userEmail;
        this.username = this.userUsername;
    },
    async updateAccountInfos () {
        this.$refs.form.validate();

        this.$strapi.user.email = this.email;
        this.$strapi.user.username = this.username;

        let errorUpdate = null;
        try {
            await this.$strapi.$users.update(this.$strapi.user.id, this.$strapi.user);
        } catch (error) {
            errorUpdate = error;
            console.info(error.message);
            if (error.message == 'Email already taken') {
                this.isEmailAlreadyTaken = true;
                this.email = '';
            } else if (error.message == 'username.alreadyTaken.') {
                this.isUsernameAlreadyTaken = true;
                this.username = '';
            }
        }

        if (errorUpdate == null) {
            this.isEmailAlreadyTaken = false;
            this.isUsernameAlreadyTaken = false;
            this.textSnackbar = 'Modification sauvegardé avec succès !';
            this.snackbar = true;
        }
    },
  },
  mounted() {
    this.initInfos();
  }
};
</script>
