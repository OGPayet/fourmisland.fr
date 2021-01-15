<template>
    <div id="paypal-buttons" class="mr-16" ref="paypal"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$refs.paypal.addEventListener('load', this.loadPaypalButton());
  },
  computed: {
    cartTotalPrice() {
        let total = 0;
        this.$store.state.cartItems.forEach(product => {
            total += (product.price * product.quantity);
        });

        return total;
    },
  },
  methods: {
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
                        let errorUpdate;
                        try {
                            await this.$strapi.update('fourmis', product.id, { stock: product.actualStock - product.quantity }); 
                        } catch (error) {
                            errorUpdate = error;
                        }
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
                    this.$emit('transactionCompleted');

                    console.info(details);
                    console.info(this.$store.state.payer);
                });
            }
        }).render(this.$refs.paypal);
    },
  },
};
</script>
