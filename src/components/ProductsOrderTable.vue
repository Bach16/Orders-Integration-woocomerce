<template>
  <v-card v-if="modificable"  flat class="ms-2 my-6 pa-4 datos align-center border-sm">
    <v-card-title class="font-weight-bold"> Pedido {{ order?.id }} </v-card-title>
    <v-spacer> </v-spacer>
    <v-btn class="mr-9" color="primary" dark @click="callModifyObject">
      Nueva fila
    </v-btn>
  </v-card>

  <v-card class=" my-6 datos" flat>

    <v-table class="tabla border-secondary border-opacity-50 border-sm">

      <thead >
        <tr >
          <th class="border-secondary border-opacity-50 border-e-sm border-b-md font-weight-bold">Cantidad</th>
          <th class="border-secondary border-opacity-50 border-e-sm border-b-md font-weight-bold"> N de <br /> bultos </th>
          <th class="border-secondary border-opacity-50 border-e-sm border-b-md">Unidades <br />por bulto</th>
          <th class="border-secondary border-opacity-50 border-e-sm border-b-md font-weight-bold">Total de <br />unidades</th>
          <th class="border-secondary border-opacity-50 border-e-sm border-b-md font-weight-bold">Descripcion del producto</th>
          <th class="border-secondary border-opacity-50 border-b-md font-weight-bold">Supervisado</th>
          <th v-if="!modificable" class="border-secondary border-opacity-50 border-b-md border-s-sm  font-weight-bold">Listo</th>

        </tr>
      </thead>
      <draggable
        v-if="modificable"
        :list="order?.line_items"
        tag="tbody"
        item-key="id"
      >
        <template #item="{ element }">
          <tr :key="String(element.id)">
            <!-- Cantidad -->
            <td class="border-e-sm" v-if="modificable">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="cantidad"
                v-model="element.cantidad"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            
            <!-- N de Bultos -->

            <td class="border-e-sm"  v-if="modificable">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="nbultos"
                v-model="element.nbultos"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            
            <!-- Unidades por bulto -->
            <td class="border-e-sm"  v-if="element.input">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="product_id"
                v-model="element.product_id"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            <td class="border-e-sm" v-else>{{ element.product_id }}</td>
            
            <!-- Total de unidades -->
            <td class="border-e-sm"  v-if="element.input">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="quantity"
                v-model="element.quantity"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            <td class="border-e-sm" v-else>{{ element.quantity }}</td>
            
            <!-- Descripcion -->
            <td class="border-e-sm"  v-if="element.input">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="name"
                v-model="element.name"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            <td class="border-e-sm" v-else>{{ element.name }}</td>
            
            <!-- Supervisado -->
            <td v-if="element.input">
              <v-text-field
                @input="onChangeToLocalStorage"
                name="price"
                v-model="element.price"
                hide-details="auto"
                variant="plain"
              ></v-text-field>
            </td>
            <td v-else>{{ element.price }}</td>

            <td v-if="!modificable">
              <v-checkbox v-model="element.checked" hide-details></v-checkbox>
            </td>
          </tr>
        </template>
      </draggable>

      <tbody v-else >
        <tr v-for="element in order?.line_items" :key="element.name">
            <!-- Cantidad -->
            <td class="border-e-sm" >{{ element.cantidad }}</td>
            
            <!-- N de Bultos -->
            <td class="border-e-sm" >{{ element.nbultos }}</td>

            <!-- Unidades por bulto -->
            <td class="border-e-sm" >{{ element.product_id }}</td>
            
            <!-- Total de unidades -->
            <td class="border-e-sm" >{{ element.quantity }}</td>
            <!-- Descripcion -->
            
            <td class="border-e-sm" >{{ element.name }}</td>
            
            <!-- Supervisado -->
            <td class="border-e-sm" >{{ element.price }}</td>

            <!-- Listo -->
            <td >
              <v-checkbox v-model="element.checked" hide-details></v-checkbox>
            </td>
          </tr>
        </tbody>
    </v-table>


  </v-card>
</template>

<script>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import { useOrdersStore } from "../stores/Orders";
import { useRoute } from "vue-router";
const orderStore = useOrdersStore();



export default {
  props: ["order", "modificable", "newItem", "save", "onChangeToLocalStorage"],
  setup() {
    watch(
      () => orderStore.orders,
      (orders) => {
        localStorage.setItem(
          "order_line_items",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("order_line_items")),
            [orders[0].id]: orders[0],
          })
        );
      },
      { deep: true }
    );
  },
  components: {
    draggable,
  },
  methods: {
    callModifyObject() {
      this.save();
    }
  
   
  },
};
</script>

