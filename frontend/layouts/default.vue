<template>
<v-app id="app">
  <v-card class="overflow-hidden">
    <NavBar />
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      :max-height="screenHeight"
      width="100%"
    >
      <v-container style="height: 250px;"></v-container>
      <v-main>
        <Nuxt />
      </v-main>

      <Footer />

    </v-sheet>
  </v-card>
</v-app>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import NavBar from './../components/Navbar'
import Footer from './../components/Footer'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  components: {
    NavBar,
    Footer,
  },
  computed: {
    screenHeight() {
      return this.$vssHeight;
    }
  }
}
</script>
