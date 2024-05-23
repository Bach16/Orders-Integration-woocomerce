<template>
  <v-card v-if="modificable"  flat class="ms-2 my-6 pa-4 datos align-center">
    <v-card-title class="font-weight-bold"> Pedido {{ order?.id }} </v-card-title>
    <v-spacer> </v-spacer>

    <v-btn class="mr-2" color="primary" dark @click="callModifyObject">
      Nueva fila
    </v-btn>
  </v-card>


  <v-card class="ms-2 my-6 datos" flat>

    <v-table class="tabla">

      <thead>
        <tr>
          <th class="font-weight-bold">Cantidad</th>
          <th class="font-weight-bold"> N de <br /> bultos </th>
          <th class="font-weight-bold">Unidades <br />por bulto</th>
          <th class="font-weight-bold">Total de <br />unidades</th>
          <th class="font-weight-bold">Descripcion del producto</th>
          <th class="font-weight-bold">Supervisado</th>
          <th v-if="!modificable" class="font-weight-bold">Listo</th>

        </tr>
      </thead>
      <draggable v-if="modificable" :list="order?.line_items" tag="tbody" item-key="id">
        <template #item="{ element }">
          <tr :key="element.id">
            <!-- Cantidad -->
            <td >
              <v-text-field v-model="element.cantidad" hide-details="auto" variant="plain"></v-text-field>
            </td>
            
            <!-- N de Bultos -->

            <td >
              <v-text-field v-model="element.nbultos" hide-details="auto" variant="plain"></v-text-field>
            </td>
            
            <!-- Unidades por bulto -->
            <td v-if="element.input">
              <v-text-field v-model="element.product_id" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.product_id }}</td>
            
            <!-- Total de unidades -->
            <td v-if="element.input">
              <v-text-field v-model="element.quantity" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.quantity }}</td>
            <!-- Descripcion -->
            <td v-if="element.input">
              <v-text-field v-model="element.name" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.name }}</td>
            <!-- Supervisado -->

            <td v-if="element.input">
              <v-text-field v-model="element.price" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.price }}</td>

          </tr>
        </template>
      </draggable>

      <tbody v-else>
        <tr v-for="element in order?.line_items" :key="element.name">
            <!-- Cantidad -->
            <td>{{ element.cantidad }}</td>
            
            <!-- N de Bultos -->
            <td >{{ element.nbultos }}</td>

            <!-- Unidades por bulto -->
            <td>{{ element.product_id }}</td>
            
            <!-- Total de unidades -->
            <td>{{ element.quantity }}</td>
            <!-- Descripcion -->
            
            <td >{{ element.name }}</td>
            <!-- Supervisado -->

            <td>{{ element.price }}</td>

            <td>
              <v-checkbox v-model="element.listo" hide-details></v-checkbox>
            </td>
          </tr>
        </tbody>
    </v-table>


  </v-card>
</template>

<script>

import draggable from "vuedraggable";

export default {
  props: ["order", "modificable","newItem","save","isInput"],
  components: {
    draggable,
  }, 
  methods: {
    callModifyObject() {
      this.save();
    }
  
   
  },
  data() {
    return {
      
      /* newItem: {
        cantidad: "",
        nbultos: "",
        unidadesPorBulto: "",
        totalUnidades: "",
        descripcionProducto: "",
        supervisado: "",
        input: true,
      }, */
    };
  },
};
</script>

<style>
.v-table{
  border: 1px solid #E0E0E0;
}

.tbody{
  border: 1px solid black;

}
</style>