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
              :dot="cartItemNumber > 0 ? false : true"
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
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="float-right" icon v-bind="attrs" v-on="on">
                <v-icon
                  large
                  color="#e8eae6"
                >
                    mdi-account
                </v-icon>
              </v-btn>
            </template>
            <v-list class="mt-2">
              <v-list-item v-if="!isUserLogged" link @click="loginDialog = true">
                <v-list-item-title>
                  <v-icon class="mr-1">
                    mdi-login-variant
                  </v-icon>
                  Se connecter
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="!isUserLogged" link @click="registerDialog = true">
                <v-list-item-title>
                  <v-icon class="mr-1">
                    mdi-account-plus
                  </v-icon>
                  Créer un compte
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="isUserLogged" link @click="accountDialog = true">
                <v-list-item-title>
                  <v-icon class="mr-1">
                    mdi-account-circle
                  </v-icon>
                  Mon compte
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="isUserLogged" link @click="logout()">
                <v-list-item-title>
                  <v-icon class="mr-1">
                    mdi-logout-variant
                  </v-icon>
                  Se déconnecter
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>

    <LoginDialog 
      v-if="!isUserLogged" 
      :dialog="loginDialog" 
      :isUserLogged="isUserLogged" 
      @onClose="loginDialog = false" 
      @successLogin="emitTextSnackbar"
    />
    <RegisterDialog 
      v-if="!isUserLogged" 
      :dialog="registerDialog" 
      :isUserLogged="isUserLogged" 
      @onClose="registerDialog = false"
      @successRegister="emitTextSnackbar"
    />
    <AccountDialog 
      v-if="isUserLogged" 
      :dialog="accountDialog" 
      :isUserLogged="isUserLogged" 
      @onClose="accountDialog = false" 
    />
    <Cart 
      :dialog="cartDialog" 
      @onClose="cartDialog = false" 
    />

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
import Cart from "./Cart"
import LoginDialog from "./LoginDialog"
import RegisterDialog from "./RegisterDialog"
import AccountDialog from "./AccountDialog"

export default {
  components: {
    Cart,
    LoginDialog,
    RegisterDialog,
    AccountDialog,
  },
  data() {
    return {
      searchValue: null,
      isCartDialogOpen: false,
      isLoginDialogOpen: false,
      isRegisterDialogOpen: false,
      isAccountDialogOpen: false,
      logoutTextSnackbar: 'Vous êtes maintenant déconnecté.',
    }
  },
  watch: {
    isTransactionCompleted: function() {
      this.isTransactionCompleted ? this.cartDialog = false : '';
    },
  },
  computed: {
    isUserLogged() {
      return this.$store.state.isUserLogged;
    },
    isTransactionCompleted() {
      return this.$store.state.isTransactionCompleted;
    },
    loginDialog: {
      get() {
        return this.isLoginDialogOpen;
      },
      set(value) {
        this.isLoginDialogOpen = value;
      }
    },
    registerDialog: {
      get() {
        return this.isRegisterDialogOpen;
      },
      set(value) {
        this.isRegisterDialogOpen = value;
      }
    },
    accountDialog: {
      get() {
        return this.isAccountDialogOpen;
      },
      set(value) {
        this.isAccountDialogOpen = value;
      }
    },
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
  methods: {
    async logout() {
      try {
        await this.$strapi.logout();
        this.$store.dispatch('logout');
        this.emitTextSnackbar(this.logoutTextSnackbar);
      } catch(error) {
        console.info(error);
      }
    },
    emitTextSnackbar(textSnackbar) {
      this.$emit('displaySnackbar', textSnackbar);
    }
  },
};
</script>
