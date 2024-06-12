<template>
  <div class="session-banner">
    <div class="welcome-text" v-if="rol === 'bodeguero'">
      <h2>Bienvenido a la sección de preparación</h2>
      <p>
        Aquí podrá revisar cada orden y agregar las cantidades de bultos,
        unidades por bulto, totales de unidades y varios.
      </p>
      <span>Rol asignado: {{ rol }}</span>
    </div>

    <div class="welcome-text" v-if="rol === 'logistica'">
      <h2>Bienvenido a la sección de despacho</h2>
      <p>
        Aquí podrá revisar cada item de la orden y confirmar los valores para el
        despacho.
      </p>
      <span>Rol asignado: {{ rol }}</span>
    </div>

    <div class="welcome-text" v-if="rol === 'conductor'">
      <h2>Bienvenido a la sección de entrega confirmada</h2>
      <p>
        Aquí podrá subir la foto del pedido entregado y firmado por el cliente.
      </p>
      <span>Rol asignado: {{ rol }}</span>
    </div>
    <!-- Icono de cerrar sesión -->
    <span>Salir </span
    ><v-icon @click="logout" size="x-large">mdi-logout-variant</v-icon>
  </div>
</template>

<script>
export default {
  props: ["logout"],
  setup() {
    const rol = localStorage.getItem("rol");
    return {
      rol,
    };
  },
};
</script>

<style scoped>
.session-banner {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
}

.welcome-text {
  flex-grow: 1;
  text-align: left;
  margin-right: 20px;
}

.welcome-text p {
  font-size: 1rem;
  font-weight: normal;
  color: #333;
}

.welcome-text span {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.session-banner v-icon {
  font-size: 24px;
  /* Ajusta el tamaño del icono */
  cursor: pointer;
  /* Cambia el cursor al pasar sobre el icono */
}
</style>