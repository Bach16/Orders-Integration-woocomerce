<template>
  <v-row no-gutters>
    <v-col cols="6">
      <!-- Observaciones -->
      <v-card
        class="pa-2 datos border-md border-primary border-opacity-50"
        height="100px"
        flat
      >
        <v-row no-gutters>
          <v-col cols="12">
            <p class="font-weight-bold">Observaciones</p>
          </v-col>
          <v-col cols="12" class="pb-1">
            <v-textarea
              class="mt-n4"
              v-if="modificable"
              @input="onChangeToLocalStorage"
              :id="_id"
              name="cantidad"
              :placeholder="comments"
              hide-details="auto"
              variant="plain"
              no-resize
              rows="2"
            />
            <v-card-text v-else class="mt-n4 ml-n4">{{ comments }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="5" offset="1">
      <!-- Totales N Bultos -->
      <v-card
        class="pa-2 mb-2 datos align-center border-md border-primary border-opacity-50"
        flat
        height="47px"
      >
        <v-row>
          <v-col cols="8" md="8" class="border-e-sm">
            <span class="ml-2 bold-text">Totales Nº de bultos </span>
          </v-col>
          <v-col cols="4" md="4" class="border-e-sm">
            <span>{{
              order?.meta_data[this.$findIndexByKey(order?.meta_data, "total_bultos")]
                .value
            }}</span>
          </v-col>
        </v-row>
      </v-card>

      <!-- Total caja de varios -->
      <v-card
        class="pa-2 datos align-center border-md border-primary border-opacity-50"
        flat
        height="47px"
      >
        <v-row class="align-center">
          <v-col cols="8" md="8" class="border-e-sm">
            <span class="ml-2 bold-text">Total cajas de varios </span>
          </v-col>
          <v-col cols="4" md="4" class="border-e-sm">            
            <span>{{
              order?.meta_data[this.$findIndexByKey(order?.meta_data, "total_caja_varios")]
                .value
            }}</span>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useOrdersStore } from "../../stores/Orders";

export default {
  props: ["order", "modificable", "_id", "comments"],
  setup() {
    const orderStore = useOrdersStore();
    const onChangeToLocalStorage = (e) => {
      orderStore.updateOrderComments(parseInt(e.target.id), e.target.value);
    };
    const onChangeTotalBoxes = (e) => {
      orderStore.updateOrderTotalBoxes(parseInt(e.target.id), e.target.value);
    };

    return {
      onChangeToLocalStorage,
      onChangeTotalBoxes,
    };
  },
};
</script>
