<template>
<div>
  <div v-if="error">
    {{ error }}
  </div>
  <ProductsHeader v-if="!error" />
  <v-card class="product-card mx-auto mt-5" max-width="1300px" elevation="1" outlined>
    <v-container v-if="!error" class="product-container">
      <v-row v-if="isDataLoaded == false" no-gutters>
        <v-col 
          v-for="n in 9"
          :key="n"
          class="mt-12"
          cols="12"
          sm="4"
        >
          <v-skeleton-loader
            class="mx-auto products-skeleton-loader"
            max-width="344"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-for="product in productsByPage"
          :key="product.id"
          class="mt-12"
          cols="12"
          sm="4"
        >
          <v-card
            class="products-card mx-auto"
            max-width="344"
            raised
            hover
            rounded
          >
              <v-carousel
                :continuous="true"
                :cycle="false"
                :show-arrows="true"
                hide-delimiter-background
                hide-delimiters
                height="250"
              >
                <v-carousel-item
                  v-for="(image, index) in product.images"
                  :key="index"
                >
                  <nuxt-link :to="`/products/${product.slug}`">
                    <v-img
                      :src="`${getStrapiMedia(image.url)}`"
                      height="250px"
                    ></v-img>
                  </nuxt-link>
                </v-carousel-item>
              </v-carousel>
            
            <nuxt-link :to="`/products/${product.slug}`">
              <v-card-title>
                {{ product.nom }}
              </v-card-title>

              <v-card-subtitle class="products-card-subtitle">
                <span class="products-price"><strong>{{ product.prix }} €</strong></span> -
                <span :class="isInStock(product) ? 'text-white green lighten-2 p-1 products-availability' : 'text-white red lighten-2 p-1 products-availability'">
                  {{ isInStock(product) ? 'Disponible' : 'Indisponible' }}
                </span>
              </v-card-subtitle>

              <v-card-subtitle class="product-subtitle">
                {{ product.description_courte.slice(0, 89) }}<span v-if="product.description_courte.length > 89">...</span>
              </v-card-subtitle>
            </nuxt-link>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="products.length > 9" class="text-center mt-10">
        <v-pagination
          v-model="page"
          :length="Math.ceil(products.length / 9)"
          :total-visible="7"
          color="#7c9473"
        ></v-pagination>
      </div>
    </v-container>
  </v-card>
</div>
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'
import ProductsHeader from './ProductsHeader'

export default {
  components: { ProductsHeader },
  props: {
    products: Array,
    isFilteredProducts: Boolean,
    error: Error,
    isDataLoaded: Boolean,
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    productsByPage() {
      return this.products.filter(product => {
        return this.isFilteredProducts ? true : product.page == this.page;
      });
    },
  },
  methods: {
    getStrapiMedia,
    isInStock(product) {
      return product.stock > 0 ? true : false;
    },
  },
}
</script>

<style>
.crop {
  width: 100%;
  height: 100%;
}
</style>
