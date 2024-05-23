<template>
  <v-container class="mx-lg-16 mx-2 container">
    <v-sheet class="pa-6 bg-transparent">
      <h1>Busqueda de Pedidos</h1>
    </v-sheet>

    <v-card class="ms-2 my-4 pa-4 tarjeta" elevation="2">
      <v-row align-center justify="center" class="pa-2 no-gutters">
        <v-col cols="12" md="8" class="d-flex justify-center">
          <v-text-field
            v-model="id"
            hide-details
            append-inner-icon="mdi-magnify"
            label="Buscar"
            variant="outlined"
            height="56"
            class="search-input"
            type="text"
            @input="filterInput"
          />
          <v-btn
            color="primary"
            :loading="loading"
            @click="orderSearch"
            height="56"
            class="ml-2 search-button"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-sheet class="pa-6 mt-3 bg-transparent">
      <h2>Resultados</h2>
    </v-sheet>

    <div v-if="orderStore?.ordersLoading">Loading...</div>
    <div v-else class=" ms-2 list-container">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="item in orderStore?.ordersList" :key="item.id">
          <v-card class="my-4 pa-3 tarjeta" elevation="8">
            <v-row align="center" class="pa-2" no-gutters>
              <v-col cols="8">
                <p>Pedido #{{ item.id }}</p>
              </v-col>
              <v-col cols="4" class="d-flex justify-center justify-md-end">
                <RouterLink :to="{ name: 'preparationOrder', params: { id: item.id } }">
                  <v-btn color="primary" height="36">
                    Preparar
                  </v-btn>
                </RouterLink>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { ref } from "vue";

export default {
  data: () => ({
    loaded: false,
    loading: false,
    inputValue: "",
    searchResults: null,
  }),

  setup() {
    const orderStore = useOrdersStore();
    const route = useRoute();
    const ruta = route?.path?.split("/");

    const id = ref("");

    const filterInput = (event) => {
      const value = event.target.value.replace(/[^0-9]/g, '');
      id.value = value;
    };

    const orderSearch = () => {
      orderStore.getOrders(id.value, ruta[1]);
    };

    return {
      orderSearch,
      orderStore,
      id,
      filterInput,
    };
  },
};
</script>

<style>
h1,
h2 {
  color: #263d8d;
}

p {
  font-weight: 500;
}

.container {
  background-color: #DBE1E9;
  height: auto;
  min-height: 100vh;
}

.tarjeta {
  display: flex;
  justify-content: center;
  border-radius: 10px;
}

.search-input {
  flex: 1;
}

.search-button {
  margin-left: 8px;
}
</style>
