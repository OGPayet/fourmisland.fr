<template>
<v-app id="app">
  <v-card class="overflow-hidden">
    <NavBar 
      :scrollY="scrollY"
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

        <v-snackbar
          v-model="snackbar"
          centered
          timeout="2000"
          color="deep-purple accent-4"
          elevation="24"
        >
          {{ textSnackbar }}

          <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Fermer
            </v-btn>
          </template>
        </v-snackbar>
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
    return {
      snackbar: false,
      text: '',
    };
  },
  computed: {
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
      this.snackbar = true;
    },
  },
}
</script>
