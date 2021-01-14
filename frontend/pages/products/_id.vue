<template>
  <div v-if="this.product !== null">
    <v-card class="product-card mx-auto mt-5" max-width="1300px" elevation="1" outlined>
      <v-container class="product-container mt-5">
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
              {{ product.prix.toPrecision(4) }} €
              <span v-if="product.stock > 0" class="product-page-stock">
                - Stock : {{ this.product.stock }}
              </span>
              <span v-else class="product-page-indisponible">
                -<strong> Indisponible </strong>
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
                  product.difficulte == 'Assez facile' ||
                  product.difficulte == 'Très facile'
                    ? 'text-green'
                    : 'text-red'
                "
              >
                <strong>{{ this.product.difficulte }}</strong>
              </span>
            </p>
            <div v-if="this.product.stock > 0">
              <vue-numeric-input
                class="quantity-input mr-2"
                v-model="itemQuantity"
                :min="1"
                :max="product.stock"
                size="60px"
                controls-type="updown">
              </vue-numeric-input>
              <v-btn
                color="#7c9473"
                class="add-in-cart-button white--text"
                x-large
                :disabled="isMaxQuantityReached"
                @click="!isNaN(itemQuantity) ? addInCart() : ''"
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
            </div>
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
                  <tbody 
                    v-for="(value, name, index) in productInfos"
                    :key="index"
                  >
                    <tr 
                      v-if="index >= productInfosTitle.indexStart && index <= productInfosTitle.indexEnd" 
                      :class="index == productInfosTitle.indexEnd ? 'product-info-tr-last' : 'product-info-tr'"
                    >
                      <td class="product-infos-name">{{ name }} :</td>
                      <td class="product-infos-value">{{ value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs-items>
        </v-row>
      </v-container>
    </v-card>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias"

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
        this.quantity = Number(value);
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
    isMaxQuantityReached() {
        let res = false;

        let filteredCart = this.$store.state.cartItems.filter(element => {
            return element.slug == this.product.slug;
        });

        if (filteredCart.length > 0) {
            res = filteredCart[0].quantity == this.product.stock;
        }

        return res;
    },
  },
  methods: {
    getStrapiMedia,
    addInCart() {
      let filteredCart = this.$store.state.cartItems.filter(element => {
        return element.slug == this.product.slug;
      });

      let item = {
        id: this.product.id,
        slug: this.product.slug,
        name: this.product.nom,
        price: this.product.prix,
        quantity: this.itemQuantity,
        actualStock: this.product.stock,
        imageUrl: this.product.images[0].url
      };

      if (filteredCart.length > 0) {
        let index = this.$store.state.cartItems.indexOf(filteredCart[0]);

        for (let i = 0; i < this.itemQuantity; i++) {
          this.$store.dispatch('incrementProductInCartQuantity', index);
        }
      } else {
        for (let i = 0; i < this.itemQuantity; i++) {
          this.$store.commit('incrementTotalNumberProductsInCart');
        }
        this.$store.commit('addProductInCart', item);
      }
    }
  },
};
</script>
