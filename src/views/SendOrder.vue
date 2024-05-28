<template>
  <v-container class="mx-lg-16 mx-2 container">
    <div id="printMe">
      <v-row class="ms-2 my-6 align-center justify-start" no-gutters>
        <v-col cols="12">
          <RouterLink :to="{ name: 'preparationOrder' }">
            <div @click="goBack" class="mb-3 d-flex text-subtitle-1 reset-a d-print-none">
              <v-icon icon="mdi-arrow-left-bold-circle-outline" color="primary" start></v-icon>
              <p class="text-primary">Regresar</p>
            </div>
          </RouterLink>
        </v-col>
        <v-col cols="12" md="8">
          <v-sheet class="bg-transparent">
            <h1 class="text-primary text-uppercase">Despacho de Pedido</h1>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
          <h2 class="text-start text-primary">Nº de factura {{ orderStore?.orders[0]?.id }}</h2>
        </v-col>
      </v-row>

      <OrderInfo :order="orderStore?.orders[0]" />

      <!-- Tabla -->
      <ProductsOrderTableSkeleton :modificable="false" v-if="orderStore?.ordersLoading" />
      <ProductsOrderTable v-else :order="orderStore?.orders[0]" :modificable="false" />
      <OrderTableFooter :order="orderStore?.orders[0]" :modificable="false" />
    </div>

    <div class="text-center">
      <v-btn class="ms-2 my-6" align-center color="primary" @click="onSaveClick">
        Guardar para entregar
      </v-btn>
    </div>

    <!-- Alerta -->
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="El despacho ha sido guardado exitosamente."
          title="Despacho guardado"
        >
          <template v-slot:actions>
            <RouterLink :to="{ name: 'searchOrder', params: { id: orderStore?.orders[0]?.id } }">
              <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </RouterLink>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import OrderInfo from '../components/OrderInfo.vue';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '../stores/Orders';
import { onMounted, ref } from 'vue';
import ProductsOrderTable from '../components/ProductsOrderTable.vue';
import OrderTableFooter from '../components/OrderTableFooter.vue';
import ProductsOrderTableSkeleton from "../components/skeletons/ProductOrderTableSkeleton.vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
  },

  setup() {
    const route = useRoute();
    const orderStore = useOrdersStore();
    const dialog = ref(false); 
    const body = {
      status: "completed"
    };
    const idasd = route.params.id;
    const ruta = route?.path?.split("/");

    const saveOrder = () => {
      orderStore.updateOrder(idasd, orderStore.orders[0]);
      dialog.value = true; 
    };

    const onSaveClick = () => {
      saveOrder();
    };

    onMounted(() => {
      if (orderStore?.orders[0]?.id !== route.params.id) {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id, ruta[1]);
        }
      }
    });

    return {
      orderStore,
      dialog,
      onSaveClick
    };
  }
};
</script>

<style>
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
