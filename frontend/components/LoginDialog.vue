<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
            @click:outside="closeDialog()"
        >
            <v-card>
                <v-toolbar color="#7c9473">
                    <v-toolbar-title class="cart-title">
                        Se connecter
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text class="login-dialog-text mt-10">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Votre adresse mail"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Votre mot de passe"
                            required
                        ></v-text-field>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="connection"
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
    };
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
    },
    connection () {
        this.$refs.form.validate();
    },
  },
};
</script>
