<template>
  <div v-if="isDriver">
    <DeliveredOrderDialog :id="id" :editableText="editableText" :isEditable="isEditable" />
  </div>

  <RouterLink
    v-else-if="isEditable == true"
    :to="params ? { name: route, params: { id: id } } : { name: route }"
  >
    <div class="d-flex align-center">
      <p class="mr-10 font-weight-bold">{{ editableText }}</p>
      <v-btn color="primary" height="36"  class="pa-6 d-flex align-center">
        Editar orden
      </v-btn>
    </div>
  </RouterLink>

  <RouterLink
    v-else
    :to="params ? { name: route, params: { id: id } } : { name: route }"
  >
    <v-btn color="primary" height="36" class="pa-6 d-flex align-center">
      {{ content }}
    </v-btn>
  </RouterLink>
</template>
<script>
import { RouterLink } from "vue-router";
import DeliveredOrderDialog from "../DeliveredOrderDialog.vue";

export default {
  props: [
    "route",
    "id",
    "content",
    "params",
    "isEditable",
    "editableText",
    "isDriver",
  ],
  components: { DeliveredOrderDialog },
};
</script>

<style>
.edit-button {
  display: flex;
  align-self: end;
  justify-self: end;
  place-self: end;
  min-height: 56px;
}
.driver-button {
  min-width: 376px;
}
</style>
