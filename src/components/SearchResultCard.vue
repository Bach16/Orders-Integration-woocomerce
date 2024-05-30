<template>
  <v-card class="my-4 pa-3 tarjeta">
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="4">
        <p>Factura #{{ id }}</p>
      </v-col>
      <v-col cols="8" class="d-flex justify-center justify-md-end">
        {{ console.log(status) }}
        <h5 v-if="status == 'uploading'" class="edit-button" id="loaded-text">
          Archivo cargado 👍
        </h5>
        <div v-else id="driver-button">
          <SearchCardButton
            :id="id"
            :route="route"
            :content="content"
            :params="params"
            :isDriver="isDriver"
            :onChange="onChange"
            :status="isDriver && status"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { onMounted, ref } from "vue";
import SearchCardButton from "./buttons/SearchCardButton.vue";
import { useOrdersStore } from "../stores/Orders";

export default {
  components: { SearchCardButton },
  props: ["route", "id", "content", "params", "isDriver", "onChange", "status"],
  setup() {
    const status = ref("initial"); // Possible values: 'initial', 'uploading', 'uploaded'

    const onChange = (e) => {
      /* put file req */
      const file = e.target.files[0];
      if (file) {
        status.value = "uploading";
        setTimeout(() => {
          status.value = "uploaded";
        }, 2000);
      }
    };
    return {
      onChange,
      status,
    };
  },
};
</script>

<style>

.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
}
</style>
