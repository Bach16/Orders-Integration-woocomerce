<template>
  <v-container class="container">
    <v-sheet class="pa-6 bg-transparent">
      <h1>Busqueda de Pedidos</h1>
    </v-sheet>

    <v-card class="mx-auto my-4 pa-4 tarjeta" elevation="8">
      <v-row align="center" class="pa-2" no-gutters>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="id"
            hide-details
            append-inner-icon="mdi-magnify"
            label="Buscar"
            variant="outlined"
            height="56"
          />
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center justify-md-end mt-2">
          <v-btn
            color="primary"
            :loading="loading"
            @click="orderSearch"
            height="56"
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
    <div v-else class="list-container">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="item in orderStore?.orders" :key="item.id">
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
    const id = ref("");
    const orderSearch = () => {
      orderStore.getOrders(id.value);
    };

    return {
      orderSearch,
      orderStore,
      id,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

h1,
h2 {
  color: #1565c0;
}

p {
  font-weight: 500;
}

.container {
  background-color: #e3f2fd;
  height: auto;
  min-height: 100vh;
  width: auto;
}

.tarjeta {
  display: flex;
  justify-content: center;
  border-radius: 10px;
}
</style>
