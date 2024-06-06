<template>
  <v-container class="mx-lg-16 mx-2 container">
    <v-row class="ms-2 my-6 align-center justify-start" no-gutters>
      <v-col cols="12">
        <div @click="goBack" class="mb-3 cursor-pointer d-flex text-subtitle-1 reset-a">
          <v-icon icon="mdi-arrow-left-bold-circle-outline" color="primary" start></v-icon>
          <p class="text-primary">Regresar</p>
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
    <ProductsOrderTableSkeleton :modificable="true" v-if="orderStore?.ordersLoading" />
    <div class="d-flex table-wrapper" v-else>
      <div class="table-container">
        <ProductsOrderTable :order="orderStore?.orders[0]" :modificable="true" :newItem="newItem" :save="save"
          :onChangeToLocalStorage="onChangeToLocalStorage" />
      </div>

      <!-- Boton eliminar -->
      <div class="py-0 px-2">
        <div class="top-container"></div>
        <div v-for="item, index in orderStore?.orders[0]?.line_items" :key="item.id" class="d-flex flex-column">
          <DeleteTableButton :onClick="orderStore?.deleteSubproduct" :id="item.id" v-if="item?.isNew" />
          <div v-else>
            <AddRowButton :index="index" :save="save" />
          </div>
        </div>
      </div>
    </div>

    <OrderTableFooter :order="orderStore?.orders[0]" :modificable="true" :_id="orderStore?.orders[0]?.id"
      :comments="orderStore?.orders[0]?.comments" />

    <div class="text-center mt-8">
      <v-btn size="large" class="px-6" rounded="lg" color="primary" @click="onSaveClick">
        Guardar para despacho
      </v-btn>
    </div>

    <!-- Alerta de pedido actualizado -->
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-content-save"
          text="La preparación del pedido ha sido guardada exitosamente." title="Preparación guardada">
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
import AddRowButton from "../components/buttons/AddRowButton.vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton,
    DeleteTableButton,
    AddRowButton
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
        supervised: "",
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
    const dialog = ref(false);
    const idasd = route.params.id;

    const goBack = () => {
      router.go(-1);
    };

    const save = (isSave, index) => {
  const newItem = {
    quantity: "",
    nbultos: 0,
    unidbultos: "",
    totalunidades: "",
    varios: "",
    name: "",
    supervised: "",
    input: true,
    checked: false,
    isNew: true,
    id: String(Date.now()).slice(-7),
  };

  // Insertar un nuevo elemento si no se está guardando
  if (!isSave) {
    orderStore?.orders[0]?.line_items.splice(index + 1, 0, newItem);
  }

  const orderId = route.params.id;
  const localStorageData = JSON.parse(localStorage.getItem("order_line_items"));

  // Verificar si hay datos válidos en el localStorage
  if (localStorageData && localStorageData[orderId] && localStorageData[orderId].line_items) {
    const orderToUpdate = {
      ...orderStore.orders[0], // Copiar todos los campos de la orden actual
      line_items: localStorageData[orderId].line_items // Reemplazar solo los line_items
    };

    // Enviar la orden actualizada al store fusionando los datos recuperados con la orden existente
    orderStore.updateOrder(idasd, orderToUpdate);
  } else {
    // Si no hay datos válidos en el localStorage, simplemente actualizar el estado de la orden
    orderStore.updateOrder(idasd, { status: "completed" });
  }

  dialog.value = true;
};


    const onChangeToLocalStorage = (e) => {
      const localStorageParsed = JSON.parse(localStorage.getItem("order_line_items"));
      const id = route.params.id;
      if (e.target.name === "nbultos") {
        if (!localStorageParsed) {
          localStorage.setItem("order_line_items", JSON.stringify({ [id]: orderStore?.orders[0] }));
        } else {
          localStorage.setItem("order_line_items", JSON.stringify({
            ...localStorageParsed,
            [id]: orderStore?.orders[0],
          }));
        }
      }
    };

    const onSaveClick = () => {
      save(true);
    };

    onMounted(() => {
      if (orderStore?.orders[0]?.id !== route.params.id) {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id, route.path.split("/")[1]);
        }
      }
    });

    watch(
      () => orderStore.orders,
      (orders) => {
        const id = route.params.id;
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("order_line_items")),
            [id]: orders[0],
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

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}

.top-container {
  height: 5.1rem;
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

.table-wrapper {
  width: 105%;
}
</style>
