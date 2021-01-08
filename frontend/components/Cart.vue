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
                    Test
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
export default {
  components: {},
  props: {
    dialog: Boolean,
  },
  data() {
    return {
    }
  },
  methods: {
    closeDialog() {
        this.$emit('onClose');
    }
  }
};
</script>