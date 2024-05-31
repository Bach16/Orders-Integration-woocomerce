<template>
  <v-btn v-if="status=='uploaded'" class="edit-button" color="primary" > Editar </v-btn>
  <v-file-input
    v-else-if="status=='initial'"
    hide-details
    label="Subir comprobante de entrega"
    bg-color="primary"
    class="font-weight-black driver-button"
    height="36"
   variant="solo"
    accept="image/*,.pdf"
    @change="onChange"
  ></v-file-input>
  <RouterLink
    v-else
    :to="params ? { name: route, params: { id: id } } : { name: route }"
  >
    <v-btn color="primary" height="36"> {{ content }} </v-btn>
  </RouterLink>
</template>
<script>
export default {
  props: ["route", "id", "content", "params", "isDriver", "onChange","status"], 
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
