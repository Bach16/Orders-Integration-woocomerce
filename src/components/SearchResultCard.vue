<template>
  <v-card class="px-1 px-sm-3 tarjeta" flat>
    <v-row class="align-center" no-gutters>
      <v-col cols="12" md="4" sm="4" class="mb-2">
        <p class="font-weight-bold text-primary text-h6">Orden #{{ id }}</p>
        <p class="text-subtitle-1">Creada el: {{ formatDate(date) }}</p>
      </v-col>
      <v-col cols="12" md="8" sm="8"  class="mb-2 d-flex justify-sm-end justify-start">
        <h5 v-if="status == 'uploading'" class="edit-button" id="loaded-text">
          Cargando archivo...
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
            :isEditable="isEditable"
            :editableText="editableText"
          />
        </div>
      </v-col>
      <v-divider :thickness="1"  color="black"  class="mt-6 opacity-40"></v-divider>
    </v-row>
  </v-card>
</template>

<script>
import { onMounted, ref } from "vue";
import SearchCardButton from "./buttons/SearchCardButton.vue";
import { useOrdersStore } from "../stores/Orders";

export default {
  components: { SearchCardButton },
  props: [
    "route",
    "id",
    "content",
    "params",
    "isDriver",
    "onChange",
    "status",
    "date",
    "isEditable",
    "editableText"
  ],
  methods: {
    formatDate: (dateStr) => {
      if (!dateStr) return;
      const dateStr2 = dateStr?.slice(0, -9)?.replaceAll("-", "/");
      const [year, month, day] = dateStr2.split("/");
      return `${day}/${month}/${year}`;
    },
  },
  setup(props) {
    // Access the prop directly
    const id = ref(props.id);
    const ordersStore = useOrdersStore();
    const status = ref("initial"); // Possible values: 'initial', 'uploading', 'uploaded'

    const body = {
        meta_data: [
          {
            key: "estado_orden",
            value: "enviado",
          },
        ],
      };

    const onChange = (e) => {
      /* put file req */
      const file = e.target.files[0];
      if (file) {
        status.value = "uploading";
        ordersStore
          .uploadFile(file, id.value)
          .then(() => (status.value = "uploaded"));
        ordersStore.updateOrder(id.value,body)
      }
    };

   

    return {
      onChange,
      status,
      ordersStore,
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
