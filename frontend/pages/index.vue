<template>
  <Products 
    :products="filteredProducts.length > 0 ? filteredProducts : products" 
    :isFilteredProducts="filteredProducts.length > 0 ? true : false"
    :isDataLoaded="isProductsDataLoaded" 
    :error="error" 
  />
</template>

<script>
import Products from "~/components/Products.vue"

export default {
  data() {
    return {
      error: null,
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
    }
  },
  async mounted() {
    try {
      this.$store.commit('setProducts', await this.$strapi.$fourmis.find());
    } catch (error) {
      this.error = error;
    }
  },
  components: {
    Products
  }
}
</script>
