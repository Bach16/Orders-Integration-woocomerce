<template>
  <v-card class="pa-6 mt-12 bg-white search-container">
    <v-row class="align-end" no-gutters>
      <v-col cols="8">
        <span class="mx-2 text-h5 text-primary font-weight-bold">
          Resultados de Busqueda</span
        >
      </v-col>
      <v-col class="d-flex justify-end">
        <span
          class="mr-6 text-primary cursor-pointer font-weight-medium text-decoration-underline"
          @click="callModifyObject"
        >
          Mostrar ordenes de hoy
        </span>
      </v-col>
      <v-divider
        :thickness="1"
        class="opacity-100 mb-8 mt-4"
        color="primary"
      ></v-divider>
      <div v-if="isLoading" class="px-4">Cargando...</div>
      <v-col
        v-else-if="!isLoading && ordersList?.length"
        cols="12"
        v-for="item in ordersList"
        :key="item.id"
      >
        <SearchResultCard
          v-if="rol == 'bodeguero'"
          route="preparationOrder"
          content="Preparar orden"
          :id="item.id"
          :params="item.id"
        />
        <SearchResultCard
          v-if="rol == 'logistica'"
          route="sendOrder"
          content="Despachar orden"
          :id="item.id"
          :params="item.id"
        />
        <SearchResultCard
          v-if="rol == 'conductor'"
          route="sendOrder"
          content="Subir comprobante de entrega"
          :isDriver="true"
          :id="item.id"
          :params="item.id"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SearchResultCard from "./SearchResultCard.vue";
import NotFound from "./NotFound.vue";

export default {
  components: { NotFound, SearchResultCard },
  props: [
    "isLoading",
    "ordersList",
    "rol",
    "firstSearch",
    "changeSerchVisibility",
  ],
  methods: {
    callModifyObject() {
      this.changeSerchVisibility();
    },
  },
};
</script>
