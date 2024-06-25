<template>
  <v-card class="pa-6 mt-12 bg-white search-container overflow-visible">
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      class="border-b-sm border-black overflow-visible"
      color="#263d8d"
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item"
        :value="item"
        class="text-h5 texto-re-loco pr-4 overflow-visible"
      >
        <div v-if="item == 'Pedidos pendientes'" class="d-flex flex-row justify-center align-center ga-2">
          <p class="sa">{{ item }}</p>
          <p  v-if="pendingOrders.length !== 0" class="tab-pending-message">{{pendingOrders.length }}</p>
        </div>
        <p class="sa" v-else>{{ item }}</p>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card v-if="item == 'Pedidos de hoy'" color="white" flat>
          <SearchResultContainer
            :isLoading="isLoading"
            :ordersList="todaysOrders"
            :pendingOrders="pendingOrders"
            :rol="rol"
            :firstSearch="firstSearch"
          />
        </v-card>
        <v-card v-else color="white" flat>
          <SearchResultContainer
            :isLoading="isLoading"
            :ordersList="pendingOrders"
            :rol="rol"
            :firstSearch="firstSearch"
          />
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useOrdersStore } from "../stores/Orders";
import SearchResultContainer from "./searchResultContainer.vue";
import { useRoute } from "vue-router";

export default {
  components: { SearchResultContainer },
  props: [
    "isLoading",
    "ordersList",
    "todaysOrders",
    "pendingOrders",
    "rol",
    "firstSearch",
  ],
  setup() {
    const id = ref("");
    const route = useRoute();
    const ruta = route?.path?.split("/");
    const tab = ref("Pedidos de hoy");

    const orderStore = useOrdersStore();
    const items = ref(["Pedidos de hoy", "Pedidos pendientes"]);
    onUnmounted(() => {
      orderStore.cleanOrder()
    });
    watch(
      () => tab,
      (tab) => {
        orderStore.currentTab = tab.value;
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

<style>
.tab-pending-message {
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-weight:600;
  height: 25px;
  width: 25px;
  padding-right: 3px;
  padding-bottom: 0px;
  font-family: Helvetica, sans-serif;
  background-color: #ed3c57;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
}
.sa{
  font-weight:600;
}
.texto-re-loco{
  color: rgb(146, 146, 146);
}
</style>
