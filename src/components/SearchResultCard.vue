<template>
  <v-card class="my-4 pa-3 tarjeta">
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="4">
        <p>Factura #{{ id }}</p>
      </v-col>
      <v-col cols="8" class="d-flex justify-center justify-md-end">
        <SearchCardButton
          :id="id"
          :route="route"
          :content="content"
          :params="params"
          :isDriver="isDriver"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SearchCardButton from './buttons/SearchCardButton.vue';


export default {
  components: { SearchCardButton },
  props: ["route","id","content","params","isDriver"]
  };
</script>
