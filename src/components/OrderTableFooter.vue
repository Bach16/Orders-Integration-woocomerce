<template>
    <v-row align="center" no-gutters>
      <v-col cols="6">
        <v-card class="ms-2 py-6 datos" height="70px" elevation="2">
            <p>Observaciones</p>
            <v-text-field v-if="modificable" @input="onChangeToLocalStorage" name="cantidad" v-model="order.comments" hide-details="auto" variant="plain"/>
            <p v-else class="ml-10">${{order?.total}}</p>
          </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="ms-2 datos" elevation="2">
          <v-row class="pa-4" no-gutters>
            <!-- Totales -->
            <v-col cols="6">
              <v-sheet class="pa-2">
                <span>Totales</span>
              </v-sheet>
            </v-col>

            <v-divider
              class="border-opacity-50"
              length="100px"
              vertical
            ></v-divider>

            <v-col cols="4">
              <v-sheet class="pa-2">
                <p class="text-right">${{ order?.total }}</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
</template>

<script >
export default {
    props: ["order", "modificable"]
    }
</script>