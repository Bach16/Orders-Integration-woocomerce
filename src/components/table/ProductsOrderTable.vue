<template>
  <!-- Agregar nueva fila -->
  <!-- <v-card
    v-if="modificable"
    flat
    class="ms-2 my-6 pa-4 datos align-center border-primary border-opacity-50 border-md"
  >
    <p class="font-weight-bold">Agregar una fila</p>
    <v-spacer />
    <v-icon
      icon="mdi-plus-circle-outline"
      color="primary"
      start
      @click="callModifyObject"
    ></v-icon>
  </v-card> -->

  <v-card class="my-6 ms-2 datos" flat>
    <v-table class="tabla border-primary border-opacity-50 border-md">
      <thead>
        <tr>
          <th class="border-e-sm border-b-md font-weight-bold">Cantidad</th>
          <th class="border-e-sm border-b-md font-weight-bold">
            N• de <br />bultos
          </th>
          <th class="border-e-sm border-b-md font-weight-bold">
            Unidades <br />por bulto
          </th>
          <th class="border-e-sm border-b-md font-weight-bold">
            Total de <br />unidades
          </th>
          <th class="border-e-sm border-b-md font-weight-bold">Varios</th>
          <th class="border-e-sm border-b-md font-weight-bold">
            Descripcion del producto
          </th>
          <th class="border-b-md font-weight-bold">Supervisado</th>
          <th
            v-if="!modificable"
            class="border-b-md border-s-sm font-weight-bold"
          >
            Listo
          </th>
        </tr>
      </thead>

      <!--       <draggable
        v-if="modificable"
        :list="order?.line_items"
        tag="tbody"
        item-key="id"
        animation="200"
        ghost-class="drag-ghost"
        handle=".drag-handle"
        >
        <template #item="{ element, index }">
          <tr :key="String(element.id)" class="drag-handle"> -->

      <!-- Tabla sin draggable -->
      <tbody v-if="modificable">
        <tr v-for="element in order?.line_items" :key="element.id">
          <!-- Cantidad -->
          <td class="border-e-sm" v-if="element.input">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="quantity"
              v-model="element.quantity"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>
          <td class="border-e-sm font-weight-bold" v-else>{{ element?.quantity }}</td>

          <!-- N de Bultos -->
          <td class="border-e-sm" v-if="modificable">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="nbultos"
              v-model="element.meta_data[0].value"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>

          <!-- Unidades por bulto -->
          <td class="border-e-sm" v-if="modificable">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="unidbultos"
              v-model="element.meta_data[1].value"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>

          <!-- Total de unidades -->
          <td class="border-e-sm" v-if="modificable">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="totalunidades"
              v-model="element.meta_data[2].value"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>

          <!-- Varios -->
          <td class="border-e-sm" v-if="modificable">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="varios"
              v-model="element.meta_data[3].value"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>

          <!-- Descripcion -->
          <td class="border-e-sm" v-if="element.input">
            <v-text-field
              @input="onChangeToLocalStorage"
              name="name"
              v-model="element.name"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>
          <td class="border-e-sm font-weight-bold" v-else>{{ element.name }}</td>

          <!-- Supervisado -->
          <td v-if="modificable">
            <v-text-field
              @input="onChangeToLocalStorage"
              @keypress="onlyLetters($event)"
              name="supervisado"
              v-model="element.meta_data[4].value"
              hide-details="auto"
              variant="plain"
            ></v-text-field>
          </td>
          <td v-else>{{ element.supervised }}</td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="element in order?.line_items" :key="element.id">
          <!-- Cantidad -->
          <td class="border-e-sm border-b-sm">{{ element.quantity }}</td>

          <!-- N de Bultos -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="nbultos"
              v-model="element.meta_data[0].value"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.meta_data[0].value }}</span>
          </td>

          <!-- Unidades por bulto -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="unidbultos"
              v-model="element.meta_data[1].value"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.meta_data[1].value }}</span>
          </td>

          <!-- Total de unidades -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="totalunidades"
              v-model="element.meta_data[2].value"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.meta_data[2].value }}</span>
          </td>

          <!-- Varios -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              @keypress="this.$onlyNumbers($event)"
              name="varios"
              v-model="element.meta_data[3].value"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.meta_data[3].value }}</span>
          </td>

          <!-- Descripcion -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              name="name"
              v-model="element.name"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.name }}</span>
          </td>

          <!-- Supervisado -->
          <td class="border-e-sm border-b-sm">
            <v-text-field
              v-if="!disabled"
              @input="onChangeToLocalStorage"
              @keypress="onlyLetters($event)"
              name="supervisado"
              v-model="element.meta_data[4].value"
              hide-details="auto"
              variant="plain"
              :disabled="disabled"
            ></v-text-field>
            <span v-else>{{ element.meta_data[4].value }}</span>
          </td>

          <!-- Listo -->
          <!-- <td class="border-e-sm border-b-sm">
            <v-checkbox v-model="element.meta_data[6].value" hide-details></v-checkbox>
          </td> -->

          <td class="border-e-sm border-b-sm">
            <v-checkbox
              v-model="element.meta_data[5].value"
              hide-details
            ></v-checkbox>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import { onMounted, watch } from "vue";
import { useOrdersStore } from "../../stores/Orders";

export default {
  props: ["order", "modificable", "save", "onChangeToLocalStorage", "disabled"],
  setup() {
    const orderStore = useOrdersStore();
    watch(
      () => orderStore.orders,
      (orders) => {
        orders[0].meta_data[2].value = orders[0]?.line_items?.reduce(
          (total, item) => {
            if (parseInt(item.meta_data[0].value)) {
              return total + parseInt(item.meta_data[0].value);
            }
            return total + 0;
          },
          0
        );
      },
      { deep: true }
    );
  },
  methods: {
    callModifyObject() {
      this.save();
    },
    onlyLetters(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (
        (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122)
      ) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style>
.drag-ghost {
  opacity: 0.035;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Agrega un sombreado a la fila arrastrada */
  border: 2px solid #ddd;
  /* Añade un borde alrededor de la fila arrastrada */
  background-color: rgb(0, 68, 255);
}

.drag-handle {
  cursor: move !important;
  /* Forzar cursor a icono de movimiento */
}

.drag-handle:active {
  cursor: move !important;
  /* Asegurar que el icono de movimiento se muestra mientras se arrastra */
}

/* Aplicar a todo el componente draggable para asegurar que no parpadee el cursor */
.draggable-item {
  cursor: move !important;
}

/* Transición de animación */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.tabla {
  width: 100%;
}
</style>
