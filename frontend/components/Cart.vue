<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
            eager
            @click:outside="closeDialog()"
        >
            <v-card v-if="!isCartEmpty && showPaymentSteps">
                <v-app-bar
                    color="#6A76AB"
                    dark
                    :src="require('~/assets/img/banner.jpeg')"
                >
                    <template v-slot:img="{ props }">
                        <v-img
                            v-bind="props"
                            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                        ></v-img>
                    </template>
                    <v-toolbar-title :class="breakpointName != 'xs' ? 'cart-title' : 'cart-title-mobile'">
                        Payement
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text class="cart-card-text-payment-steps">
                    <PaymentSteps @transactionCompleted="showPaymentSteps = false" />
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-app-bar
                    color="#6A76AB"
                    dark
                    :src="require('~/assets/img/banner.jpeg')"
                >
                    <template v-slot:img="{ props }">
                        <v-img
                            v-bind="props"
                            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                        ></v-img>
                    </template>
                    <v-toolbar-title :class="breakpointName != 'xs' ? 'cart-title' : 'cart-title-mobile'">
                        Votre panier<span v-if="isCartEmpty">&nbsp;est vide</span>
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text>
                    <v-list three-line>
                        <template v-for="(cartItem, index) in cartItems">
                            <v-card 
                                v-if="page == cartItem.page" 
                                :class="breakpointName != 'xs' ? 'mt-7 mb-5 ml-10 mr-10' : 'mt-7 mb-2 ml-1 mr-1'" 
                                outlined 
                                :key="index"
                            >
                                <v-list-item :key="index">
                                    <v-list-item-avatar :size="breakpointName != 'xs' ? 80 : 60">
                                        <v-img :src="`${getStrapiMedia(cartItem.imageUrl)}`"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <strong>
                                            <v-list-item-title 
                                                :class="breakpointName != 'xs' ? 'cart-list-item-title' : 'cart-list-item-title-mobile'" 
                                                v-html="cartItem.name"
                                            >
                                            </v-list-item-title>
                                        </strong>
                                        <v-list-item-subtitle>
                                            <span :class="breakpointName != 'xs' ? 'cart-list-item-price' : 'cart-list-item-price-mobile'">
                                                {{ cartItem.price * cartItem.quantity }} €
                                            </span>
                                            <br v-if="breakpointName == 'xs'" />
                                            <span :class="breakpointName != 'xs' ? 'cart-list-item-quantity' : 'cart-list-item-quantity-mobile'">
                                                quantité : {{ cartItem.quantity }}
                                            </span>
                                            <v-btn
                                                :class="breakpointName != 'xs' ? 'ml-2 mb-2' : ''"
                                                icon
                                                color="red lighten-2"
                                                @click="decrementCartItemQuantity(cartItem)"
                                            >
                                                <v-icon :size="breakpointName != 'xs' ? '28px' : '26px'">
                                                    mdi-trash-can
                                                </v-icon>
                                            </v-btn>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>

                            <v-divider v-if="cartItems.length > 100 && index != (cartItems.length - 1)" :key="index"></v-divider>
                        </template>
                    </v-list>

                    <div v-if="cartItems.length > showPaginationNumber" class="text-center">
                        <v-pagination
                            v-model="page"
                            :length="Math.ceil(cartItems.length / showPaginationNumber)"
                            :total-visible="7"
                        ></v-pagination>
                    </div>

                    <h4 
                        v-if="!isCartEmpty" 
                        :class="breakpointName != 'xs' ? 'cart-total-price mt-5 ml-10 mr-10' : 'cart-total-price-mobile mt-4 ml-1'"
                    >
                        <strong>
                            Total : {{ cartTotalPrice }} €
                        </strong>
                    </h4>
                </v-card-text>

                <div v-if="breakpointName == 'xs'">
                    <v-btn
                        v-if="!isCartEmpty"
                        class="cart-return-button-mobile mb-7"
                        block
                        color="primary"
                        height="50px"
                        @click="showPaymentSteps = true"
                    >
                        <v-icon class="mr-2">
                            mdi-credit-card-outline
                        </v-icon>
                        Passer au payement
                    </v-btn>
                    
                    <v-btn
                        class="cart-return-button"
                        block
                        color="#7c9473"
                        @click="closeDialog()"
                    >
                        <v-icon class="mr-2">
                            mdi-keyboard-return
                        </v-icon>
                        Retourner à la boutique
                    </v-btn>

                    <br />
                </div>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>

                    <v-btn
                        v-if="!isCartEmpty"
                        :class="breakpointName != 'xs' ? 'cart-return-button' : 'cart-return-button-mobile'"
                        color="primary"
                        @click="showPaymentSteps = true"
                    >
                        <v-icon class="mr-2">
                            mdi-credit-card-outline
                        </v-icon>
                        Passer au payement
                    </v-btn>
                    
                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        @click="closeDialog()"
                    >
                        <v-icon class="mr-2">
                            mdi-keyboard-return
                        </v-icon>
                        Retourner à la boutique
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias"
import PaymentSteps from './PaymentSteps'

export default {
  components: { PaymentSteps },
  props: {
    dialog: Boolean,
  },
  data() {
    return {
        page: 1,
        showPaymentSteps: false,
    }
  },
  computed: {
    cartItems() {
        let page = 1;
        let cartItemsList = this.$store.state.cartItems;
        cartItemsList.forEach((item, index) => {
            index != 0 ? Number.isInteger(index/this.showPaginationNumber) ? page++ : '' : '';
            cartItemsList[index].page = page;
        });
        
        return cartItemsList;
    },
    isCartEmpty() {
        return this.$store.state.cartItems.length > 0 ? false : true;
    },
    cartTotalPrice() {
        let total = 0;
        this.$store.state.cartItems.forEach(product => {
            total += (product.price * product.quantity);
        });

        return total;
    },
    breakpointName() {
      return this.$vuetify.breakpoint.name;
    },
    showPaginationNumber() {
        return this.breakpointName != 'xs' ? 4 : 2;
    }
  },
  methods: {
    getStrapiMedia,
    closeDialog() {
        this.$emit('onClose');
        this.showPaymentSteps = false;
    },
    decrementCartItemQuantity(cartItem) {
        let filteredCart = this.$store.state.cartItems.filter(item => {
            return item.name == cartItem.name
        });

        if (filteredCart.length > 0) {
            let index = this.$store.state.cartItems.indexOf(filteredCart[0]);

            if (filteredCart[0].quantity == 1 && Number.isInteger(index / this.showPaginationNumber)) {
                this.page--;
            }

            this.$store.dispatch('decrementProductInCartQuantity', index);
        }
    },
  },
};
</script>