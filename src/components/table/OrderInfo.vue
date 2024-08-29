<template>
  <v-card class="ms-2 datos border-md border-primary border-opacity-50" flat>
    <v-responsive>
      <v-row align-center no-gutters>
        <!-- Razon social -->
        <v-col cols="12" md="12" class="px-3 pt-4 pb-3">
          <span class="bold-text">Razón social: </span>
          <!-- Mantener el texto "Razón social" en la parte superior y aplicar el salto de línea en el modo responsive -->
          <span class="ml-4">{{ order?.billing?.first_name }} {{ order?.billing?.last_name }}</span>
        </v-col>

        <!-- Provincia -->
        <v-col cols="4" md="4" class="px-3 py-3 border-t-sm border-e-sm">
          <span class="bold-text">Provincia: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.state }}</span>
        </v-col>

        <!-- Canton -->
        <v-col cols="4" md="4" class="px-3 py-3 border-t-sm border-e-sm">
          <span class="bold-text">Canton: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.city }}</span>
        </v-col>

        <!-- Parroquia -->
        <v-col cols="4" md="4" class="px-3 py-3 border-t-sm">
          <span class="bold-text">Parroquia: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4">{{ order?.billing?.city }}</span>
        </v-col>

        <!-- Direccion -->
        <v-col cols="12" md="12" class="px-3 py-3 border-t-sm">
          <span class="bold-text">Dirección factura: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4"
            >{{ order?.billing?.address_1 }}
            {{ order?.billing?.address_2 }}</span
          >
        </v-col>

        <!-- Direccion envío-->
        <v-col cols="12" md="12" class="px-3 py-3 border-t-sm">
          <span class="bold-text">Direccion envío: </span>
          <span v-if="isResponsive"><br /></span>
          <span class="ml-4"
            >{{ order?.shipping?.address_1 }}
            {{ order?.shipping?.address_2 }}</span
          >
        </v-col>

        <!-- Bodeguero -->
        <v-col cols="12" md="4" class="px-3 pt-3 pb-4 border-t-sm border-e-sm">
          <span class="bold-text"> Bodeguero: </span>
          <span v-if="isResponsive"><br /></span>
          <span
            >{{ userStore?.user?.first_name }}
            {{ userStore?.user?.last_name }}</span
          >
        </v-col>

        <!-- E-mail -->
        <v-col cols="6" md="4" class="px-3 pt-3 pb-4 border-t-sm border-e-sm">
          <span class="bold-text">E-mail: </span>
          <span v-if="isResponsive"><br /></span>
          <span>{{ truncateText(userStore?.user?.email) }}</span>
        </v-col>

        <!-- Telefono -->
        <v-col cols="6" md="4" class="px-3 pt-3 pb-4 border-t-sm">
          <span class="bold-text">Telefono: </span>
          <span v-if="isResponsive"><br /></span>
          <span>{{ removeHttp(userStore?.user?.url) }}</span>
        </v-col>
      </v-row>
    </v-responsive>
  </v-card>
</template>

<script>
import { useAuthStore } from "../../stores/Auth";
import { onMounted } from "vue";


export default {
  props: ["order"],
  data() {
    return {
      isResponsive: false,
    };
  },
  setup() {
    const userStore = useAuthStore();
    /* onMounted(() => {
      userStore.checkUser(userStore.user)
      }) */
    return { userStore };
  },


  methods: {
    truncateText(text) {
      this.checkResponsive();

      if (this.isResponsive) {
        const maxLength = 10;
        if (text?.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
      }
      return text;
    },
removeHttp(url) {
  // Verificar si la URL está definida y no es nula
  if (!url) {
    return url;
  }
  
  // Comprobar si la cadena comienza con 'http://'
  if (url.startsWith("http://")) {
    // Eliminar 'http://' de la cadena
    return url.slice(7);
  }

  // Si la cadena no comienza con 'http://', devolver la cadena original
  return url;
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
}

.bold-text {
  font-weight: bold;
}
</style>
