<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="1200"
        >
            <v-card>
                <v-card-title class="headline">
                    Votre panier
                </v-card-title>

                <v-card-text>
                    <v-list three-line>
                        <template v-for="(cartItem, index) in cartItems">
                            <v-card class="mb-5" outlined :key="index">
                            <v-list-item :key="index">
                                <v-list-item-avatar size="120">
                                    <v-img :src="`${getStrapiMedia(cartItem.imageUrl)}`"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <strong><v-list-item-title class="cart-list-item-title" v-html="cartItem.name"></v-list-item-title></strong>
                                    <v-list-item-subtitle>
                                        <span class="cart-list-item-price">{{ cartItem.price }} €</span>
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
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="closeDialog()"
                    >
                        Retourner sur la boutique
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
  computed: {
    cartItems() {
        return this.$store.state.cartItems;
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

            this.$store.commit('decrementCartItemQuantity', index);
        }
    }
  }
};
</script>