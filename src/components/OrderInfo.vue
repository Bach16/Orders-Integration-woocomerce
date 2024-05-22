<template>
    <v-card class="ms-2 pb-5 datos" elevation="2">
      <v-row align="center" class="pa-4" no-gutters>
        <!-- Razon social -->
        <v-col cols="12">
          <v-sheet class="pa-2">
            <span>Razón social:</span>
            <span class="ml-4">{{order?.billing?.company}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50"></v-divider>

        <!-- Provincia -->
        <v-col cols="4">
          <v-sheet class="pa-2">
            <span>Provincia:</span>
            <span class="ml-4">{{order?.billing?.state}}</span>
          </v-sheet>
        </v-col>
        <h1>asd</h1>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- Canton -->
        <v-col cols="4">
          <v-sheet class="pa-2">
            <span>Canton:</span>
            <span class="ml-4">{{order?.billing?.city}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- Parroquia -->
        <v-col cols="4">
          <v-sheet class="pa-2">
            <span>Parroquia:</span>
            <span class="ml-4">{{order?.billing?.city}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50"></v-divider>
        <v-responsive width="100%"></v-responsive>

        <!-- Direccion -->
        <v-col cols="4">
          <v-sheet class="pa-3">
            <span>Direccion:</span>
            <span class="ml-4">{{order?.billing?.address_1}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50"></v-divider>
        <v-responsive width="100%"></v-responsive>

        <!-- Administrador de contrato -->
        <v-col cols="6">
          <v-sheet class="pa-2">
            <span>Administrador de contrato:</span>
            <span class="ml-4">{{order?.billing?.first_name}} {{order?.billing?.last_name}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- E-mail -->
        <v-col cols="3">
          <v-sheet class="pa-2">
            <span>E-mail:</span>
            <span class="ml-4">{{order?.billing?.email}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- Telefono -->
        <v-col cols="3">
          <v-sheet class="pa-2">
            <span>Telefono:</span>
            <span class="ml-4">{{order?.billing?.phone}}</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50"></v-divider>
        <v-responsive width="100%"></v-responsive>

        <!-- Bodeguero -->
        <v-col cols="6">
          <v-sheet class="pa-2">
            <span>Bodeguero:</span>
            <span class="ml-4">-------------</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- E-mail -->
        <v-col cols="3">
          <v-sheet class="pa-2">
            <span>E-mail:</span>
            <span class="ml-4">-------------</span>
          </v-sheet>
        </v-col>

        <v-divider class="border-opacity-50" vertical length="50px"></v-divider>

        <!-- Telefono -->
        <v-col cols="3">
          <v-sheet class="pa-2">
            <span>Telefono:</span>
            <span class="ml-4">-------------</span>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
</template>

<script >
export default {
  props: ['order']
}
</script>

<style>
.datos {
  display: flex;
  justify-content: center;
  border-radius: 20px;
}

.datostxt {
  font-size: 16px;
  font-weight: 300;
}

.tabla {
  width: 100%;
}
</style>