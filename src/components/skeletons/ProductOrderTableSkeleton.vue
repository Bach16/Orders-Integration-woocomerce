<template>
 <!--  <v-card v-if="modificable"  flat class="ms-2 my-6 pa-4 datos align-center border-primary border-opacity-50 border-md">
    <p class="font-weight-bold"> Agregar una fila </p>
    <v-spacer />
    <v-icon icon="mdi-plus-circle-outline" color="primary" start  @click="callModifyObject"></v-icon>
  </v-card> -->

  <v-card class="my-6 ms-2 datos" flat>
    <v-table class="tabla border-primary border-opacity-50 border-md">
      <thead>
        <tr>
          <th class="border-e-sm border-b-md font-weight-bold">Cantidad</th>
          <th class="border-e-sm border-b-md font-weight-bold"> N de <br /> bultos </th>
          <th class="border-e-sm border-b-md font-weight-bold">Unidades <br />por bulto</th>
          <th class="border-e-sm border-b-md font-weight-bold">Total de <br />unidades</th>
          <th class="border-e-sm border-b-md font-weight-bold">Varios</th>
          <th class="border-e-sm border-b-md font-weight-bold">Descripcion del producto</th>
          <th class="border-b-md font-weight-bold">Supervisado</th>
          <th v-if="!modificable" class="border-b-md border-s-sm  font-weight-bold">Listo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in [1, 5, 4]" :key="element.name">
          <!-- Cantidad -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- N de Bultos -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- Unidades por bulto -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          
          <!-- Total de unidades -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- Varios -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- Descripcion -->
          <td class="border-e-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- Supervisado -->
          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

          <!-- Listo -->
          <td v-if="!modificable" class="border-s-sm skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>

        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
export default {
  props: ["modificable"],
};
</script>

<style>
.skeleton-data-container {
  padding: 5px;
}
.skeleton-data {
  width: 100%;
  height: 70%;
  background-color: rgb(243, 243, 243);
  border-radius: 0.5rem;
}
.datos {
  display: flex;
  justify-content: center;
  border-radius: 15px;
}
</style>
