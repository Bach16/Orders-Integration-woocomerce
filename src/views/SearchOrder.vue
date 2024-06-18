<template>
  <v-container class="mx-lg-16 mx-2 justify-center container max-size">
    <!-- Banner de sesión -->
    <SessionBanner :username="username" :logout="logout" />

    <!-- <v-sheet class="py-4 px-2 bg-transparent">  
      <h2>Busqueda de Pedidos</h2>
    </v-sheet> -->

    <!-- Tarjeta Busqueda de pedidos -->
    <form @submit.prevent="orderSearch" @keyup.enter="orderSearch">
      <div class="pa-4 tarjeta-search bg-white">
        <v-row no-gutters class="pa-2">
          <v-col lg="11" md="11" sm="11" cols="10" class="d-flex justify-center">
            <InputC
              :vModel="id"
              hide-details
              variant="plain"
              placeholder="Ingresa el número de orden"
              height="56"
              class="search-input border-sm px-4"
              type="text"
              :input="filterInput"
              :onlyNumber="true"
              :isSearch="true"
            />
          </v-col>
          <v-col lg="1" md="1" sm="1" cols="2" class="d-flex justify-start">
            <v-btn
              class="rounded-0"
              icon="mdi-magnify"
              color="primary"
              type="submit"
              hide-details
              height="56"
              width="56"
            >
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </form>

    <SearchOrderResult
      v-if="firstSearch"
      :isLoading="orderStore?.ordersLoading"
      :firstSearch="firstSearch"
      :ordersList="orderStore?.SearchOrder"
      :rol="rol"
      :changeSerchVisibility="changeSerchVisibility"
    />
    <!-- Contenedor con resultados -->
    <SearchResultTabs
      v-else
      :isLoading="orderStore?.ordersLoading"
      :ordersList="orderStore?.ordersList"
      :pendingOrders="orderStore?.pendingOrders"
      :todaysOrders="orderStore?.todaysOrders"
      :rol="rol"
      :firstSearch="firstSearch"
    />

    <!-- Contenedor con resultados -->
    <!-- <SearchResultContainer
      :isLoading="orderStore?.ordersLoading"
      :ordersList="orderStore?.ordersList"
      :rol="rol"
      :firstSearch="firstSearch"
    /> -->
  </v-container>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useOrdersStore } from "../stores/Orders";
import { useAuthStore } from "../stores/Auth";
import InputC from "../components/inputs/InputC.vue";
import SessionBanner from "../components/buttons/SessionBanner.vue";
import SearchResultTabs from "../components/SearchResultTabs.vue";
import SearchOrderResult from "../components/SearchOrderResult.vue";

export default {
  components: { SearchOrderResult, SearchResultTabs, InputC, SessionBanner },
  setup() {
    const orderStore = useOrdersStore();
    const userStore = useAuthStore();
    const route = useRoute();
    const ruta = route?.path?.split("/");
    const router = useRouter();

    const id = ref("");
    let firstSearch = ref(false);
    const rol = ref("");

    onMounted(() => {
      const storedRol = localStorage.getItem("rol");
      if (storedRol) {
        rol.value = storedRol;
      }
      orderStore
        .getOrders(id.value, ruta[1], localStorage.getItem("rol"))
        .then(() => {
          orderStore.chanceTabOrder();
        });
      /* if (localStorage.getItem("token")) {
        return;
      } else {
        router.push("/");
      } */
     
      if (
        (localStorage.getItem("rol") == "logistica" ||
          localStorage.getItem("rol") == "bodeguero" ||
          localStorage.getItem("rol") == "conductor") &&
        localStorage.getItem("rol") && localStorage.getItem("token")
      ) 
        return;
      else return router.push("/");
    });

    const filterInput = (event) => {
      const value = event.target.value.replace(/[^0-9]/g, "");
      id.value = value;
    };

    const orderSearch = () => {
      firstSearch.value = true;
      orderStore.getOrders(
        id.value,
        ruta[1],
        localStorage.getItem("rol"),
        true
      );
    };
    const changeSerchVisibility = () => {
      firstSearch.value = false;
    };
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("order_line_items");
      router.push("/");
    };

    return {
      orderSearch,
      orderStore,
      id,
      filterInput,
      firstSearch,
      rol,
      changeSerchVisibility,
      logout,
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

.tarjeta-search {
  display: flex;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
}

.max-size {
  width: 65%;
}

@media only screen and (max-width: 1500px) {
  .max-size {
    width: 80%;
  }
}
@media only screen and (max-width: 768px) {
  .max-size {
    width: 90%;
  }
}
@media only screen and (max-width: 500px) {
  .max-size {
    width: 100%;
  }

}
.search-input {
  background-color: #fafafa;
  flex: 1;
}

.session-banner {
  padding: 10px;
  text-align: center;
}

hr {
  border: none;
  border-top: 1px solid #263e8d42;
  margin: 10px 5px;
  width: 100%;
}
</style>
