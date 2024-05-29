<template>
  <v-container class="py-6 px-2">
  <div v-if="isLoading" class="px-4">Cargando...</div>
  <div v-else-if="!isLoading && ordersList?.length" class="ms-2 list-container">
    <v-sheet class="mb-1 bg-transparent">
      <h2 v-if="rol=='bodeguero'">Pedidos para el dia de hoy</h2>
      <h2 v-if="rol=='gerente'">Despachos para el dia de hoy</h2>
      <h2 v-if="rol=='conductor'">Lista de pedidos entregados</h2>
    </v-sheet>
    <v-row>
      <v-col  md="6" lg="6" v-for="item in ordersList" :key="item.id">
        <SearchResultCard
          v-if="rol == 'bodeguero'"
          route="preparationOrder"
          content="preparar"
          :id="item.id"
          :params="item.id"
        />
        <SearchResultCard
          v-if="rol == 'gerente'"
          route="sendOrder"
          content="Despachar"
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
  <div v-else-if="firstSearch"><NotFound /></div>
</v-container>
</template>
<script>
import NotFound from "./NotFound.vue";
import SearchResultCard from "./SearchResultCard.vue";

export default {
  components: { NotFound, SearchResultCard },
  props: ["isLoading","ordersList","rol"]

};
</script>
