<template>
  <v-container class="max-size mx-lg-16 mx-2 container">
    <div id="printMe">

    <v-row class="ms-2 my-6 align-center justify-start" no-gutters>
      <v-col cols="12">
        <GoBackButton />
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="bg-transparent">
          <h1 class="text-primary text-uppercase">Preparación de Pedido</h1>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <h2 class="text-start text-primary">
          Nº de Orden {{ orderStore?.orders[0]?.id }}
        </h2>
      </v-col>
    </v-row>

    <OrderInfo :order="orderStore?.orders[0]" />

    <!-- Tabla -->
    <ProductsOrderTableSkeleton
      :modificable="true"
      v-if="orderStore?.ordersLoading"
    />
    <div class="d-flex table-wrapper" v-else>
      <div class="table-container">
        <ProductsOrderTable
          :order="orderStore?.orders[0]"
          :modificable="true"
          :save="save"
          :onChangeToLocalStorage="onChangeToLocalStorage"
        />
      </div>

      <!-- Boton eliminar -->
      <div class="py-0 px-2 d-print-none">
        <div class="top-container"></div>
        <div
          v-for="(item, index) in orderStore?.orders[0]?.line_items"
          :key="item.id"
          class="d-flex flex-column"
        >
          <DeleteTableButton
            :onClick="orderStore?.deleteSubproduct"
            :id="item.id"
            v-if="!item?.total"
          />
          <div v-else>
            <AddRowButton :index="index" :save="save" :id="item.id" />
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

    <div class="mt-8 d-print-none">
      <v-row no-gutters class="align-center d-flex justify-center">
        

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

        <v-col cols="4" class="d-flex justify-center">
          <v-btn
            size="large"
            class="px-6"
            rounded="lg"
            color="primary"
            @click="dialog2 = true"
          >
            Guardar para despacho
          </v-btn>
        </v-col>

      </v-row>
    </div>

    <!-- Alerta de pedido actualizado -->
    <div class="text-center pa-4">
      <v-dialog v-model="dialog2" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="¿Estás seguro de que quieres guardar la información ingresada?"
          title="Preparación del Pedido"
        >
          <template v-slot:actions>
            <v-btn
              class="ms-auto mr-16 font-weight-bold"
              text="Regresar"
              @click="dialog2 = false"
            ></v-btn>
            <v-btn
              class="ms-auto mr-16 font-weight-bold"
              text="Guardar"
              @click="onSaveClick"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-content-save"
          text="La preparación del pedido ha sido guardada exitosamente."
          title="Preparación guardada"
        >
          <template v-slot:actions>
            <RouterLink :to="{ name: 'searchOrder' }">
              <v-btn
                class="ms-auto font-weight-bold"
                text="Ok"
                @click="dialog2 = false"
              ></v-btn>
            </RouterLink>
          </template>
        </v-card>
      </v-dialog>
    </div>
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
import { useAuthStore } from "../stores/Auth";

import { onMounted, watch, ref, onUnmounted } from "vue";
import DeleteTableButton from "../components/buttons/DeleteTableButton.vue";
import AddRowButton from "../components/buttons/AddRowButton.vue";
import GoBackButton from "../components/buttons/GoBackButton.vue";

export default {
  components: {
    OrderInfo,
    ProductsOrderTable,
    OrderTableFooter,
    ProductsOrderTableSkeleton,
    DeleteTableButton,
    AddRowButton,
    GoBackButton,
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
    },
  },
  setup() {
    const orderStore = useOrdersStore();
    const userStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const dialog = ref(false);
    const dialog2 = ref(false);
    const idasd = route.params.id;

    const save = (isSave, index, id) => {
      const localStorageData = { [idasd]: orderStore.orders[0] };
      /*  const newItem = {
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
      }; */
      const newItem = {
        idParent: id,
        id: parseInt(String(Date.now()).slice(-7)),
        name: "",
        input: true,
        quantity: "",
        meta_data: [
          {
            key: "nbultos",
            value: "",
          },
          {
            key: "unidbultos",
            value: "",
          },
          {
            key: "totalunidades",
            value: "",
          },
          {
            key: "varios",
            value: "",
          },
          {
            key: "supervised",
            value: "",
          },
          {
            key: "revisado",
            value: false,
          },
        ],
      };

      /* const saveMetadataLocalStorage = () => {
        orderStore.orders[0].line_items.map((e) => {
          return e.meta_data.map((i) => {
            return { ...i, display_value: "input", value: "input" };
          })[0];
        });
      }; */

      // Insertar un nuevo elemento si no se está guardando
      if (!isSave) {
        return orderStore?.orders[0]?.line_items.splice(index + 1, 0, newItem);
      }

      const orderId = route.params.id;
      // Verificar si hay datos válidos en el localStorage
      if (
        true
        /* localStorageData &&
        localStorageData[orderId] &&
        localStorageData[orderId].line_items */
      ) {
        const newArray = localStorageData[orderId].line_items.filter((e) => {
          return !!e.idParent;
        });
        const wocommerceProductsArray = localStorageData[
          orderId
        ].line_items.filter((e) => {
          return !e.idParent;
        });
        wocommerceProductsArray.map((e) => {
          return {
            value: (e.meta_data[6].value = newArray.filter((i) => {
              return i.idParent == e.id;
            })),
          };
        });

        const orderToUpdate = localStorageData[orderId].line_items.map((e) => {
          return {
            id: e.id,
            meta_data: e.meta_data,
          };
        });

        const superArray = orderToUpdate.filter((e) => {
          return !!e.meta_data[6];
        });
        const superArrays = superArray.map((e) => {
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
        const newArrayProducts = {
          line_items: superArrays,
          meta_data: [
            {
              key: "estado_orden",
              value: "preparado",
            },
          ],
        };
        if (
          localStorageData[orderId].meta_data[
            localStorageData[orderId].meta_data.length - 3
          ].value !== null
        )
          newArrayProducts.meta_data.push(
            localStorageData[orderId].meta_data[
              localStorageData[orderId].meta_data.length - 3
            ]
          );
        if (
          localStorageData[orderId].meta_data[
            localStorageData[orderId].meta_data.length - 2
          ].value !== null
        )
          newArrayProducts.meta_data.push(
            localStorageData[orderId].meta_data[
              localStorageData[orderId].meta_data.length - 2
            ]
          );

        // Enviar la orden actualizada al store fusionando los datos recuperados con la orden existente
        const res = orderStore.updateOrder(idasd, newArrayProducts);
        res.then((r) => {
          localStorage.removeItem("order_line_items");
        });
      } else {
        // Si no hay datos válidos en el localStorage, simplemente actualizar el estado de la orden
        orderStore.updateOrder(idasd, { status: "completed" });
      }

      dialog.value = true;
    };

    const onChangeToLocalStorage = (e) => {
      if (e.target.name === "nbultos") {
        orderStore.updateTotalNBultos(orderStore?.orders[0]?.line_items);
      }
    };

    const onSaveClick = () => {
      save(true);
    };

    const onSaveClick2 = () => {
      save(true);
    };

    onMounted(() => {
      if (!localStorage.getItem("rol")) {
        return router.push("/");
      } else if (!localStorage.getItem("token")) {
        return router.push("/");
      } else if (localStorage.getItem("rol") !== "bodeguero") {
        return router.push("/searchOrder");
      }
      if (orderStore?.orders[0]?.id !== route.params.id) {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(
            id,
            route.path.split("/")[1],
            localStorage.getItem("rol")
          );
        }
      }
      userStore.checkUser(userStore.user);
    });
    onUnmounted(() => {
      orderStore.cleanOrder();
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
      dialog2,
      save,
      onChangeToLocalStorage,
      onSaveClick,
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
