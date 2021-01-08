<template>
  <v-app-bar
    absolute
    color="#7c9473"
    dark
    shrink-on-scroll
    prominent
    scroll-target="#scrolling-techniques-3"
    :src="require('~/assets/img/banner.jpeg')"
    fade-img-on-scroll
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>
    <v-container class="nav-bar-container">
      <v-row>
        <v-col cols="6">
          <v-app-bar-nav-icon class="ml-0">
            <nuxt-link to="/">
              <v-img
                :src="require('~/assets/img/logo.png')"
                height="80"
                width="80"
              ></v-img>
            </nuxt-link>
          </v-app-bar-nav-icon>
        </v-col>

        <v-col cols="5">
          <v-text-field
            v-model="searchInput"
            solo
            light
            label="Rechercher"
            prepend-inner-icon="mdi-magnify"
            background-color="#e8eae6"
            color="black"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn class="float-right" icon @click="cartDialog = true">
            <v-badge
              color="blue"
              :content="cartItemNumber"
            >
              <v-icon
                large
                color="#e8eae6"
              >
                 mdi-cart
              </v-icon>
            </v-badge>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <Cart :dialog="cartDialog" @onClose="cartDialog = false" />

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab>Boutique</v-tab>
        <v-tab>FAQ</v-tab>
        <v-tab>À propos</v-tab>
        <v-tab>Contact</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import Cart from "./Cart";

export default {
  components: {
    Cart,
  },
  data() {
    return {
      searchValue: null,
      isCartDialogOpen: false,
    }
  },
  computed: {
    cartDialog: {
      get() {
        return this.isCartDialogOpen;
      },
      set(value) {
        this.isCartDialogOpen = value;
      }
    },
    cartItemNumber() {
      return this.$store.state.cartItemNumber;
    },
    searchInput: {
      get() {
        return this.searchValue;
      },
      set(value) {
        this.searchValue = value;
        let filteredProducts = this.$store.state.products.filter(element => {
          let name = element.nom.toLowerCase().split(' ');
          let searchValue = this.searchValue.toLowerCase().split(' ');
          return name.some(r => searchValue.includes(r));
        });
        this.$store.commit('setFilteredProducts', filteredProducts);
      }
    },
  },
};
</script>
