<template>
  <div
    v-if= isDriver  >
  <!--   <v-btn class="edit-button" 
    color="primary"
    @click="dialog = true"
    > Subir comprobante de entrega 
    </v-btn> -->
     <DeliveredOrderDialog :id="id" />
  </div>
<!--   <v-file-input
    v-else-if="status == 'initial'"
    hide-details
    label="Subir comprobante de entrega"
    bg-color="primary"
    class="font-weight-black driver-button"
    height="36"
    variant="solo"
    accept="image/*,.pdf"
    @change="onChange"
  ></v-file-input> -->
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
import DeliveredOrderDialog from '../DeliveredOrderDialog.vue';

export default {
  props: ["route", "id", "content", "params", "isDriver", "onChange", "status"],
  components: {DeliveredOrderDialog}
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
