<template>
  <v-card flat>
    <div>
      <v-btn
        class="edit-button"
        color="primary"
        text="Subir comprobante de entrega"
        @click="onClick"
      ></v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="800">
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
                Pedido para: {{ orderInfo[0].billing.first_name }}
                {{ orderInfo[0].billing.last_name }}</span
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
                      orderInfo[0].meta_data,
                      "_doc_file_url"
                    )
                  )
                }}
              </span>
            </v-col>

            <v-col cols="6" class="mb-n5 d-flex justify-end">
              <a
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
                    <v-file-input
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
import axios from "axios";

export default {
  props: ["id"],
  methods: {
    getOrderUrl(url) {
      if (!url) {
        return "Ningun comprobante subido";
      }
      const urlSplit = url.split("/");

      return "Comprobante subido: " + url.split("/")[urlSplit.length - 1];
    },
    downloadImage(event, url, filename) {
      event.preventDefault();
      /* 
        
      fetch(url)
        .then(response => {
          console.log(response,"asd");
          response.blob()})
        .then((blob) => {
          const link = document.createElement("a");
          const urlBlob = window.URL.createObjectURL(blob);
          link.href = urlBlob;
          link.download = filename;
          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);

          window.URL.revokeObjectURL(urlBlob);
        })
        .catch((error) => {
          console.log("error");
        }); */

    },
  },
  setup(props) {
    const orderStore = useOrdersStore();
    const dialog = ref(false);
    const id = ref(props.id);
    let orderInfo = ref(
      orderStore.ordersList.filter((e) => {
        return e.id == id.value;
      })
    );

    const onClick = () => {
      dialog.value = true;
      const newArray = orderStore.ordersList.filter((e) => {
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
        const body = {
          meta_data: [
            {
              key: "estado_orden",
              value: "enviado",
            },
          ],
        };
        try {
          orderStore.updateOrder(id.value, body);
          orderStore
            .uploadFile(orderStore.file, id.value)
            .then(() => (dialog.value = false));
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
