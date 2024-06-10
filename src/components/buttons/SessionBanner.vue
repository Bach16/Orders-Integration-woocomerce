<template>
    <div class="session-banner">
      <div class="welcome-text">
        <span>Bienvenido {{rol}}</span>
      </div>
      <!-- Icono de cerrar sesión -->
      <v-icon @click="logout">mdi-logout</v-icon>
    </div>
  </template>
  
  <script>
  export default {
    props: ["logout"],
    setup(){
      const rol = localStorage.getItem("rol")
      return{
        rol
      }
    }
    
  };
  </script>
  
  <style scoped>
  .session-banner {
    padding: 20px;
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
  
  .welcome-text span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .session-banner v-icon {
    font-size: 24px; /* Ajusta el tamaño del icono */
    cursor: pointer; /* Cambia el cursor al pasar sobre el icono */
  }
  </style>
  