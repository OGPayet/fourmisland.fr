<template>
    <v-row v-if="isUserLogged" justify="center">
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
                        Mon compte
                    </v-toolbar-title>

                    <template v-slot:extension>
                        <v-tabs align-with-title>
                            <v-tab @click="activeTab = 1">Mes infos</v-tab>
                            <v-tab @click="activeTab = 2">Mon adresse de livraison</v-tab>
                            <v-tab @click="activeTab = 3">Mes commandes</v-tab>
                        </v-tabs>
                    </template>
                </v-app-bar>

                <v-card-text v-if="activeTab == 1" class="login-dialog-text mt-16">
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
                            v-model="accountInfosSnackbar"
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
                                    @click="accountInfosSnackbar = false"
                                >
                                    Fermer
                                </v-btn>
                            </template>
                        </v-snackbar>
                    </v-form>
                </v-card-text>
                <v-card-text v-if="activeTab == 2" class="login-dialog-text mt-16">
                    <v-form
                        class="form ml-4"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="address"
                            :rules="addressRules"
                            label="Votre adresse"
                            class="my-account-input"
                            height="60px"
                            prepend-inner-icon="mdi-map-marker"
                            outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="city"
                            :rules="cityRules"
                            label="Votre ville"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-city"
                            outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="zipCode"
                            :rules="zipCodeRules"
                            label="Votre code postal"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-form-textbox-password"
                            outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="country"
                            :rules="countryRules"
                            label="Votre pays"
                            class="my-account-input mt-3"
                            height="60px"
                            prepend-inner-icon="mdi-flag"
                            outlined
                            required
                        ></v-text-field>

                        <v-snackbar
                            v-model="deliveryInfosSnackbar"
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
                                    @click="deliveryInfosSnackbar = false"
                                >
                                    Fermer
                                </v-btn>
                            </template>
                        </v-snackbar>

                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mt-7"
                            large
                            @click="updateDeliveryInfos()"
                        >
                            Sauvegarder
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
        address: null,
        city: null,
        zipCode: null,
        country: null,
        emailRules: [
            v => !!v || "L'adresse email est requise",
            v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
        ],
        usernameRules: [
            v => !!v || "Le pseudo est requis",
        ],
        addressRules: [
            v => !!v || "L'adresse est requise",
        ],
        cityRules: [
            v => !!v || "La ville est requise",
        ],
        zipCodeRules: [
            v => !!v || "Le code postal est requis",
        ],
        countryRules: [
            v => !!v || "Le pays est requis",
        ],
        showPasswordFields: false,
        emailAlreadyTaken: false,
        usernameAlreadyTaken: false,
        activeTab: 1,
        accountInfosSnackbar: false,
        deliveryInfosSnackbar: false,
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
    userAddress() {
        return this.$strapi.user.address;
    },
    userCity() {
        return this.$strapi.user.city;
    },
    userZipCode() {
        return this.$strapi.user.zipCode;
    },
    userCountry() {
        return this.$strapi.user.country;
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
    resetForm() {
        this.$refs.form.reset();
        this.isErrorLogin = false;
        this.isErrorConfirmedEmail = false;
    },
    closeDialog() {
        this.$emit('onClose');
        this.initInfos();
    },
    initInfos() {
        this.email = this.userEmail;
        this.username = this.userUsername;
        this.address = this.userAddress;
        this.city = this.userCity;
        this.zipCode = this.userZipCode;
        this.country = this.userCountry;
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
            this.accountInfosSnackbar = true;
        }
    },
    async updateDeliveryInfos () {
        this.$refs.form.validate();

        this.$strapi.user.address = this.address;
        this.$strapi.user.city = this.city;
        this.$strapi.user.zipCode = this.zipCode;
        this.$strapi.user.country = this.country;

        let errorUpdate = null;
        try {
            await this.$strapi.$users.update(this.$strapi.user.id, this.$strapi.user);
        } catch (error) {
            errorUpdate = error;
            console.info(error.message);
        }

        if (errorUpdate == null) {
            this.textSnackbar = 'Modification sauvegardé avec succès !';
            this.deliveryInfosSnackbar = true;
        }
    },
  },
  mounted() {
    console.info(this.$strapi.user);
    this.initInfos();
  }
};
</script>