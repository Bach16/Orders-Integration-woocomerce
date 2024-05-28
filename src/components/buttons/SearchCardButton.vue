<template>
  <v-file-input
    v-if="(isDriver)"
    hide-details
    label="Subir comprobante de entrega"
    bg-color="primary"
    color="white"
    class="font-weight-black"
    height="36"
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
