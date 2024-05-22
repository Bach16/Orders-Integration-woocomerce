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
    <ProductsOrderTable :order="orderStore?.orders[0]" :modificable="false" isInput="false"/>


      <!-- <div>
        <v-checkbox
          v-for="item in desserts"
          :key="item.name"
          hide-details
          vertical
        ></v-checkbox>
      </div> -->

    <v-row align="center" no-gutters>
      <v-col cols="6">
        <v-card class="ms-2 py-6 datos" height="70px" elevation="2">
          <p>Observaciones</p>
          <p class="ml-10">-------------</p>
        </v-card>
      </v-col>
      <v-col cols="6">
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

            <v-col cols="4">
              <v-sheet class="pa-2">
                <p class="text-right">0.00</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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

export default {
  components: { OrderInfo,ProductsOrderTable },
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

  data() {
    return {
      output: null,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  setup() {
    const route = useRoute()
    const orderStore = useOrdersStore()
    const body = {
      status: "completed"
    }
    const idasd = route.params.id


    console.log(orderStore?.orders[0]);

    /* if (orderStore?.orders[0]?.id !== route.params.id) {
      onMounted(() => {
        const id = route.params.id
        if (id) {
          orderStore.getOrders(id)
        }
      })
    } */

    return {
      orderStore,
      body
    }
  }
};
</script>

