<template>
  <v-app-bar
    absolute
    color="#7c9473"
    dark
    shrink-on-scroll
    prominent
    scroll-target="#scrolling-techniques-3"
  >
    <v-app-bar-nav-icon>
      <nuxt-link to="/">
        <v-img
          :src="require('~/assets/img/logo.png')"
          height="110"
          width="110"
        ></v-img>
      </nuxt-link>
    </v-app-bar-nav-icon>

    <v-app-bar-title>Title</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn class="snipcart-checkout">
      <Cart />
      <span class="snipcart-total-price ml-3"></span>
    </v-btn>

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
import Cart from "./icons/cart.vue";

export default {
  components: {
    Cart,
  },
};
</script>

<style>
.emoji {
  font-size: 30px;
}
</style>
