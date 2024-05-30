<template>
  <v-container class="mx-lg-16 mx-2 container">
    <v-row class="ms-2 my-6 align-center justify-start" no-gutters>
      <v-col cols="12">
        <div
          @click="goBack"
          class="mb-3 cursor-pointer d-flex text-subtitle-1 reset-a"
        >
          <v-icon
            icon="mdi-arrow-left-bold-circle-outline"
            color="primary"
            start
          ></v-icon>
          <p class="text-primary" pink>Regresar</p>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="bg-transparent">
          <h1 class="text-primary text-uppercase">Preparación de Pedido</h1>
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
      :modificable="true"
      v-if="orderStore?.ordersLoading"
    />
    <div class="d-flex sad" v-else>
      <div class="table-container">
        <ProductsOrderTable
          :order="orderStore?.orders[0]"
          :modificable="true"
          :newItem="newItem"
          :save="save"
          :onChangeToLocalStorage="onChangeToLocalStorage"
        />
      </div>
      <div class="py-0 px-2">
        <div class="top-container"></div>
        <div
          v-for="item in orderStore?.orders[0]?.line_items"
          :key="item.id"
          class="d-flex flex-column"
        >
          <DeleteTableButton
            :onClick="orderStore?.deleteSubproduct"
            :id="item.id"
            v-if="item?.isNew"
          />
          <div v-else class="delete-button">
            <v-icon class="del-button" icon="mdi-plus" start></v-icon>
          </div>
        </div>
      </div>
    </div>

    <OrderTableFooter
      :order="orderStore?.orders[0]"
      :modificable="true"
      :_id="orderStore?.orders[0]?.id"
      :comments="orderStore?.orders[0]?.comments"
    />

    <div class="text-center mt-8">
      <v-btn
        size="large"
        class="px-6"
        rounded="lg"
        color="primary"
        @click="onSaveClick"
      >
        Guardar para despacho
      </v-btn>
    </div>

    <!-- Alerta de pedido actualizado -->
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="La preparación del pedido ha sido guardada exitosamente."
          title="Preparación guardada"
        >
          <template v-slot:actions>
            <RouterLink :to="{ name: 'searchOrder' }">
              <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </RouterLink>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import OrderInfo from "../components/table/OrderInfo.vue";
import OrderTableFooter from "../components/table/OrderTableFooter.vue";
import ProductsOrderTable from "../components/table/ProductsOrderTable.vue";
import ProductsOrderTableSkeleton from "../components/skeletons/ProductOrderTableSkeleton.vue";
import { useRoute, useRouter } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted, watch, ref } from "vue";
import DeleteTableButton from "../components/buttons/DeleteTableButton.vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton,
    DeleteTableButton,
  },
  data() {
    return {
      newItem: {
        quantity: "",
        nbultos: 0,
        unidbultos: "",
        totalunidades: "",
        varios: "",
        name: "",
        price: "",
        input: true,
        checked: false,
        isNew: true,
        id: String(Date.now()).slice(-7),
      },
    };
  },
  setup() {
    const orderStore = useOrdersStore();
    const route = useRoute();
    const router = useRouter();
    const dialog = ref(false); // Utilizar ref para el estado del diálogo
    const ruta = route?.path?.split("/");

    const idasd = route.params.id;
    const goBack = () => {
      router.go(-1);
    };

    const orderSearch = () => {
      orderStore.updateOrder(idasd.value, body);
    };

    const save = (isSave) => {
      const localStorageParsed = JSON.parse(
        localStorage.getItem("order_line_items")
      );
      const newItem = {
        quantity: "",
        nbultos: 0,
        unidbultos: "",
        totalunidades: "",
        varios: "",
        name: "",
        price: "",
        input: true,
        checked: false,
        isNew: true,
        id: String(Date.now()).slice(-7),
      };
      if (!isSave) {
        orderStore?.orders[0]?.line_items.push({ ...newItem });
      }
      
            orderStore.updateOrder(idasd, { status: "completed" }); // Simulamos una actualización del pedido
/*             orderStore.updateOrder(idasd, { }); // Simulamos una actualización del pedido
 */       dialog.value = false; // Actualizar el estado del diálogo
    };

    const onChangeToLocalStorage = (e) => {
      const localStorageParsed = JSON.parse(
        localStorage.getItem("order_line_items")
      );
      if (e.target.name == "nbultos")
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
              [idasd]: orderStore?.orders[0],
            })
          );
        }
    };

    const onSaveClick = () => {
      save(true);
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
            [idasd]: orders[0],
          })
        );
      },
      { deep: true }
    );

    return {
      orderStore,
      dialog,
      save,
      onChangeToLocalStorage,
      onSaveClick,
      goBack,
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

.top-container {
  height: 10.4rem;
}

.delete-button {
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  width: 95%;
}

.sad {
  /*   padding-right: 28px; */
  width: 105%;
}
</style>
