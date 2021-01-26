<template>
  <v-card 
    :class="breakpointName != 'xs' ? 'mx-auto products-header-card' : 'products-header-card-mobile'" 
    :elevation="elevation" 
    outlined 
    @mouseover="elevation = 3" 
    @mouseout="elevation = 1"
  >
    <v-card-title>Nos Fourmis</v-card-title>

    <v-card-text>
      Des fourmis élevées et récoltées de manière éthique, sur un prélèvement raisonné local
      fait par nos soins. <br/> Chez FourmisLand nous traitons le vivant comme il le
      mérite !
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      elevation: 1,
    };
  },
  computed: {
    breakpointName() {
      return this.$vuetify.breakpoint.name;
    },
  },
};
</script>
