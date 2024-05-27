<template>
  <v-card class="my-4 pa-3 tarjeta" elevation="8">
    <v-row align="center" class="pa-2" no-gutters>
      <v-col cols="8">
        <p>Factura #{{ id }}</p>
      </v-col>
      <v-col cols="4" class="d-flex justify-center justify-md-end">
        <SearchCardButton
          :id="id"
          :route="route"
          :content="content"
          :params="params"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SearchCardButton from './buttons/SearchCardButton.vue';


export default {
  components: { SearchCardButton },
  props: ["route","id","content","params"]
  };
</script>
