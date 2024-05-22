<template>
  <v-container class="container">
    <v-row align="center" class="pa-6" no-gutters>
      <v-col cols="8">
        <v-sheet class="bg-transparent">
          <h1>Entregado</h1>
        </v-sheet>
      </v-col>
      <v-col cols="3" offset="1">
        <p>Nº de proceso</p>
      </v-col>
    </v-row>

    <v-card class="ms-2 pl-3 pt-4 pb-6 tarjeta" elevation="8">
      <v-row align="center" class="pa-2" no-gutters>
        <v-col cols="8">
          <v-text-field
            hide-details
            append-inner-icon="mdi-magnify"
            label="Buscar pedido"
            variant="outlined"
            height="56"
          />
        </v-col>
        <v-col cols="4">
          <v-btn
            class="ml-5"
            color="primary"
            :loading="loading"
            @click="onClick"
            height="56"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-sheet class="pa-6 mt-3 bg-transparent">
      <h2>Resultados</h2>
    </v-sheet>

    <v-card class="ms-2 pa-3 tarjeta" elevation="8">
      <v-row align="center" class="pa-2" no-gutters>
        <v-col cols="6">
          <p>Pedido <br> #1234 5678</p>
        </v-col>
        <v-col cols="6">
          <v-file-input
            hide-details
            accept="image/*"
            label="Subir comprobante de entrega"
            bg-color="primary"
            color="white"
            class="font-weight-black"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center mt-8">
      <v-btn class="ms-2 my-6" align="center" color="primary" @click="onClick">
        Guardar
      </v-btn>

    </div>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },

    navigate() {},
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

h1,
h2 {
  color: #1565c0;
}

p {
  font-weight: 500;
}

.container {
  background-color: #e3f2fd;
  height: auto;
  min-height: 100vh;
  width: auto;
}

.tarjeta {
  display: flex;
  justify-content: center;
  border-radius: 10px;
}
</style>
