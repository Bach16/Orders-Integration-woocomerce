<template>
  <v-container class="mx-lg-16 mx-2 container">
    <v-row class="ms-2 my-6 align-center justify-start" no-gutters>
      <v-col cols="12">
        <RouterLink
          :to="{ name: 'searchOrder',}"
        >
          <div @click="goBack" class="mb-3 d-flex text-subtitle-1 reset-a">
            <v-icon icon="mdi-arrow-left-bold-circle-outline" color="primary" start></v-icon>
            <p class="text-primary" pink>Regresar</p>
          </div>
        </RouterLink>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="bg-transparent">
          <h1 class="text-primary text-uppercase">Preparación de Pedido</h1>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4" >
        <h2 class="text-start text-primary">Nº de factura {{ orderStore?.orders[0]?.id }}</h2>
        
      </v-col>
    </v-row>

    <OrderInfo :order="orderStore?.orders[0]" />

    <!-- Tabla -->
    <ProductsOrderTableSkeleton
      :modificable="true"
      v-if="orderStore?.ordersLoading"
    />

    <ProductsOrderTable
      v-else
      :order="orderStore?.orders[0]"
      :modificable="true"
      :newItem="newItem"
      :save="save"
      :onChangeToLocalStorage="onChangeToLocalStorage"
    />

    <OrderTableFooter
      :order="orderStore?.orders[0]"
      :modificable="true"
      :newItem="newItem"
      :save="save"
      :onChangeToLocalStorage="onChangeToLocalStorage"
      :_id="orderStore?.orders[0]?.id"
      :comments="orderStore?.orders[0]?.comments"
    />

    <div class="text-center" @click="save(true)">
      <RouterLink
        :to="{ name: 'sendOrder', params: { id: orderStore?.orders[0]?.id } }"
      >
        <v-btn class="ms-2 my-6" align="center" color="primary">
          Enviar a despacho
        </v-btn>
      </RouterLink>
    </div>
  </v-container>
</template>

<script>
import OrderInfo from "../components/OrderInfo.vue";
import OrderTableFooter from "../components/OrderTableFooter.vue";
import ProductsOrderTable from "../components/ProductsOrderTable.vue";
import ProductsOrderTableSkeleton from "../components/skeletons/ProductOrderTableSkeleton.vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted, onUnmounted, watch } from "vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton,
  },
  methods: {
    onClick() {
      this.$router.push("/sendOrder");
      this.$router.push("/sendOrder");
    },

    navigate() {},
  },
  data() {
    return {
      newItem: {
        cantidad: "",
        nbultos: "",
        product_id: "",
        product_id: "",
        quantity: "",
        name: "",
        price: "",
        input: true,
        checked:false      
    }
    }
  },
  setup() {
    const orderStore = useOrdersStore();
    const route = useRoute();
    const ruta = route?.path?.split("/");

    //---------------update order-----------------
    
    const idasd = route.params.id;
      

    const orderSearch = () => {
      orderStore.updateOrder(idasd.value, body);
    };
    //------------------------------------------

    const save = (isSave) => {
      const localStorageParsed = JSON.parse(
        localStorage.getItem("order_line_items")
      );
      const newItem = {
        cantidad: "",
        nbultos: "",
        product_id: "",
        quantity: "",
        name: "",
        price: "",
        input: true,
        checked:false
      };
      if (!isSave) {
        orderStore?.orders[0]?.line_items.push({ ...newItem });
      }
    };

    const onChangeToLocalStorage = (e) => {
      const localStorageParsed = JSON.parse(
        localStorage.getItem("order_line_items")
      );

      if (!localStorageParsed) {
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({ [idasd]: orderStore?.orders[0] })
        );
      } else {
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({
            ...localStorageParsed,
            [idasd]: orderStore?.orders[0]
          })
        );
      }
    };
    onMounted(() => {
      if (orderStore?.orders[0]?.id !== route.params.id) {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id, ruta[1]);
        }
      }
    });

    watch(
      () => orderStore.orders,
      (orders) => {
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("order_line_items")),
            [idasd]: orders[0]
          })
        );
      },
      { deep: true }
    );

    return {
      orderStore,
      save,
      onChangeToLocalStorage,
    };
  },
};
</script>

<style>
.datos {
  display: flex;
  justify-content: center;
  border-radius: 15px;
}

.datostxt {
  font-size: 16px;
  font-weight: 300;
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
