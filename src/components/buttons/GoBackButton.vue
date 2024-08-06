<template>
  <v-col cols="12">
    <div
      @click="dialog = true"
      class="mb-3 cursor-pointer d-flex text-subtitle-1 reset-a d-print-none"
    >
      <v-icon
        icon="mdi-arrow-left-bold-circle-outline"
        color="primary"
        start
      ></v-icon>
      <p class="text-primary">Regresar</p>
    </div>
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-exit-to-app"
        text="¿Estás seguro de que deseas regresar? Los cambios que has realizado no se guardarán."
        title="Regresar"
        class="custom-icon-color"
      >
        <template v-slot:actions>
          <RouterLink :to="{ name: 'searchOrder' }">
            <v-btn
              class="btn-dialog ml-4"
              text="Salir"
              @click="dialog = false"
            ></v-btn>
          </RouterLink>
          <v-btn
            class="ms-auto mr-6 btn-dialog"
            text="Cancelar"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
