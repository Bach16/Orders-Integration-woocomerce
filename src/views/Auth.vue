<template>
  <v-container class="mx-lg-16 mx-2">
    <div class="login">
      <v-row no-gutters class="card2">
        <v-col cols="12" class="mb-6">
          <h1 class="font-weight-bold text-primary text-uppercase">
            Inicio de Sesión
          </h1>
        </v-col>
        <v-col>
          <v-card class="rounded-xl pa-16">
            <v-row>
              <v-col cols="12">
                <h2 class="text-primary font-weight-bold mb-1">Usuario</h2>
                <v-text-field
                  class="mb-2"
                  :rules="[rules.required]"
                  density="compact"
                  placeholder="Email"
                  prepend-inner-icon="mdi-account-circle"
                  variant="outlined"
                ></v-text-field>
                <h2 class="text-primary font-weight-bold mb-1">Contraseña</h2>
                <v-text-field
                  class="mb-2"
                  :rules="[rules.required]"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Ingresa tu contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-card-actions class="d-flex justify-center">
                  <RouterLink :to="{ name: 'searchOrder' }">
                    <v-btn
                      hide-details
                      class="px-8 rounded-lg"
                      color="primary"
                      size="large"
                      @click="submit"
                      variant="flat"
                    >
                      Iniciar Sesión
                    </v-btn>
                  </RouterLink>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  sessionStorage.setItem('rol', 'conductor'); /* cambiar para ver los distintos flujos (conductor - bodeguero - gerente) */
export default {
  data() {
    return {
      visible: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.card2 {
  max-width: 800px; /* Puedes ajustar este valor según tus necesidades */
  width: 100%; /* Asegura que el contenido dentro de la tarjeta se ajuste al tamaño */
}
</style>
