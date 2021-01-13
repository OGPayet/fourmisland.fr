<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
            eager
            @click:outside="closeDialog()"
        >
            <v-card>
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
                    <v-toolbar-title class="cart-title">
                        Votre panier<span v-if="isCartEmpty">&nbsp;est vide</span>
                    </v-toolbar-title>
                </v-app-bar>

                <v-card-text>
                    <v-list three-line>
                        <template v-for="(cartItem, index) in cartItems">
                            <v-card v-if="page == cartItem.page" class="mt-7 mb-5 ml-10 mr-10" outlined :key="index">
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

                    <div v-if="cartItems.length > 4" class="text-center">
                        <v-pagination
                            v-model="page"
                            :length="Math.ceil(cartItems.length / 4)"
                            :total-visible="7"
                        ></v-pagination>
                    </div>

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
        page: 1,
    }
  },
  watch: {
    dialog(visible) {
      if (!(this.$store.state.cartItems.length > 0) && this.$store.state.isPaypalButtonLoaded) {
        this.$store.commit('isPaypalButtonLoaded', false);
      }

      if (visible && !this.isCartEmpty && !this.$store.state.isPaypalButtonLoaded) {
        this.$refs.paypal.addEventListener('load', this.loadPaypalButton());
      }
    }
  },
  computed: {
    cartItems() {
        let page = 1;
        let cartItemsList = this.$store.state.cartItems;
        cartItemsList.forEach((item, index) => {
            index != 0 ? Number.isInteger(index/4) ? page++ : '' : '';
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
                            description: 'Commande FourmisLand.com',
                            amount: {
                                currency_code: 'EUR',
                                value: this.cartTotalPrice
                            }
                        }
                    ]
                });
            },
            onApprove: async (data, actions) => {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(async (details) => {
                    // This function shows a transaction success message to your buyer.
                    this.$store.state.cartItems.forEach(async product => {
                        await this.$strapi.update('fourmis', product.id, { stock: product.actualStock - product.quantity }); 
                    });

                    let fourmisIds = [];
                    let quantite = [];
                    this.$store.state.cartItems.forEach(fourmis => {
                        let quantity = {
                            nom: fourmis.name,
                            quantite: fourmis.quantity
                        };
                        fourmisIds.push(fourmis.id);
                        quantite.push(quantity);
                    });
                    
                    try {
                        await this.$strapi.$commandes.create({ 
                            utilisateur: this.$strapi.user.id,
                            fourmis: fourmisIds,
                            quantite: JSON.stringify(quantite),
                            prixTotal: this.cartTotalPrice
                        });
                    } catch (error) {
                        console.info(error.message);
                    }

                    this.$router.push('/');
                    this.$store.dispatch('transactionCompleted', details.payer);

                    console.info(details);
                    console.info(this.$store.state.payer);
                });
            }
        }).render(this.$refs.paypal);

        this.$store.commit('isPaypalButtonLoaded', true);
    },
  },
};
</script>