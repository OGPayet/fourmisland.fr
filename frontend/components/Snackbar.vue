<template>
    <v-snackbar
        v-model="showSnackbar"
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
            @click="$emit('displaySnackbar', false)"
        >
            Fermer
        </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
  props: {
    snackbar: Boolean,
    textSnackbar: String,
  },
  computed: {
    showSnackbar: {
        get() {
            return this.snackbar;
        },
        set(value) {
            this.$emit('displaySnackbar', value);
        }
    }
  },
}
</script>
