<template>
  
  <v-container class="mt-2">
    <div v-if="isLoading" class="px-4">Cargando...</div>
    <div
      v-else-if="!isLoading && ordersList?.length"
      class=" list-container"
    >
      <!-- <v-sheet class="mb-6 px-2 bg-transparent">
        <h2 v-if="!!(!isLoading && ordersList?.length) && !!firstSearch">
          Resultados de busqueda
        </h2>
        <h2 v-else-if="rol == 'bodeguero'">Pedidos para el dia de hoy</h2>
        <h2 v-else-if="rol == 'logistica'">Despachos para el dia de hoy</h2>
        <h2 v-else-if="rol == 'conductor'">Lista de pedidos entregados</h2>
      </v-sheet> -->
      <v-row>
        <v-col md="12" lg="12" sm="12" v-for="item in ordersList" :key="item.id">
          <SearchResultCard
            v-if="rol == 'bodeguero'"
            route="preparationOrder"
            content="Preparar pedido"
            :id="item.id"
            :params="item.id"
          />
          <SearchResultCard
            v-if="rol == 'logistica'"
            route="sendOrder"
            content="Despachar pedido"
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
    </div>
    <div v-else><NotFound /></div>
  </v-container>
  </template>
<script>
import { ref } from "vue";
import NotFound from "./NotFound.vue";
import SearchResultCard from "./SearchResultCard.vue";
import { useOrdersStore } from "../stores/Orders";

export default {
  components: { NotFound, SearchResultCard },
  props: ["isLoading", "ordersList", "rol", "firstSearch"],
};
</script>

<style>

.search-container{
  border-radius: 10px;
}

</style>
