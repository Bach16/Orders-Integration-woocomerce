<template>
  <v-card class="ms-2 pb-5 datos" flat>
    <v-responsive>
      <v-row align-center class="pa-4" no-gutters>
        <!-- Razon social -->
        <v-col cols="12" md="12" class="pa-2">
          <span class="bold-text">Razón social: </span>
          <!-- Mantener el texto "Razón social" en la parte superior y aplicar el salto de línea en el modo responsive -->
          <span class="ml-4">{{ order?.billing?.company }}</span>
        </v-col>
        <v-divider />

        <!-- Provincia -->
        <v-col cols="4" md="4" class="pa-2">
          <span class="bold-text">Provincia: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.state }}</span>
        </v-col>

        <!-- Canton -->
        <v-col cols="4" md="4" class="pa-2">
          <span class="bold-text">Canton: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.city }}</span>
        </v-col>

        <!-- Parroquia -->
        <v-col cols="4" md="4" class="pa-2">
          <span class="bold-text">Parroquia: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.city }}</span>
        </v-col>
        <v-divider />

        <!-- Direccion -->
        <v-col cols="12" md="12" class="pa-2">
          <span class="bold-text">Direccion: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.address_1 }}</span>
        </v-col>
        <v-divider />

        <!-- Administrador de contrato -->
        <v-col cols="12" md="5" class="pa-2">
          <span class="bold-text">Administrador de contrato: </span>
          <span v-if="isResponsive"><br /></span>
          <span>{{ order?.billing?.first_name + " " + order?.billing?.last_name}}</span>
        </v-col>

        <!-- E-mail -->
        <v-col cols="6" md="4" class="pa-2">
          <span class="bold-text">E-mail: </span>
          <span v-if="isResponsive"><br></span>
          <span>{{ truncateText(order?.billing?.email) }}</span>
        </v-col>

        <!-- Telefono -->
        <v-col cols="6" md="3" class="pa-2">
          <span class="bold-text">Telefono: </span>
          <span v-if="isResponsive"><br></span>
          <span>{{ order?.billing?.phone }}</span>
        </v-col>
        <v-divider />

        <!-- Bodeguero -->
        <v-col cols="12" md="4" class="pa-2">
          <span class="bold-text">Bodeguero: </span>
          <span v-if="isResponsive"><br></span>
          <span>{{ "Nombre bodeguero" }}</span>
        </v-col>

        <!-- E-mail -->
        <v-col cols="6" md="4" class="pa-2">
          <span class="bold-text">E-mail: </span>
          <span v-if="isResponsive"><br></span>
          <span>{{ truncateText("correo@correo.com") }}</span>
        </v-col>

        <!-- Telefono -->
        <v-col cols="6" md="4" class="pa-2">
          <span class="bold-text">Telefono: </span>
          <span v-if="isResponsive"><br></span>
          <span>{{ "+593987654321" }}</span>
        </v-col>
      </v-row>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      isResponsive: false,
    };
  },
  methods: {
    truncateText(text) {
      this.checkResponsive();
      console.log(this.isResponsive);

      if (this.isResponsive) {
        const maxLength = 10;
        if (text?.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
      }
      return text;
    },

    checkResponsive() {
      // Check if the screen width is below a certain threshold for responsiveness
      if (window.innerWidth <= 760) {
        this.isResponsive = true;
      } else {
        this.isResponsive = false;
      }
    },
  },
  mounted() {
    // Check initial responsiveness
    this.checkResponsive();
    // Add event listener to check responsiveness on window resize
    window.addEventListener("resize", this.checkResponsive);
  },
  beforeDestroy() {
    // Remove event listener on component destroy to prevent memory leaks
    window.removeEventListener("resize", this.checkResponsive);
  },
};
</script>

<style>
.datos {
  background-color: white;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid #BBDEFB;
}

.bold-text {
  font-weight: bold;
}

.pa-2 {
  padding: 8px !important; /* Ajusta el padding según sea necesario */
}
</style>
