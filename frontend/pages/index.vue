<template>
  <div>
    <Products 
      :products="filteredProducts.length > 0 ? filteredProducts : products" 
      :isFilteredProducts="filteredProducts.length > 0 ? true : false"
      :isDataLoaded="isProductsDataLoaded" 
      :error="error" 
    />

    <ResetPasswordDialog 
      v-if="!isUserLogged"
      :dialog="resetPasswordDialog"
      :code="resetPasswordCode"
      :isUserLogged="isUserLogged"
      @onClose="resetPasswordDialog = false"  
    />
    <Snackbar 
      :snackbar="showSnackbar" 
      :textSnackbar="textSnackbar" 
      @displaySnackbar="displaySnackbar" 
    />
  </div>
</template>

<script>
import Products from "~/components/Products.vue"
import Snackbar from '~/components/Snackbar'
import ResetPasswordDialog from '~/components/ResetPasswordDialog'

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: null,
      error: null,
      errorEmailConfirmation: null,
      resetPasswordDialog: false,
      resetPasswordCode: null,
    }
  },
  computed: {
    isUserLogged() {
      return this.$store.state.isUserLogged && this.$strapi.user ? true : false;
    },
    isProductsDataLoaded() {
      return this.products.length > 0 ? true : false;
    },
    products() {
      let page = 1;
      let productsList = this.$store.state.products;
      productsList.forEach((product, index) => {
        index != 0 ? Number.isInteger(index/9) ? page++ : '' : '';
        productsList[index].page = page;
      });
      
      return productsList;
    },
    filteredProducts() {
      return this.$store.state.filteredProducts;
    },
    showSnackbar: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.snackbar = value;
      }
    },
    textSnackbar: {
      get() {
        return this.snackbarText;
      },
      set(value) {
        this.snackbarText = value;
      }
    },
  },
  methods: {
    displaySnackbar(value) {
      this.showSnackbar = value;
    },
  },
  async mounted() {
    try {
      this.$store.commit('setProducts', await this.$strapi.$fourmis.find());
    } catch (error) {
      this.error = error;
    }

    if (this.$route.query != undefined) {
      if (this.$route.query.confirmation != undefined) {
        try {
          let path = '/auth/email-confirmation?confirmation=' + this.$route.query.confirmation;
          await this.$strapi.$http.$get(path);
        } catch(error) {
          this.errorEmailConfirmation = error;
          console.info(error.message);
        }

        if (this.errorEmailConfirmation == null) {
          this.showSnackbar = true;
          this.textSnackbar = 'Votre email est confirmé avec succès, vous pouvez maintenant vous connecter !';
        }
      } else if (this.$route.query.code != undefined) {
        this.resetPasswordCode = this.$route.query.code;
        this.resetPasswordDialog = true;
      }
    }
  },
  components: {
    Products,
    Snackbar,
    ResetPasswordDialog
  },
}
</script>
