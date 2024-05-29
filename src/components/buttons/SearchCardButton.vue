<template>
  <v-file-input
    v-if="(isDriver)"
    hide-details
    label="Subir comprobante de entrega"
    bg-color="primary"
    class="font-weight-black"
    height="36"
    variant="solo"
    accept="image/*,.pdf"
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
  props: ["route", "id", "content", "params","isDriver"],
};
</script>
