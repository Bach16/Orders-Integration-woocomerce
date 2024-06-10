<template>
  <v-container class="mx-lg-16 mx-2 container">
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
          class="d-flex justify-lg-center justify-sm-start pt-lg-0 pt-sm-4"
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
      <v-row class="pa-2 justify-center" no-gutters>
        <v-col lg="3" md="6" sm="12">
          <v-file-input
            class="text-primary text-opacity-100 font-weight-black"
            hide-details
            label="Subir comprobante de entrega"
            prepend-icon="mdi-upload"
            bg-color="white"
            color="primary"
            variant="plain"
            accept="image/*,.pdf"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center mt-8">
      <v-btn align-center color="primary" @click="dialog = true">
        Guardar
      </v-btn>
    </div>

    <template>
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-content-save"
            text="El comprobante ha sido guardado exitosamente."
            title="Comprobante Guardado"
          >
            <template v-slot:actions>
              <RouterLink :to="{ name: 'searchOrder' }">
                <v-btn
                  class="ms-auto"
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
import { onMounted } from "vue";
import GoBackButton from "../components/buttons/GoBackButton.vue"


export default {
  components: {
    GoBackButton
  },
  data: () => ({
    dialog: false,
  }),
  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderStore = useOrdersStore();

    onMounted(() => {
      if (!localStorage.getItem("rol").length) {
        return router.push("/");
      } else if (localStorage.getItem("rol") !== "conductor") {
        return router.push("/searchOrder");
      }
    });
    if (orderStore?.orders[0]?.id !== route.params.id) {
      onMounted(() => {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id,localStorage.getItem("rol"));
        }
      });
    }

    return {
      orderStore,
    };
  },

};
</script>
