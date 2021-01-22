<template>
    <div id="my-commands">
        <h2 class="command-title mb-7">Commande du {{ $moment(command.created_at).format('LL') }} :</h2>
        <v-list three-line>
            <template v-for="(product, index) in commandProducts">
                <v-card v-if="page == product.page" class="mb-5 ml-10 mr-10" outlined :key="index">
                    <v-list-item :key="index">
                        <v-list-item-avatar size="80">
                            <v-img :src="`${getStrapiMedia(product.imageUrl)}`"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <strong><v-list-item-title class="cart-list-item-title" v-html="product.name"></v-list-item-title></strong>
                            <v-list-item-subtitle>
                                <span class="cart-list-item-price">{{ product.price * product.quantity }} €</span>
                                <span class="cart-list-item-quantity">quantité : {{ product.quantity }}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>

                <v-divider v-if="commandProducts.length > 100 && index != (commandProducts.length - 1)" :key="index"></v-divider>
            </template>
        </v-list>

        <div v-if="commandProducts.length > 4" class="text-center">
            <v-pagination
                v-model="page"
                :length="Math.ceil(commandProducts.length / 4)"
                :total-visible="7"
            ></v-pagination>
        </div>

        <v-btn class="mt-4" color="success" large @click="$emit('displayMyCommands')">
            Retour aux commandes
        </v-btn>
    </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias"

export default {
  props: {
    command: Object,
  },
  data() {
    return {
        page: 1,
    };
  },
  computed: {
    commandProducts() {
        let page = 1;
        let products = [];
        this.command.fourmis.forEach((fourmis, index) => {
            let quantity;
            JSON.parse(this.command.quantite).forEach(element => {
                element.nom == fourmis.nom ? quantity = element.quantite : '';
            });

            index != 0 ? Number.isInteger(index/4) ? page++ : '' : '';

            let product = {
                id: fourmis.id,
                slug: fourmis.slug,
                name: fourmis.nom,
                price: fourmis.prix,
                quantity,
                actualStock: fourmis.stock,
                imageUrl: fourmis.images[0].url,
                page
            };

            products.push(product);
        });

        return products;
    },
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
