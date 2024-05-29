<template>
  <v-container class="py-6 px-2">
  <div v-if="isLoading" class="px-4">Cargando...</div>
  <div v-else-if="!isLoading && ordersList?.length" class="ms-2 list-container">
    <v-sheet class="mb-1 bg-transparent">
      <h2 v-if="!!(!isLoading && ordersList?.length) && !!firstSearch">Resultados de busqueda</h2>
      <h2 v-else-if="rol=='shop_manager'">Pedidos para el dia de hoy</h2>
      <h2 v-else-if="rol=='administrator'">Despachos para el dia de hoy</h2>
      <h2 v-else-if="rol=='contributor'">Lista de pedidos entregados</h2>
    </v-sheet>
    <v-row>
      <v-col  md="6" lg="6" v-for="item in ordersList" :key="item.id">
        <SearchResultCard
          v-if="rol == 'shop_manager'"
          route="preparationOrder"
          content="preparar"
          :id="item.id"
          :params="item.id"
        />
        <SearchResultCard
          v-if="rol == 'administrator'"
          route="sendOrder"
          content="Despachar"
          :id="item.id"
          :params="item.id"
        />
        <SearchResultCard
          v-if="rol == 'contributor'"
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
import NotFound from "./NotFound.vue";
import SearchResultCard from "./SearchResultCard.vue";

export default {
  components: { NotFound, SearchResultCard },
  props: ["isLoading","ordersList","rol","firstSearch"]

};
</script>
