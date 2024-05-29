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
                <InputC
                  classs="mb-2"
                  density="compact"
                  placeholder="Email"
                  prependInnerIcon="mdi-account-circle"
                  variant="outlined"
                />
                <h2 class="text-primary font-weight-bold mb-1">Contraseña</h2>
                <InputPassword
                  classs="mb-2"
                  density="compact"
                  placeholder="Ingresa tu contraseña"
                  prependInnerIcon="mdi-lock-outline"
                  variant="outlined"
                />
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
import InputC from "../components/inputs/InputC.vue";
import InputPassword from "../components/inputs/InputPassword.vue";

sessionStorage.setItem(
  "rol",
  "bodeguero"
); /* cambiar para ver los distintos flujos (conductor - bodeguero - gerente) */
export default {
  components: { InputC, InputPassword },
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
