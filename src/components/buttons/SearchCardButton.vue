<template>
  <div v-if="isDriver">
    <DeliveredOrderDialog :isDriver="isDriver"/>
  </div>
  <div class="d-flex align-center" v-else-if="isEditable == true">
    <p class="mr-10 font-weight-bold">{{ editableText }}</p>
      <v-btn color="primary" height="36" class="pa-6 d-flex align-center">
        Editar orden
      </v-btn>
  </div>
  <v-btn v-else color="primary" height="36" class="pa-6 d-flex align-center">
    {{ content }}
  </v-btn>
</template>
<script>
import DeliveredOrderDialog from '../DeliveredOrderDialog.vue';

export default {
  props: ["route", "id", "content", "params", "isEditable", "editableText","isDriver"],
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
