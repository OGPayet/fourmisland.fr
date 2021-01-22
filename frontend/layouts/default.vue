<template>
<v-app id="app">
  <v-card class="overflow-hidden">
    <NavBar 
      @displaySnackbar="launchSnackbar"
    />
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

        <Snackbar :snackbar="showSnackbar" :textSnackbar="textSnackbar" @displaySnackbar="displaySnackbar" />
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
import Snackbar from '~/components/Snackbar'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  components: {
    NavBar,
    Footer,
    transactionCompletedDialog,
    Snackbar
  },
  data() {
    return {
      snackbar: false,
      text: '',
    };
  },
  computed: {
    showSnackbar: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.snackbar = value;
      }
    },
    textSnackbar: {
      get() {
        return this.text;
      },
      set(value) {
        this.text = value;
      }
    },
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
  },
  methods: {
    launchSnackbar(value) {
      this.textSnackbar = value;
      this.showSnackbar = true;
    },
    displaySnackbar(value) {
      this.showSnackbar = value;
    },
  },
}
</script>
