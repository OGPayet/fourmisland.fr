<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
            eager
            @click:outside="closeDialog()"
        >
            <v-card>
                <v-toolbar color="#7c9473">
                    <v-toolbar-title class="cart-title ml-10">
                        Votre panier<span v-if="isCartEmpty">&nbsp;est vide</span>
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-list three-line>
                        <template v-for="(cartItem, index) in cartItems">
                            <v-card class="mt-7 mb-5 ml-10 mr-10" outlined :key="index">
                                <v-list-item :key="index">
                                    <v-list-item-avatar size="80">
                                        <v-img :src="`${getStrapiMedia(cartItem.imageUrl)}`"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <strong><v-list-item-title class="cart-list-item-title" v-html="cartItem.name"></v-list-item-title></strong>
                                        <v-list-item-subtitle>
                                            <span class="cart-list-item-price">{{ cartItem.price * cartItem.quantity }} €</span>
                                            <span class="cart-list-item-quantity">quantité : {{ cartItem.quantity }}</span>
                                            <v-btn
                                                class="ml-2 mb-2"
                                                icon
                                                color="red lighten-2"
                                                @click="decrementCartItemQuantity(cartItem)"
                                            >
                                                <v-icon size="28px">mdi-trash-can</v-icon>
                                            </v-btn>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>

                            <v-divider v-if="cartItems.length > 100 && index != (cartItems.length - 1)" :key="index"></v-divider>
                        </template>
                    </v-list>
                    <h4 v-if="!isCartEmpty" class="cart-total-price mt-5 ml-10 mr-10"><strong>
                        Total : {{ cartTotalPrice }} €
                    </strong></h4>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <div v-if="!isCartEmpty" id="paypal-buttons" class="mr-16" ref="paypal"></div>

                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        large
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

export default {
  components: {},
  props: {
    dialog: Boolean,
  },
  data() {
    return {
    }
  },
  watch: {
    dialog(visible) {
      if (!(this.$store.state.cartItems.length > 0) && this.$store.state.isPaypalButtonLoaded) {
        this.$store.commit('isPaypalButtonLoaded', false);
      }

      if (visible && !this.isCartEmpty && !this.$store.state.isPaypalButtonLoaded) {
        this.$refs.paypal.addEventListener('load', this.loadPaypalButton());
        this.$store.commit('isPaypalButtonLoaded', true);
      }
    }
  },
  computed: {
    cartItems() {
        return this.$store.state.cartItems;
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
  },
  methods: {
    getStrapiMedia,
    closeDialog() {
        this.$emit('onClose');
    },
    decrementCartItemQuantity(cartItem) {
        let filteredCart = this.$store.state.cartItems.filter(item => {
            return item.nom == cartItem.nom
        });

        if (filteredCart.length > 0) {
            let index = this.$store.state.cartItems.indexOf(filteredCart[0]);

            this.$store.dispatch('decrementProductInCartQuantity', index);
        }
    },
    loadPaypalButton: function() {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: 'test',
                            amount: {
                                currency_code: 'EUR',
                                value: this.cartTotalPrice
                            }
                        }
                    ]
                });
            }
        }).render(this.$refs.paypal);
    },
  }
};
</script>