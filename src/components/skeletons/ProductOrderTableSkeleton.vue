<template>
  {{ console.log(modificable) }}
  <v-card v-if="modificable" class="ms-2 my-6 pb-5 datos" elevation="2">
    <v-card-title> Pedido {{ order?.id }} </v-card-title>
    <v-spacer> </v-spacer>

    <v-btn class="mb-2" color="primary" dark @click="callModifyObject">
      Nueva fila
    </v-btn>
  </v-card>

  <v-card class="ms-2 my-6 pb-5 datos" elevation="2">
    <v-table class="tabla">
      <thead>
        <tr>
          <th class="text-left">Cantidad</th>
          <th class="text-left">
            N de <br />
            bultos
          </th>
          <th class="text-left">Unidades <br />por bulto</th>
          <th class="text-left">
            Total de <br />
            unidades
          </th>
          <th class="text-left">Descripcion del producto</th>
          <th class="text-left">Supervisado</th>
          <th v-if="!modificable" class="text-left">Listo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in [1, 5, 4]" :key="element.name">
          <!-- Cantidad -->

          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          <!-- N de Bultos -->

          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          <!-- Unidades por bulto -->

          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          <!-- Total de unidades -->
          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          <!-- Descripcion -->
          <td class="skeleton-data-container">
            <div class="skeleton-data"></div>
          </td>
          <!-- Supervisado -->

          <td class="skeleton-data-container">
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
</style>
