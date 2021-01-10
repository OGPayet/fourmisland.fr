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
        <TransactionCompletedDialog 
          :dialog="showTransactionCompletedDialog" 
          @onClose="showTransactionCompletedDialog = false" />
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
import transactionCompletedDialog from './../components/transactionCompletedDialog'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  components: {
    NavBar,
    Footer,
    transactionCompletedDialog,
  },
  data() {
    return {};
  },
  computed: {
    screenHeight() {
      return this.$vssHeight;
    },
    showTransactionCompletedDialog: {
      get() {
        return this.$store.state.isTransactionCompleted;
      },
      set(value) {
        this.$store.commit('isTransactionCompleted', value);
      } 
    }
  }
}
</script>
