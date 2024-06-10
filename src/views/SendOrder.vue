<template>
  <v-container class="mx-lg-16 mx-2 container">
    <div id="printMe">
      <v-row
        class="ms-2 my-6 align-center justify-start align-center"
        no-gutters
      >
        <v-col cols="12">
          <GoBackButton />
        </v-col>
   
        <v-col cols="12" md="8">
          <v-sheet class="bg-transparent">
            <h1 class="text-primary text-uppercase">Despacho de Pedido</h1>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
          <h2 class="text-start text-primary">
            Nº de factura {{ orderStore?.orders[0]?.id }}
          </h2>
        </v-col>
      </v-row>

      <OrderInfo :order="orderStore?.orders[0]" />

      <!-- Tabla -->
      <ProductsOrderTableSkeleton
        :modificable="false"
        v-if="orderStore?.ordersLoading"
      />
      <ProductsOrderTable
        v-else
        :order="orderStore?.orders[0]"
        :modificable="false"
      />
      <OrderTableFooter :order="orderStore?.orders[0]" :modificable="false" />
    </div>

    <div class="mt-8 d-print-none">
      <v-row no-gutters>
        
        <v-col class="d-flex justify-end">
          <v-btn
            width="290px"
            size="large"
            class="px-6 mr-2"
            rounded="lg"
            color="primary"
            @click="onSaveClick"
          >
            Guardar para entregar
          </v-btn>
        </v-col>

        <v-col class="d-flex justify-start">
          <v-btn
            size="large"
            width="290px"
            class="px-6 ml-2 "
            rounded="lg"
            color="primary"
            @click="print"
          >
            Imprimir guia
          </v-btn>
        </v-col> 
      </v-row>
    </div>

    <!-- Alerta -->
    <div class="text-center pa-4 d-print-none">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="El despacho ha sido guardado exitosamente. Recuerda imprimir tu guía."
          title="Despacho guardado"
          class="d-print-none"
        >
          <template v-slot:actions>
            <RouterLink
              :to="{
                name: 'searchOrder',
                params: { id: orderStore?.orders[0]?.id },
              }"
            >
              <v-btn
                class="ms-auto pl-6 font-weight-bold"
                text="Salir"
                @click="dialog = false"
              ></v-btn>
            </RouterLink>
            <v-btn
              class="ms-auto pr-6 font-weight-bold"
              text="Regresar"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
      <!-- <v-btn class="ms-2 my-6" align-center color="primary" @click="print">
        Imprimir guia
      </v-btn> -->
      <!-- no borrar porfi -->
    </div>
  </v-container>
</template>

<script>
import OrderInfo from "../components/table/OrderInfo.vue";
import { useRoute, useRouter } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted, ref, watch } from "vue";
import ProductsOrderTable from "../components/table/ProductsOrderTable.vue";
import OrderTableFooter from "../components/table/OrderTableFooter.vue";
import ProductsOrderTableSkeleton from "../components/skeletons/ProductOrderTableSkeleton.vue";
import GoBackButton from "../components/buttons/GoBackButton.vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton,
    GoBackButton,
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderStore = useOrdersStore();
    const dialog = ref(false);
    const body = {
      status: "completed",
    };
    const goBack = () => {
      router.go(-1);
    };
    const idasd = route.params.id;
    const ruta = route?.path?.split("/");

    const toPrint = () => {
      dialog.value = false;
      print();
    };

    const saveOrder = () => {
      const aja = orderStore.orders[0].line_items.filter((e) => {
        return !e.idParent;
      });
      console.log(aja);

      const ajasa = aja.map((e) => {
        return {
          id: e.id,
          meta_data: [
            {
              key: e.meta_data[5].key,
              value: e.meta_data[5].value,
            },
            {
              key: e.meta_data[6].key,
              value: e.meta_data[6].value,
            },
          ],
        };
      });
      const body = {
        line_items: ajasa,
        meta_data: [
          {
            key: "estado_orden",
            value: "despachado",
          },
        ],
      };
      orderStore.updateOrder(idasd, body);
      /* const newReqBody = orderStore.orders[0].line_items.map((e) => {
        return {
          id: e.id,
          meta_data: [
            {
              key: e.meta_data[6].key,
              value: e.meta_data[6].value,
            },
          ],
        };
      });
      orderStore.updateOrder(idasd, {line_items:newReqBody}); */
      dialog.value = true;
    };
    watch(
      () => orderStore.orders,
      (orders) => {
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("order_line_items")),
            [idasd]: orders[0],
          })
        );
      },
      { deep: true }
    );

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
      onSaveClick,
      goBack,
      toPrint,
    };
  },
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
