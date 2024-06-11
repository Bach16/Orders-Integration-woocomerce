<template>
  <v-card class="pa-6 mt-12 bg-white search-container">
    <v-tabs v-model="tab" bg-color="transparent" color="#263d8d" >
        {{ console.log(tab)}}
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item"
        :value="item"
        class="text-h6 font-weight-medium pr-4"
      ></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card color="white" flat>
          <SearchResultContainer
            :isLoading="isLoading"
            :ordersList="ordersList"
            :rol="rol"
            :firstSearch="firstSearch"
          />
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
import SearchResultContainer from "./searchResultContainer.vue";

export default {
  components: { SearchResultContainer },
  props: ["isLoading", "ordersList", "rol", "firstSearch"],
  data() {
    
    return {
      tab: "Pedidos de hoy",
      items: ["Pedidos de hoy", "Pedidos pendientes"],
    };
  },
};
</script>
