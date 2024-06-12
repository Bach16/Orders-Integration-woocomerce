<template>
  <v-card class="pa-6 mt-12 bg-white search-container">
    <v-tabs v-model="tab" bg-color="transparent" class="border-b-sm border-black " color="#263d8d">
      {{ console.log(tab) }}
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
import { onMounted, ref, watch } from "vue";
import { useOrdersStore } from "../stores/Orders";
import SearchResultContainer from "./searchResultContainer.vue";
import { useRoute } from "vue-router";

export default {
  components: { SearchResultContainer },
  props: ["isLoading", "ordersList", "rol", "firstSearch"],
  setup() {
    const id = ref("");
    const route = useRoute();
    const ruta = route?.path?.split("/");
    const tab = ref("Pedidos de hoy")

    const orderStore = useOrdersStore();
    const items = ref(["Pedidos de hoy", "Pedidos pendientes"])
    watch(
      () => tab,
      (tab)=>{
        console.log("saddas");

        orderStore.currentTab = tab.value
        orderStore.chanceTabOrder(tab.value)
      },
      { deep: true }
    );
    return {
      orderStore,
      tab,
      items,
    };
  },
};
</script>
