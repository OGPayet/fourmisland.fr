<template>
<Products :products="filteredProducts.length > 0 ? filteredProducts : products" :isDataLoaded="isProductsDataLoaded" :error="error" />
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
    isProductsDataLoaded() {
      return this.products.length > 0 ? true : false;
    },
    products() {
      return this.$store.state.products;
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
