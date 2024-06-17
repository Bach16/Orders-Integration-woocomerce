<template>
  <div class="d-flex align-center" v-if="isEditable == true">
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
export default {
  props: ["route", "id", "content", "params", "isEditable", "editableText"],
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
