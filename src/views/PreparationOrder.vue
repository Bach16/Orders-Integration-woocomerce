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
            :modificable="isModificable"
            :save="save"
            :onChangeToLocalStorage="onChangeToLocalStorage"
            :disabled="true"
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
        :comments="
          orderStore?.orders[0]?.meta_data[
            this.$findIndexByKey(
              orderStore?.orders[0]?.meta_data,
              `custom_order_comments`
            )
          ]?.value
        "
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
              Enviar para despacho
            </v-btn>
          </v-col>

          <v-col cols="4" class="d-flex justify-center">
            <v-btn
              size="large"
              class="px-6"
              rounded="lg"
              color="primary"
              @click="dialog3 = true"
            >
              Guardar cambios
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Alerta de pedido actualizado -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog2" persistent width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-content-save"
            text="¿Estás seguro de que quieres guardar la información ingresada?"
            title="Preparación del Pedido"
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
            text="La preparación del pedido ha sido guardada exitosamente."
            title="Preparación guardada"
            class="custom-icon-color"
          >
            <template v-slot:actions>
              <RouterLink :to="{ name: 'searchOrder' }">
                <v-btn
                  class="ms-auto mr-6 btn-dialog"
                  text="Ok"
                  @click="dialog = false"
                ></v-btn>
              </RouterLink>
            </template>
          </v-card>
        </v-dialog>
      </div>

      <!-- Alerta de pedido no despachado -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog3" persistent width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-content-save"
            text="La información se guardará, pero el pedido no se enviará a despacho. ¿Estás seguro de que deseas continuar?"
            title="Guardar cambios"
            class="custom-icon-color"
          >
            <template v-slot:actions>
              <v-btn
                class="btn-dialog ml-4"
                text="Regresar"
                @click="dialog3 = false"
              ></v-btn>
              <v-btn
                class="ms-auto mr-6 btn-dialog"
                text="Guardar"
                @click="onSaveClick2"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>

      <!-- Alerta de filas vacias -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog4" persistent width="auto" color="primary">
          <v-card
            max-width="400"
            prepend-icon="mdi-alert-circle"
            text="Existen filas vacías. Cada fila debe tener al menos un valor agregado."
            title="Error"
            class="custom-icon-color"
          >
            <template v-slot:actions>
              <v-btn
                class="btn-dialog ms-auto mr-6"
                text="Regresar"
                @click="dialog4 = false"
              ></v-btn>
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
import { findIndexByKey, findValueByKey } from "../plugins/util";

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
      const beforePrint = async () => {
        this.isDisabled = true;
        this.isModificable = false;
      };
      beforePrint()
        .then(() => this.$htmlToPaper("printMe"))
        .then(() => {
          this.isDisabled = false;
          this.isModificable = true;
        });
    },
  },
  setup() {
    const orderStore = useOrdersStore();
    const userStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const dialog = ref(false);
    const dialog2 = ref(false);
    const dialog3 = ref(false);
    const dialog4 = ref(false);
    const isDisabled = ref(false);
    const isModificable = ref(true);
    const idasd = route.params.id;

    const save = (isSave, isSend, index, id) => {
      const localStorageData = { [idasd]: orderStore.orders[0] };

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

        try {
          superArrays.forEach((item, index) => {
            const keysToCheck = [
              "nbultos",
              "unidbultos",
              "totalunidades",
              "varios",
            ];
            const allEmpty = keysToCheck.every((key) => {
              return item.meta_data.some(
                (meta) => meta.key === key && meta.value === ""
              );
            });

            if (allEmpty) {
              throw new Error(`La fila no esta llena`);
            }

            const subProductsMeta = item.meta_data.find(
              (meta) => meta.key === "subProducts"
            );

            if (
              subProductsMeta &&
              Array.isArray(subProductsMeta.value) &&
              subProductsMeta.value.length > 0
            ) {
              subProductsMeta.value.forEach((subProduct) => {
                const subAllEmpty = keysToCheck.every((key) => {
                  return subProduct.meta_data.some(
                    (meta) => meta.key === key && meta.value === ""
                  );
                });
                if (subAllEmpty) {
                  throw new Error(`El subproducto no esta lleno`);
                }
              });
            }
          });

          console.log("todos las filas estan llenas");

          let newArrayProducts = [];

          if (isSend) {
            newArrayProducts = {
              line_items: superArrays,
              meta_data: [
                {
                  key: "estado_orden",
                  value: "preparado",
                },
                {
                  key: "total_caja_varios",
                  value: findValueByKey(
                    orderStore.orders[0]?.meta_data,
                    "total_caja_varios"
                  ),
                },
              ],
            };
          } else {
            newArrayProducts = {
              line_items: superArrays,
              meta_data: [
                {
                  key: "estado_orden",
                  value: "por despachar",
                },
                {
                  key: "total_caja_varios",
                  value: findValueByKey(
                    orderStore.orders[0]?.meta_data,
                    "total_caja_varios"
                  ),
                },
              ],
            };
          }

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

          if (
            !!localStorageData[orderId]?.meta_data[
              findIndexByKey(
                localStorageData[orderId]?.meta_data,
                "custom_order_comments"
              )
            ]?.value
          ) {
            newArrayProducts.meta_data.push(
              localStorageData[orderId]?.meta_data[
                findIndexByKey(
                  localStorageData[orderId]?.meta_data,
                  "custom_order_comments"
                )
              ]
            );
          } else {
            newArrayProducts.meta_data.push(
              localStorageData[orderId]?.meta_data[
                findIndexByKey(
                  localStorageData[orderId]?.meta_data,
                  "custom_order_comments"
                )
              ]
            );
          }

          // Enviar la orden actualizada al store fusionando los datos recuperados con la orden existente

          const res = orderStore.updateOrder(idasd, newArrayProducts);
          res.then((r) => {
            localStorage.removeItem("order_line_items");
          });

          dialog.value = true;
        } catch (error) {
          console.error(error.message);
          dialog4.value = true;
          dialog2.value = false;
          dialog3.value = false;
        }
      } else {
        // Si no hay datos válidos en el localStorage, simplemente actualizar el estado de la orden
        orderStore.updateOrder(idasd, { status: "completed" });
      }
    };

    const onChangeToLocalStorage = (e) => {
      if (e.target.name === "nbultos") {
        orderStore.updateTotalNBultos(orderStore?.orders[0]?.line_items);
      }
      if (e.target.name === "varios") {
        orderStore.updateTotalVarios(orderStore?.orders[0]?.line_items);
      }
    };

    const onSaveClick = () => {
      save(true, true);
    };

    const onSaveClick2 = () => {
      save(true, false);
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
      isModificable,
      isDisabled,
      orderStore,
      dialog,
      dialog2,
      dialog3,
      dialog4,
      save,
      onChangeToLocalStorage,
      onSaveClick,
      onSaveClick2,
    };
  },
};
</script>

<style>
.custom-icon-color .v-card-item__prepend .v-icon {
  color: #263d8d;
}

.btn-dialog {
  background-color: #263d8d;
  color: white;
  margin-bottom: 10px;
}

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
