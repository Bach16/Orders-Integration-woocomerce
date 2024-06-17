<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="edit-button"
          color="primary"
          text="Subir comprobante de entrega"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card>
        <div class="pa-8">
          <v-row>
            <v-col cols="12" class="mb-n6">
              <span class="text-black text-h4 font-weight-bold"
                >Factura #16926</span
              >
            </v-col>
            <v-col cols="12" class="mb-n1">
              <span class="text-black text-h6">
                Pedido para: Libreria y Papeleria Z</span
              >
            </v-col>

            <v-col cols="12" class="mb-n5">
              <span class="text-black text-h6 font-weight-bold">
                Sube tu comprobante de entrega:
              </span>
            </v-col>

            <v-col>
                <span class="text-primary text-center font-weight-bold">Comprobante subido: comprobante.jpg</span>

            </v-col>

            <v-col cols="12">
              <v-card
                flat
                class="filee border-primary border-dashed border-opacity-100 border-sm"
              >
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="5" class="d-flex align-center justify-center mb-n1">
                    <v-file-input
                      class="pa-1 text-primary text-opacity-100 font-weight-black"
                      prepend-icon="mdi-upload"
                      label="Click aqui para subir"
                      bg-color="#f2f4f7"
                      color="background"
                      variant="plain"
                      accept="image/*,.pdf"
                    ></v-file-input>
                  </v-col>
                  <!-- <v-col cols="12" class="d-flex justify-center ">
                    <span class="text-primary text-center font-weight-bold">Documento:</span>
                  </v-col> -->
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-card-actions class="px-6 mb-4">
          <v-spacer></v-spacer>

          <v-btn
            text="Cerrar"
            variant="outlined"
            class="pa-6 d-flex align-center"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            class="bg-primary pa-6 d-flex align-center"
            color="white"
            text="Guardar"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
.filee {
  background-color: #f2f4f7;
}

.v-file-input__text {
  text-align: center;
}
</style>
