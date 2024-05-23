<template>
  <v-container class="container">
    <div id="printMe">
    <v-row align="center" class="pa-6" no-gutters>
      <v-col cols="8">
        <v-sheet class="bg-transparent">
          <h1>Preparación de Pedido</h1>
        </v-sheet>
      </v-col>
      <v-col cols="3" offset="1">
        <p>Nº de proceso</p>
      </v-col>
    </v-row>

    <OrderInfo :order="orderStore?.orders[0]" />

    <!-- Tabla -->
    <ProductsOrderTableSkeleton :modificable="false" v-if="orderStore?.ordersLoading" />
    <ProductsOrderTable v-else :order="orderStore?.orders[0]" :modificable="false"/>


      <!-- <div>
        <v-checkbox
          v-for="item in desserts"
          :key="item.name"
          hide-details
          vertical
        ></v-checkbox>
      </div> -->

      <OrderTableFooter :order="orderStore?.orders[0]" :modificable="false" />
  </div>

    <div class="text-center">
      <v-btn class="ms-2 my-6" align="center" color="primary" @click="onClick">
        Guardar
      </v-btn>

      <v-btn class="ms-2 my-6" align="center" color="primary" @click="print">
        Imprimir guia
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import OrderInfo from '../components/OrderInfo.vue';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '../stores/Orders';
import { onMounted } from 'vue';
import ProductsOrderTable from '../components/ProductsOrderTable.vue';
import OrderTableFooter from '../components/OrderTableFooter.vue';
import ProductsOrderTableSkeleton from "../components/skeletons/ProductOrderTableSkeleton.vue";

export default {
  components: { OrderInfo,ProductsOrderTable,OrderTableFooter,ProductsOrderTableSkeleton },
  methods: {
    print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },
    onClick() {
      this.$router.push('/deliveredOrder');
      
    },

    navigate() {},
  },

  setup() {
    const route = useRoute()
    const orderStore = useOrdersStore()
    const body = {
      status: "completed"
    }
    const idasd = route.params.id
    const ruta = route?.path?.split("/");
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
      body
    }
  }
};
</script>

