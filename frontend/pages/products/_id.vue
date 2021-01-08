<template>
  <div v-if="this.product !== null">
    <v-container class="product-container mt-5 mb-14">
      <v-row class="mb-15" no-gutters>
        <v-col cols="1">
          <v-img
            v-for="image in product.images"
            :key="image.id"
            :class="
              idImageActive == image.id
                ? 'mb-5 cursor-pointer outline-black'
                : 'mb-5 cursor-pointer'
            "
            :src="`${getStrapiMedia(image.formats.thumbnail.url)}`"
            width="85%"
            height="50px"
            @click="
              idImageActive = image.id;
              selectedImage = image;
            "
          ></v-img>
        </v-col>

        <v-col cols="6">
          <v-img
            class="cursor-pointer"
            :src="`${getStrapiMedia(selectedImage.url)}`"
            width="80%"
            @click="
              media = product.images;
              showLightBox = true;
            "
          ></v-img>
        </v-col>

        <v-col>
          <h3 class="product-page-title">
            {{ this.product.nom }}
          </h3>
          <h4 class="product-page-price"> 
            {{ product.prix.toPrecision(4) }} € -
            <span v-if="product.stock > 0" class="product-page-stock">
              Stock : {{ this.product.stock }}
            </span>
            <span v-else class="product-page-indisponible">
              <strong> Indisponible </strong>
            </span>
          </h4>
          <v-divider></v-divider>
          <p class="mt-5 text-lg text-gray-700">
            {{ this.product.description_courte }}
          </p>
          <p class="mt-2 text-lg text-gray-700">
            Difficulté d'élevage :
            <span
              :class="
                product.difficulte == 'Facile' ||
                product.difficulte == 'Assez facile'
                  ? 'text-green'
                  : 'text-red'
              "
            >
              <strong>{{ this.product.difficulte }}</strong>
            </span>
          </p>
          <vue-numeric-input
            class="quantity-input mr-2"
            v-model="itemQuantity"
            :min="0"
            :max="10"
            size="60px"
            controls-type="updown">
          </vue-numeric-input>
          <button
            v-if="product.stock > 0 && useSnipcart == true"
            class="snipcart-add-item inline-block mt-4 bg-light-green border border-light-green d hover:shadow-lg text-lg text-gray-800 font-bold py-4 px-8 rounded shadow"
            :data-item-id="product.id"
            :data-item-price="product.prix"
            :data-item-url="`${this.$route.fullPath}`"
            :data-item-description="product.description"
            :data-item-image="`${getStrapiMedia(
              product.images[0].formats.thumbnail.url
            )}`"
            :data-item-name="product.nom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="22"
              class="inline-block mr-2"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            Ajouter au panier
          </button>
          <v-btn
            color="#7c9473"
            class="add-in-cart-button white--text"
            x-large
            @click="addInCart()"
          >
            <v-icon
              right
              dark
              class="mr-2"
            >
              mdi-cart
            </v-icon>
            Ajouter au panier
          </v-btn>
        </v-col>
        <client-only>
          <light-box
            v-if="showLightBox"
            :media="mediaList"
            @onClosed="showLightBox = false"
          />
        </client-only>
      </v-row>
      <v-row>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#7c9473"
          grow
        >
          <v-tab
            v-for="(productInfosTitle, index) in productInfosTitleList"
            :key="index"
          >
            {{ productInfosTitle.title }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(productInfosTitle, index) in productInfosTitleList"
            :key="index"
          >
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(value, name, index) in productInfos"
                    :key="index"
                    v-if="index >= productInfosTitle.indexStart && index <= productInfosTitle.indexEnd"
                  >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-container>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  data() {
    return {
      product: null,
      filteredKeys: [
        "id",
        "slug",
        "prix",
        "stock",
        "difficulte",
        "description_courte",
        "published_at",
        "created_at",
        "updated_at",
        "images",
      ],
      error: null,
      tab: null,
      mediaList: [],
      showLightBox: false,
      idImageActive: null,
      selectedImage: null,
      productInfosTitleList: [
        { title: "CLASSIFICATION ET SIGNIFICATION", indexStart: 0, indexEnd: 9 },
        { title: "MORPHOLOGIE ET IDENTIFICATION", indexStart: 11, indexEnd: 13},
        { title: "BIOLOGIE", indexStart: 14, indexEnd: 23 },
        { title: "ÉLEVAGE", indexStart: 24, indexEnd: 35},
      ],
      useSnipcart: false,
      quantity: 1,
    };
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
    itemQuantity: {
      get() {
        return this.quantity;
      },
      set(value) {
        this.quantity = value;
      }
    },
    media: {
      get() {
        return this.mediaList;
      },
      set(images) {
        this.mediaList = [];

        if (this.selectedImage != null) {
          let data = {
            thumb: getStrapiMedia(this.selectedImage.formats.thumbnail.url),
            src: getStrapiMedia(this.selectedImage.url),
          };

          this.mediaList.push(data);
        }

        images.forEach((image) => {
          if (image.id != this.selectedImage.id) {
            let data = {
              thumb: getStrapiMedia(image.formats.thumbnail.url),
              src: getStrapiMedia(image.url),
            };

            this.mediaList.push(data);
          }
        });
      },
    },
    productInfos() {
      let productInfos = Object.keys(this.product)
        .filter((key) => !this.filteredKeys.includes(key))
        .reduce((obj, key) => {
          let new_key = key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

          if (this.product[key] != null) {
            obj[new_key] = this.product[key];
          }

          return obj;
        }, {});

      return productInfos;
    },
  },
  methods: {
    getStrapiMedia,
    addInCart() {
      let filteredCart = this.$store.state.cartItems.filter(element => {
        return element.slug == this.product.slug;
      });
      let index = this.$store.state.cartItems.indexOf(filteredCart[0]);

      console.info(filteredCart.length);

      console.info(filteredCart);

      console.info(this.itemQuantity);

      let item = {
        slug: this.product.slug,
        quantity: this.itemQuantity
      };

      if (filteredCart.length > 0) {
        this.$store.commit('addCartItemNumber', this.itemQuantity);
        this.$store.commit('incrementCartItemQuantity', index, this.itemQuantity)
      } else {
        this.$store.commit('addCartItemNumber', this.itemQuantity);
        this.$store.commit('addCartItem', item);
      }

      console.info(this.$store.state.cartItems);
    }
  },
};
</script>
