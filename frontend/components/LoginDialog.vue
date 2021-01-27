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
                    <v-toolbar-title :class="breakpointName != 'xs' ? 'cart-title' : 'cart-title-mobile'">
                        Se connecter
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text class="login-dialog-text mt-16">
                    <LoginForm @forgotPassword="forgotPassword" @successLogin="successLogin" />
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
import LoginForm from './LoginForm'

export default {
  components: { LoginForm },
  props: {
    dialog: Boolean,
    isUserLogged: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
    },
    forgotPassword() {
        this.closeDialog();
        this.$emit('forgotPassword');
    },
    successLogin(successLoginTextSnackbar) {
        this.$emit('successLogin', successLoginTextSnackbar);
        this.closeDialog();
    },
  },
  computed: {
    breakpointName() {
      return this.$vuetify.breakpoint.name;
    },
  },
};
</script>
