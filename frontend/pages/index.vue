<template>
<Products :products="fourmis" :error="error" :storeUrl="storeUrl" />
</template>

<script>
import Products from "~/components/Products.vue"

export default {
  data() {
    return {
      products: [],
      fourmis: [],
      storeUrl: process.env.storeUrl,
      error: null
    }
  },
  async mounted() {
    try {
      this.products = await this.$strapi.$products.find();
      this.fourmis = await this.$strapi.$fourmis.find();
    } catch (error) {
      this.error = error;
    }
  },
  components: {
    Products
  }
}
</script>
