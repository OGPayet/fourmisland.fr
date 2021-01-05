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
        <Buttons />
        <Nuxt />
      </v-main>

      <Footer />

      <div hidden id="snipcart" data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"></div>
    </v-sheet>
  </v-card>
</v-app>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
import NavBar from './../components/Navbar'
import Footer from './../components/Footer'
import Buttons from './../components/Buttons'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  components: {
    NavBar,
    Footer,
    Buttons
  },
  computed: {
    screenHeight() {
      return this.$vssHeight;
    }
  }
}
</script>
