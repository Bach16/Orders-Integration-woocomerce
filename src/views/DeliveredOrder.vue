<template>
  <v-container class="max-size mx-lg-16 mx-2 container">
    <v-row align-center class="pa-6" no-gutters>
      <v-col cols="12">
        <GoBackButton />
      </v-col>

      <v-col cols="8">
        <v-sheet class="bg-transparent">
          <h1 class="text-primary text-uppercase">Entregado</h1>
        </v-sheet>
      </v-col>
    </v-row>

    <v-card class="ms-2 my-5 pl-3 pt-4 pb-6 align-center rounded-xl">
      <v-row class="pa-2 align-center justify-space-between" no-gutters>
        <v-col
          lg="4"
          md="4"
          sm="6"
          class="d-flex justify-lg-center justify-sm-start"
        >
          <span class="font-weight-bold text-h6 text-primary"
            >Nombre: {{ orderStore?.orders[0]?.id }}</span
          >
        </v-col>
        <v-col
          lg="4"
          md="4"
          sm="6"
          class="d-flex justify-lg-center justify-sm-start"
        >
          <span class="font-weight-bold text-h6 text-primary"
            >Factura #{{ orderStore?.orders[0]?.id }}</span
          >
        </v-col>
        <v-col
          lg="4"
          md="4"
          sm="6"
          class="d-flex justify-lg-center justify-sm-start"
        >
          <span class="font-weight-bold text-h6 text-primary"
            >Documento: {{ orderStore?.orders[0]?.id }}</span
          >
        </v-col>
      </v-row>
    </v-card>

    <v-card
      flat
      class="mt-5 ms-2 pa-9 rounded-xl flat border-primary border-opacity-100 border-sm"
    >
      <v-row class="pa-2 align-center justify-center" no-gutters>
        <v-col lg="4" md="6" sm="12">
          <v-file-input
            class="text-primary text-opacity-100 font-weight-black"
            hide-details
            label="Editar comprobante de entrega"
            prepend-icon="mdi-upload"
            bg-color="white"
            color="primary"
            variant="plain"
            accept="image/*,.pdf"
            @change="onFileChange"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-center mt-6">
            <!-- Show a progress indicator while the data is loading -->
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary align center"
              class="mt-4"
            ></v-progress-circular>

            <!-- Show the image if the URL is available -->
            <v-img
              v-if="imageUrl"
              :src="imageUrl"
              max-width="300"
              max-height="300"
              class="mt-4 align-center"
            ></v-img>

            <!-- Show an error message if there is an error -->
            <div v-if="error" class="mt-4 text-red">
              {{ error }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="text-center mt-8">
      <v-btn align-center color="primary" @click="onFileChange">
        Guardar
      </v-btn>
    </div>

    <template>
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-content-save"
            text="El comprobante ha sido guardado exitosamente."
            title="Comprobante Guardado"
             class="custom-icon-color"

          >
            <template v-slot:actions>
              <RouterLink :to="{ name: 'searchOrder' }">
                <v-btn
                  class="btn-dialog ms-auto mr-6"
                  text="Ok"
                  @click="dialog = false"
                ></v-btn>
              </RouterLink>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-container>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { computed, onMounted, ref } from "vue";
import GoBackButton from "../components/buttons/GoBackButton.vue";

export default {
  components: {
    GoBackButton,
  },
  data: () => ({
    dialog: false,
  }),
  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderStore = useOrdersStore();
    const status = ref("initial"); // Possible values: 'initial', 'uploading', 'uploaded'
    const loading = ref(true);
    const error = ref(null);
    const id = route.params.id;


    onMounted(async () => {
      // Check for authentication
      if (!localStorage.getItem("rol") || !localStorage.getItem("token") || localStorage.getItem("rol") !== "conductor") {
        router.push("/");
        return;
      }

      // Fetch orders if the ID doesn't match
      if (id && (!orderStore.orders[0] || orderStore.orders[0].id !== id)) {
        try {
          await orderStore.getOrders(id, localStorage.getItem("rol"));
        } catch (e) {
          error.value = e.message;
        } finally {
          loading.value = false;
        }
      } else {
        loading.value = false;
      }
    });

     const onFileChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        status.value = "uploading";
        loading.value = true;
        try {

          await orderStore.uploadFile(file, id);
          status.value = "uploaded";
          // Refresh the orders to get the updated image URL
          await orderStore.getOrders(id, localStorage.getItem("rol"));
          loading.value = false;
        } catch (e) {
          error.value = e.message;
        }
      } 

    }

    
    // Compute the image URL
    const imageUrl = computed(() => {
      const fileUrl = orderStore.orders[0]?.meta_data[0]?.value;
      orderStore.updateFile(fileUrl)

      return orderStore.orders[0]?.meta_data[0]?.value || null;
    });
    return {
      imageUrl,
      loading,
      error,
      orderStore,
      onFileChange,
    };
  },
}
</script>
<style>
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
