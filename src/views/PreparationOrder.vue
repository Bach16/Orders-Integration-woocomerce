<template>
  <v-container class="container">
    <v-row align="center" class="pa-6" no-gutters>
      <v-col cols="12">
        <RouterLink
          :to="{ name: 'searchOrder',}"
        >
          <div @click="goBack" class="mb-3 d-flex text-subtitle-1 reset-a">
            <v-icon icon="mdi-arrow-left-bold-circle-outline" start></v-icon>
            <p class="">Regresar</p>
          </div>
        </RouterLink>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="bg-transparent">
          <h1>Preparación de Pedido</h1>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" offset-md="1">
        <p>Nº de proceso</p>
      </v-col>
    </v-row>

    <OrderInfo :order="orderStore?.orders[0]" />

    <!-- Tabla -->
    <ProductsOrderTable
      :order="orderStore?.orders[0]"
      :modificable="true"
      :newItem="newItem"
      :save="save"
    />

    <v-row align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-card class="ms-2 datos" elevation="2">
          <v-textarea
            hide-details="auto"
            label="Observaciones"
            variant="solo"
            row-height="20"
            rows="2"
            auto-grow
          ></v-textarea>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="ms-2 datos" elevation="2">
          <v-row class="pa-4" no-gutters>
            <!-- Totales -->
            <v-col cols="6">
              <v-sheet class="pa-2">
                <span>Totales</span>
              </v-sheet>
            </v-col>

            <v-divider
              class="border-opacity-50"
              length="100px"
              vertical
            ></v-divider>

            <v-col cols="6">
              <v-sheet class="pa-2">
                <p class="text-right">${{ orderStore?.orders[0]?.total }}</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center" @click="save(true)">
      <RouterLink :to="{ name: 'sendOrder', params: { id: orderStore?.orders[0]?.id } }">
        <v-btn class="ms-2 my-6" align-center color="primary"  >
          Enviar a despacho
        </v-btn>
      </RouterLink>
    </div>
  </v-container>
</template>

<script>
import OrderInfo from "../components/OrderInfo.vue";
import ProductsOrderTable from "../components/ProductsOrderTable.vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted } from "vue";

export default {
  components: { OrderInfo, ProductsOrderTable },
  methods: {
    onClick() {
      this.$router.push("/sendOrder");
    },

    navigate() {},
    save(isSave) {
      const orderStore = useOrdersStore();

      console.log("entro");

      this.newItem = {
        cantidad: "",
        nbultos: "",
        product_id: "",
        quantity: "",
        name: "",
        price: "",
        input: true,
      };
      if (!isSave) {
        orderStore?.orders[0]?.line_items.push({ ...this.newItem });
      } else {
        console.log(
          orderStore.orders[0].line_items[
            orderStore.orders[0].line_items.length - 1
          ].input
        );
        orderStore.orders[0].line_items[
          orderStore.orders[0].line_items.length - 1
        ].input = false;
        console.log(
          orderStore.orders[0].line_items[
            orderStore.orders[0].line_items.length - 1
          ].input
        );
      }
      localStorage.setItem(
        "order_line_items",
        JSON.stringify(orderStore?.orders[0]?.line_items)
      );
    },
  },
  data() {
    return {
      newItem: {
        cantidad: "",
        nbultos: "",
        product_id: "",
        quantity: "",
        name: "",
        price: "",
        input: true,
      },
    };
  },
  setup() {
    const route = useRoute();
    const orderStore = useOrdersStore();
    const body = {
      status: "completed",
    };
    const idasd = route.params.id;

    const orderSearch = () => {
      orderStore.updateOrder(idasd.value, body);
    };

    if (orderStore?.orders[0]?.id !== route.params.id) {
      onMounted(() => {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id);
        }
      });
    }

    return {
      orderStore,
      body,
    };
  },
};
</script>

<style>
.datos {
  display: flex;
  justify-content: center;
  border-radius: 20px;
}

.datostxt {
  font-size: 16px;
  font-weight: 300;
}

.tabla {
  width: 100%;
}

a:link {
  text-decoration: none;
  color: inherit;

}

a:visited {
  text-decoration: none;
  color: inherit;

}

a:hover {
  text-decoration: none;
  color: inherit;

}

a:active {
  text-decoration: none;
  color: inherit;

}



</style>
