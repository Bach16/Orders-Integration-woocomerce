<template>
  <v-card flat>
    <div class="d-lg-flex align-center" v-if="isEditable == true">
      <p class="mr-10 font-weight-bold">{{ editableText }}</p>
      <v-btn
        class="edit-button"
        color="primary"
        text="Editar comprobante de entrega"
        @click="onClick"
        width="320"
      ></v-btn>
    </div>

    <div v-else>
      <v-btn
        class="edit-button"
        color="primary"
        text="Subir comprobante de entrega"
        @click="onClick"
        width="320"
      ></v-btn>
    </div>

    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <div class="pa-8">
          <v-row>
            <v-col cols="12" class="mb-n6">
              <span class="text-black text-h4 font-weight-bold"
                >Factura {{ id }}</span
              >
            </v-col>
            <v-col cols="12" class="mb-n1">
              <span class="text-black text-h6">
                Pedido para: {{ orderInfo[0]?.billing?.first_name }}
                {{ orderInfo[0]?.billing?.last_name }}</span
              >
            </v-col>

            <v-col cols="12" class="mb-n5">
              <span class="text-black text-h6 font-weight-bold">
                Sube tu comprobante de entrega:
              </span>
            </v-col>

            <v-col cols="6" class="mb-n5">
              <span class="text-primary text-center font-weight-medium">
                {{
                  getOrderUrl(
                    this.$findValueByKey(
                      orderInfo[0]?.meta_data,
                      "_doc_file_url"
                    )
                  )
                }}
              </span>
            </v-col>

            <v-col cols="6" class="mb-n5 d-flex justify-end">
              <a
                v-if="
                  this.$findValueByKey(orderInfo[0]?.meta_data, '_doc_file_url')
                "
                href="#"
                @click.prevent="
                  downloadImage(
                    $event,
                    this.$findValueByKey(
                      orderInfo[0].meta_data,
                      '_doc_file_url'
                    ),
                    getOrderUrl(
                      this.$findValueByKey(
                        orderInfo[0].meta_data,
                        '_doc_file_url'
                      )
                    )
                  )
                "
                class="text-primary cursor-pointer font-weight-medium text-decoration-underline"
                >Descargar el comprobante
              </a>
            </v-col>

            <v-col cols="12" class="mt-4">
              <v-card
                flat
                class="filee border-primary border-dashed border-opacity-100 border-sm"
              >
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="5" class="d-flex align-center justify-center">
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      color="primary "
                      class="mt-4 py-10"
                      min-height="500px"
                    >
                    </v-progress-circular>
                    <v-file-input
                      v-else
                      class="ml-2 pa-4 text-primary text-opacity-100 font-weight-black"
                      prepend-icon="mdi-upload"
                      label="Click aqui para subir"
                      bg-color="#f2f4f7"
                      color="background"
                      variant="plain"
                      accept="image/*,.pdf"
                      @change="onFileChange"
                    ></v-file-input>
                  </v-col>

                  <!-- <v-col cols="12" class="d-flex justify-center ">
                    <span class="text-primary text-center font-weight-bold">Documento:</span>
                  </v-col> -->
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-card-actions class="px-9 mt-n4 mb-4">
          <v-btn
            text="Cerrar"
            variant="outlined"
            class="pa-6 d-flex align-center"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            class="bg-primary pa-6 d-flex align-center"
            color="white"
            text="Guardar"
            @click="onSave"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { ref } from "vue";
import { useOrdersStore } from "../stores/Orders";
import { useRoute } from "vue-router";

export default {
  props: ["id", "isEditable", "editableText"],
  methods: {
    getOrderUrl(url) {
      if (!url) {
        return "Ningun comprobante subido";
      }
      const urlSplit = url.split("/");

      return "Comprobante subido: " + url.split("/")[urlSplit.length - 1];
    },
    async downloadImage(event, url, filename) { 
      event.preventDefault(); 
      try { // ---------- esto da error de CORS -----
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "order-image.jpg"; // Adjust filename if necessary
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup(props) {
    const orderStore = useOrdersStore();
    const dialog = ref(false);
    const id = ref(props.id);
    const loading = ref(false);
    const route = useRoute();
    const ruta = route?.path?.split("/"); 

    let orderInfo = ref(
      orderStore.SearchOrder.filter((e) => {
        return e.id == id.value;
      })
    );

    const onClick = () => {
      dialog.value = true;
      let dynamicOrders = orderStore.ordersList
        ? orderStore.ordersList
        : orderStore.SearchOrder;
      const newArray = dynamicOrders.filter((e) => {
        return e.id == id.value;
      });
      return (orderInfo = newArray);
    };

    const onFileChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          await orderStore.updateFile(file);
        } catch (e) {
          error.value = e.message;
        }
      }
    };

    const onSave = () => {
      if (orderStore.file) {
        loading.value = true;

        const body = {
          meta_data: [
            {
              key: "estado_orden",
              value: "enviado",
            },
          ],
        };
        try {
          orderStore
            .uploadFile(orderStore.file, id.value)
            .then(() => {
              loading.value = false;
              orderStore.updateOrder(id.value, body);
              dialog.value = false;
            })
            .then(() => {
              orderStore.getOrders("", ruta[1], localStorage.getItem("rol"));
            });
        } catch (e) {
          error.value = e.message;
        }
      }
    };

    return {
      id,
      onClick,
      dialog,
      onFileChange,
      onSave,
      orderInfo,
      loading,
    };
  },
};
</script>

<style>
.filee {
  background-color: #f2f4f7;
}

.v-file-input__text {
  text-align: center;
}
</style>
