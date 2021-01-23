<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="footer lighten-1 white--text text-center"
    >
      <v-card-text class="white--text pt-0 mt-7">
        <nuxt-link to="/cgv">CGV</nuxt-link>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>FourmisLand.com</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  components: {},
}
</script>
