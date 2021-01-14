<template>
  <v-card 
    class="mx-auto products-header-card" 
    :elevation="elevation" 
    outlined 
    @mouseover="elevation = 3" 
    @mouseout="elevation = 1"
  >
    <v-card-title>Fourmis</v-card-title>

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
};
</script>
