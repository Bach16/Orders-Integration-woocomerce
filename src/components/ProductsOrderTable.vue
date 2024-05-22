<template>
  <v-card v-if="modificable" class="ms-2 my-6 pb-5 datos" elevation="2">
    <v-card-title> Pedido {{ order?.id }} </v-card-title>
    <v-spacer> </v-spacer>

    <v-btn class="mb-2" color="primary" dark @click="callModifyObject">
      Nueva fila
    </v-btn>
  </v-card>


  <v-card class="ms-2 my-6 pb-5 datos" elevation="2">

    <v-table class="tabla">
      <h1>asd</h1>
      <h1>asd</h1>

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
      <draggable v-if="modificable" :list="order?.line_items" tag="tbody" item-key="name">
        <template #item="{ element }">
          <tr :key="element.name">
            <!-- Cantidad -->
            <td v-if="modificable">
              <v-text-field v-model="element.cantidad" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.cantidad }}</td>
            <!-- N de Bultos -->

            <td v-if="modificable">
              <v-text-field v-model="element.nbultos" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.nbultos }}</td>
            <!-- Unidades por bulto -->
            <td v-if="element.input">
              <v-text-field v-model="element.id" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.id }}</td>
            
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

            <td v-if="!modificable">
              <v-checkbox v-model="element.listo" hide-details></v-checkbox>
            </td>
          </tr>
        </template>
      </draggable>
      <tbody v-else>
        <tr v-for="element in order?.line_items" :key="element.name">
            <!-- Cantidad -->
            <td v-if="modificable">
              <v-text-field v-model="element.cantidad" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.cantidad }}</td>
            <!-- N de Bultos -->

            <td v-if="modificable">
              <v-text-field v-model="element.nbultos" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.nbultos }}</td>
            <!-- Unidades por bulto -->
            <td v-if="element.input">
              <v-text-field v-model="element.id" hide-details="auto" variant="plain"></v-text-field>
            </td>
            <td v-else>{{ element.id }}</td>
            
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

            <td v-if="!modificable">
              <v-checkbox v-model="element.listo" hide-details></v-checkbox>
            </td>
          </tr>
        </tbody>
    </v-table>

    <!-- <tbody>
        <tr v-for="item in order?.line_items" :key="item.name">
          <td v-if="modificable">
            <v-text-field hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else="modificable">{{ item.id }}</td>
          <td v-if="modificable">
            <v-text-field hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else="modificable">{{ item.id }}</td>

          <td>{{ item.id }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>

          <td v-if="!modificable"><v-checkbox hide-details></v-checkbox></td>
          
        </tr>
      </tbody> -->

    <!-- <template v-slot:body>
        <tr :key="props.item.name">
          <td v-if="modificable">
            <v-text-field hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.id }}</td>

          <td v-if="modificable">
            <v-text-field hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.id }}</td>

          <td v-if="props.item.input">
            <v-text-field v-model="props.item.unidadesPorBulto" hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.id }}</td>

          <td v-if="props.item.input">
            <v-text-field v-model="props.item.totalUnidades" hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.quantity }}</td>

          <td v-if="props.item.input">
            <v-text-field v-model="props.item.descripcionProducto" hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.name }}</td>

          <td v-if="props.item.input">
            <v-text-field v-model="props.item.supervisado" hide-details="auto" variant="plain"></v-text-field>
          </td>
          <td v-else>{{ props.item.price }}</td>

          <td v-if="!modificable">
            <v-checkbox hide-details></v-checkbox>
          </td>
        </tr>
      </template> -->
    <!--     </v-data-table>
 -->
  </v-card>
</template>

<script>
import { ref } from "vue";
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
  
   /*  save() {
      this.newItem = {
        cantidad:"",
        nombre: "",
        nbultos: "",
        unidadesPorBulto: "",
        totalUnidades: "",
        descripcionProducto: "",
        supervisado: "",
        input: true,
      };
      this.order.line_items.push({ ...this.newItem });
      localStorage.setItem('order_line_items', JSON.stringify(this.order.line_items));


    }, */
  },
  data() {
    return {
      headers: [
        { title: "Cantidad", key: "cantidad", align: "center" },
        { title: "N de bultos", key: "nbultos", align: "center" },
        {
          title: "Unidades por bulto",
          key: "unidades por bulto",
          align: "center",
        },
        { title: "Total de unidades", vkey: "total unidades", align: "center" },
        {
          title: "Descripcion del producto",
          vkey: "descripcion",
          align: "center",
        },
        { title: "Supervisado", vkey: "supervisado", align: "center" },
        /* { title: 'Listo', value: 'listo', align: 'center', sortable: false, filterable: false, 'v-if': '!modificable' } */
      ],
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
