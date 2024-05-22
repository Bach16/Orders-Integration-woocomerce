<template>
  <v-container class="container">
    <v-row align="center" class="pa-6" no-gutters>
      <v-col cols="8">
        <v-sheet class="bg-transparent">
          <h1>Entregado</h1>
        </v-sheet>
      </v-col>
      <v-col cols="3" offset="1">
        <p>Nº de proceso</p>
      </v-col>
    </v-row>

    <v-card class="ms-2 pl-3 pt-4 pb-6 tarjeta" elevation="8">
      <v-row align="center" class="pa-2" no-gutters>
        <v-col cols="8">
          <v-text-field
            hide-details
            append-inner-icon="mdi-magnify"
            label="Buscar pedido"
            variant="outlined"
            height="56"
          />
        </v-col>
        <v-col cols="4">
          <v-btn class="ml-5" color="primary" height="56"> Buscar </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-sheet class="pa-6 mt-3 bg-transparent">
      <h2>Resultados</h2>
    </v-sheet>

    <v-card class="ms-2 pa-3 tarjeta" elevation="8">
      <v-row align="center" class="pa-2" no-gutters>
        <v-col cols="8">
          <p class="text-order">Pedido N° {{ orderStore?.orders[0]?.id }}</p>
        </v-col>
        <v-col cols="4">
          <v-file-input
            hide-details
            accept="image/*"
            label="Subir comprobante de entrega"
            bg-color="primary"
            color="white"
            class="font-weight-black"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center mt-8">
      <v-btn
        class="ms-2 my-6"
        align="center"
        color="primary"
        @click="dialog = true"
        height="56"
      >
        Actualizar
      </v-btn>
    </div>

    <template>
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-content-save"
            text="La información del pedido ha sido actualizada exitosamente."
            title="Pedido Actualizado"
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
import { useRoute } from "vue-router";
import { useOrdersStore } from "../stores/Orders";
import { onMounted } from "vue";

export default {
  data: () => ({
    loaded: false,
    loading: false,
    dialog: false,
  }),
  setup() {
    const route = useRoute();
    const orderStore = useOrdersStore();

    if (orderStore?.orders[0]?.id !== route.params.id) {
      onMounted(() => {
        const id = route.params.id;
        if (id) {
          orderStore.getOrders(id);
        }
      });
    }

    return {
      orderStore,
    };
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.text-order {
  font-size: 20px;
  font-weight: 600;
}
</style>
