<template>
<div v-if="this.product !== null">
  <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
    <div class="mb-20 px-4 py-5 sm:px-6">
      <div class="flex">
        <div class="flex-initial mt-6 mr-5 w-1/12">
          <img 
            v-for="image in product.images" 
            :key="image.id" 
            :class="idImageActive == image.id ? 'mb-5 cursor-pointer outline-black' : 'mb-5 cursor-pointer'" 
            :src="`${getStrapiMedia(image.formats.thumbnail.url)}`"
            @click="idImageActive = image.id; selectedImage = image">
        </div>
        <div class="flex-initial mt-6 w-7/12 mr-12">
          <img 
            class="cursor-pointer"
            :src="`${getStrapiMedia(selectedImage.url)}`" 
            @click="media = product.images; showLightBox = true">
        </div>
        <div class="flex-initial mt-6">
          <h3 class="text-4xl leading-6 font-medium text-gray-900">
            {{ this.product.nom }}
          </h3>
          <p class="mt-5 text-lg text-gray-700">
            {{ this.product.description_courte }}
          </p>
          <p class="mt-2 text-lg text-gray-700">
            Difficulté d'élevage : 
            <span :class="product.difficulte == 'Facile' || product.difficulte == 'Assez facile' ? 'text-green' : ''">
              {{ this.product.difficulte }}
            </span>
          </p>
          <h4 class="mt-4 font-semibold text-3xl leading-tight truncate text-gray-700">
            {{ product.prix }} €
          </h4>
          <p v-if="product.stock > 0" class="mt-2">
            Stock : {{ this.product.stock }}
          </p>
          <p v-else class="mt-2 text-2xl text-red-700"><strong>
            Indisponible
          </strong></p>
          <button v-if="product.stock > 0" class="snipcart-add-item inline-block mt-4 bg-light-green border border-light-green d hover:shadow-lg text-lg text-gray-800 font-bold py-4 px-8 rounded shadow" :data-item-id="product.id" :data-item-price="product.prix"
            :data-item-url="`${this.$route.fullPath}`" :data-item-description="product.description" :data-item-image="`${getStrapiMedia(product.images[0].formats.thumbnail.url)}`" :data-item-name="product.nom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" class="inline-block mr-2">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Ajouter au panier
          </button>
        </div>
      </div>
      <client-only>
        <light-box v-if="showLightBox" :media="mediaList" @onClosed="showLightBox = false" />
      </client-only>
    </div>
    <div class="mb-10 text-center text-3xl">
      <h3>Tout savoir sur la fourmis {{ this.product.nom }}</h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div v-for="(value, name, index) in productInfos" :key="index">
          <div v-for="productInfosTitle in productInfosTitleList" :key="productInfosTitle.title" v-if="index == productInfosTitle.index" :class="index % 2 == 0 ? 'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6' : 'bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'">
            <h4 class="text-xl"><strong>{{ productInfosTitle.title }}</strong></h4>
          </div>
          <div :class="index % 2 == 0 ? 'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6' : 'bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'">
            <dt class="text-lg font-medium text-gray-700">
              {{ name }}
            </dt>
            <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
              {{ value }}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</div>

<div v-else>
  {{ error }}
</div>
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'

export default {
  data() {
    return {
      product: null,
      filteredKeys: ['id', 'slug', 'prix', 'stock', 'difficulte', 'description_courte', 'published_at', 'created_at', 'updated_at', 'images'],
      error: null,
      mediaList: [],
      showLightBox: false,
      idImageActive: null,
      selectedImage: null,
      productInfosTitleList: [
        { title: 'CLASSIFICATION ET SIGNIFICATION', index: 0 },
        { title: 'MORPHOLOGIE ET IDENTIFICATION', index: 11 },
        { title: 'BIOLOGIE', index: 15 },
        { title: 'RÉPARTITION', index: 24 },
        { title: 'ÉLEVAGE', index: 25 },
      ]
    }
  },
  async mounted() {
    try {
      this.product = await this.$strapi.$fourmis.findOne(this.$route.params.id);
      this.idImageActive = this.product.images[0].id;
      this.selectedImage = this.product.images[0];
    } catch (error) {
      this.error = error; 
    }
  },
  computed: {
    media: {
      get() {
        return this.mediaList
      },
      set(images) {
        this.mediaList = [];

        if (this.selectedImage != null) {
          let data = {
            thumb: getStrapiMedia(this.selectedImage.formats.thumbnail.url),
            src: getStrapiMedia(this.selectedImage.url)
          };

          this.mediaList.push(data);
        }

        images.forEach(image => {
          if (image.id != this.selectedImage.id) {
            let data = {
              thumb: getStrapiMedia(image.formats.thumbnail.url),
              src: getStrapiMedia(image.url)
            };

            this.mediaList.push(data);
          }
        });
      }
    },
    productInfos() {
      let productInfos = Object.keys(this.product).filter(key => !this.filteredKeys.includes(key))
        .reduce((obj, key) => {
          let new_key = key.charAt(0).toUpperCase() + key.slice(1).split('_').join(' ');
          obj[new_key] = this.product[key];
        return obj;
      }, {});

      return productInfos;
    },
  },
  methods: {
    getStrapiMedia,
  },
}
</script>
