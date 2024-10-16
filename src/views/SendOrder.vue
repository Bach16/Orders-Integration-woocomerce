<template>
  <v-container class="max-size mx-lg-16 mx-2 container">
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
        :disabled="isDisabled"
        :onChangeToLocalStorage="onChangeToLocalStorage"
      />
      <OrderTableFooter
        :order="orderStore?.orders[0]"
        :modificable="false"
        :_id="orderStore?.orders[0]?.id"
        :comments="
          orderStore?.orders[0]?.meta_data[
            this.$findIndexByKey(
              orderStore?.orders[0]?.meta_data,
              `custom_order_comments`
            )
          ]?.value
        "
      />
    </div>

    <div class="mt-8 d-print-none">
      <v-row no-gutters class="align-center">
        <v-col cols="4" class="d-flex justify-center">
          <v-btn
            size="large"
            class="px-6 mr-2"
            rounded="lg"
            color="primary"
            @click="onDisabledClick"
          >
            Editar filas
          </v-btn>
        </v-col>

        <v-col cols="4" class="d-flex justify-center">
          <v-btn
            size="large"
            class="px-6 mr-2"
            rounded="lg"
            color="primary"
            @click="dialog2 = true"
          >
            Guardar para entregar
          </v-btn>
        </v-col>

        <v-col cols="4" class="d-flex justify-center">
          <v-btn
            size="large"
            class="px-6 ml-2"
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
      <v-dialog v-model="dialog2" persistent width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="¿Estás seguro de que quieres guardar la información ingresada?"
          title="Despacho del Pedido"
          class="custom-icon-color"
        >
          <template v-slot:actions>
            <v-btn
              class="btn-dialog ml-4"
              text="Regresar"
              @click="dialog2 = false"
            ></v-btn>
            <v-btn
              class="ms-auto mr-6 btn-dialog"
              text="Guardar"
              @click="onSaveClick"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" persistent width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="El despacho ha sido guardado exitosamente. Recuerda imprimir tu guía."
          title="Despacho guardado"
          class="d-print-none custom-icon-color"
        >
          <template v-slot:actions>
            <RouterLink
              :to="{
                name: 'searchOrder',
                params: { id: orderStore?.orders[0]?.id },
              }"
            >
              <v-btn
                class="btn-dialog ml-4"
                text="Salir"
                @click="dialog = false"
              ></v-btn>
            </RouterLink>
            <!--  <v-btn
              class="ms-auto pr-6 font-weight-bold"
              text="Regresar"
              @click="dialog = false"
            ></v-btn> -->
            <v-btn
              class="ms-auto mr-6 btn-dialog"
              text="Imprimir"
              @click="print"
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
import { useAuthStore } from "../stores/Auth";
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
    const userStore = useAuthStore();
    const dialog = ref(false);
    const dialog2 = ref(false);

    const isDisabled = ref(true);
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
    const onChangeToLocalStorage = (e) => {
      if (e.target.name === "nbultos") {
        orderStore.updateTotalNBultos(orderStore?.orders[0]?.line_items);
      }
      if (e.target.name === "varios") {
        orderStore.updateTotalVarios(orderStore?.orders[0]?.line_items);
      }
    };

    const saveOrder = () => {
      const aja = orderStore.orders[0].line_items.filter((e) => {
        return !e.idParent;
      });

      const ajasa = aja.map((e) => {
        return {
          id: e.id,
          meta_data: [
            {
              key: e.meta_data[0].key,
              value: e.meta_data[0].value,
            },
            {
              key: e.meta_data[1].key,
              value: e.meta_data[1].value,
            },
            {
              key: e.meta_data[2].key,
              value: e.meta_data[2].value,
            },
            {
              key: e.meta_data[3].key,
              value: e.meta_data[3].value,
            },
            {
              key: e.meta_data[4].key,
              value: e.meta_data[4].value,
            },
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
      const res = orderStore.updateOrder(idasd, body);
      res.then((r) => {
        localStorage.removeItem("order_line_items");
      });

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
      isDisabled.value = true;
    };

    const onDisabledClick = () => {
      isDisabled.value = false;
    };

    onMounted(() => {
      if (!localStorage.getItem("rol")) {
        return router.push("/");
      } else if (!localStorage.getItem("token")) {
        return router.push("/");
      } else if (localStorage.getItem("rol") !== "logistica") {
        return router.push("/searchOrder");
      }
      if (orderStore?.orders[0]?.id !== route.params.id) {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id, ruta[1], localStorage.getItem("rol"));
        }
      }
      userStore.checkUser(userStore.user);
    });

    return {
      orderStore,
      dialog,
      dialog2,
      onSaveClick,
      goBack,
      toPrint,
      isDisabled,
      onDisabledClick,
      onChangeToLocalStorage
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
</style>
