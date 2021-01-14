<template>
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
</template>

<script>
export default {
  props: {},
  data() {
    return {
        valid: true,
        address: null,
        city: null,
        zipCode: null,
        country: null,
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
        snackbar: false,
        text: '',
    };
  },
  computed: {
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
        this.address = this.userAddress;
        this.city = this.userCity;
        this.zipCode = this.userZipCode;
        this.country = this.userCountry;
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
            this.snackbar = true;
        }
    },
  },
  mounted() {
    this.initInfos();
  }
};
</script>
