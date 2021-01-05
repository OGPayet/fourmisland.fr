<template>
<v-container class="product-container mt-5 mb-14">
  <div v-if="error">
    {{ error }}
  </div>
  <v-row v-else no-gutters>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      sm="4"
    >
      <v-card
        class="mx-auto"
        max-width="344"
        raised
        hover
        ripple
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

          <v-card-subtitle>
            {{ product.prix }} € - 
            <span :class="isInStock(product) ? 'text-green' : 'text-red'">
              {{ isInStock(product) ? 'Disponible' : 'Indisponible' }}
            </span>
          </v-card-subtitle>

          <v-card-subtitle class="product-subtitle">
            {{ product.description_courte.slice(0, 90) }}<span v-if="product.description_courte.length > 90">...</span>
          </v-card-subtitle>
        </nuxt-link>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'

export default {
  props: {
    products: Array,
    error: Object,
    storeUrl: String
  },
  directives: {
    lazy: {
      inserted: (el) => {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              observer.unobserve(el);
            }
          });
        });
        observer.observe(el);
      },
    },
  },
  methods: {
    getStrapiMedia,
    isInStock(product) {
      return product.stock > 0 ? true : false;
    },
  }
}
</script>

<style>
.crop {
  width: 100%;
  height: 100%;
}
</style>
