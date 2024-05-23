<template>
  <v-row class="align-start ms-2" no-gutters>
    <v-col cols="6">
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
            <v-card-text v-else class="mt-n4 ml-n4">{{
              order?.comments
            }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="5" offset="1">
      <v-card
        class="pa-2 datos align-center border-md border-primary border-opacity-50"
        height="50px" 
        flat
      >
      <v-row>
        <v-col cols="12" md="12" class="border-t-sm border-e-sm">
          <span class="bold-text">Provincia: </span>
        </v-col>
      </v-row>
        <v-spacer />
        <p>Totales Nº de bultos</p>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useOrdersStore } from "../stores/Orders";

export default {
  props: ["order", "modificable", "_id", "comments"],
  setup() {
    const orderStore = useOrdersStore();
    const onChangeToLocalStorage = (e) => {
      orderStore.updateOrderComments(parseInt(e.target.id), e.target.value);
    };
    return {
      onChangeToLocalStorage,
    };
  },
};
</script>
