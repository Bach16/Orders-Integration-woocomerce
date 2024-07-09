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
        <h2 v-else-if="rol == 'bodeguero'">Ordenes para el dia de hoy</h2>
        <h2 v-else-if="rol == 'logistica'">Despachos para el dia de hoy</h2>
        <h2 v-else-if="rol == 'conductor'">Lista de Ordenes entregadas</h2>
      </v-sheet> -->
      <v-row>
        <v-col md="12" lg="12" sm="12" v-for="item in ordersList" :key="item.id">
          <SearchResultCard
            v-if="rol == 'bodeguero'"
            route="preparationOrder"
            content="Preparar orden"
            :id="item.id"
            :params="item.id"
            :date="item.date_created"
            :isEditable="this.$findValueByKey(item.meta_data,'estado_orden') == 'por despachar'"
          editableText="Esta orden ya fue editada pero no despachada"
          />
          <SearchResultCard
            v-if="rol == 'logistica'"
            route="sendOrder"
            content="Despachar orden"
            :id="item.id"
            :params="item.id"
            :date="item.date_created"

          />
          <SearchResultCard
            v-if="rol == 'conductor'"
            route="deliveredOrder"
            content="Subir comprobante de entrega"
            :isDriver="true"
            :id="item.id"
            :params="item.id"
            :date="item.date_created"
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
