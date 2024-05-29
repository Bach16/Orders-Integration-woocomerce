<template>
  <v-container class="mx-lg-16 mx-2 container">
    <v-sheet class="pa-6 bg-transparent">
      <h1>Busqueda de Pedidos</h1>
    </v-sheet>

    <v-card class="ms-2 my-4 pa-4 tarjeta" elevation="2">
      <v-row align-center justify="center" class="pa-2 no-gutters">
        <v-col cols="12" md="8" class="d-flex justify-center">
          <InputC
            :vModel="id"
            hide-details
            appendInnerIcon="mdi-magnify"
            label="Buscar"
            variant="outlined"
            height="56"
            class="search-input"
            type="text"
            :input="filterInput"
            :onlyNumber="true"
            :isSearch="true"
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

    <SearchResultContainer
      :isLoading="orderStore?.ordersLoading"
      :ordersList="orderStore?.ordersList"
      :rol="rol"
      :firstSearch="firstSearch"
    />
  </v-container>
</template>

<script>
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted, ref } from "vue";
import NotFound from "../components/NotFound.vue";
import SearchResultCard from "../components/SearchResultCard.vue";
import SearchResultContainer from "../components/searchResultContainer.vue";
import InputC from "../components/inputs/InputC.vue";

export default {
  components: { NotFound, SearchResultCard, SearchResultContainer, InputC },
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
    let firstSearch = ref(false);
    const rol = ref("");

    onMounted(() => {
      const storedRol = sessionStorage.getItem("rol");
      if (storedRol) {
        rol.value = storedRol;
      }
      orderStore.getOrders(id.value, ruta[1]);
    });

    const filterInput = (event) => {
      const value = event.target.value.replace(/[^0-9]/g, "");
      id.value = value;
    };

    const orderSearch = () => {
      firstSearch.value = true;
      orderStore.getOrders(id.value, ruta[1]);
    };

    return {
      orderSearch,
      orderStore,
      id,
      filterInput,
      firstSearch,
      rol,
    };
  },
};
</script>

<style>
h1 {
  color: #263d8d;
  text-transform: uppercase;
}

h2 {
  color: #263d8d;
}

p {
  font-weight: 500;
}

.container {
  background-color: #dbe1e9;
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
