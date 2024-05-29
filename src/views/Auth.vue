<template>
  <v-container class="mx-lg-16 mx-2">
    <div class="login">
      <v-row no-gutters class="card2">
        <v-col>
          <v-card class="rounded-xl pa-16">
            <h1 class="font-weight-bold text-primary text-uppercase">
              Inicio de Sesión
            </h1>
            <form @submit.prevent="login">
              <v-row>
                <v-col cols="12">
                  {{ console.log(authStore?.error) }}
                  <h4
                    v-if="authStore?.error == 403"
                    class="text-red-lighten-1 font-weight-light text-subtitle-2 mb-1"
                  >
                    Nombre de usuario o contraseña incorrectos
                  </h4>
                  <h2 class="text-primary font-weight-bold mb-1">Usuario</h2>
                  <InputC
                    :vModel="inputs?.user"
                    classs="mb-2"
                    density="compact"
                    placeholder="Email"
                    prependInnerIcon="mdi-account-circle"
                    variant="outlined"
                    :input="userInput"
                  />
                  <h2 class="text-primary font-weight-bold mb-1">Contraseña</h2>
                  <InputPassword
                    :vModel="inputs?.password"
                    classs="mb-2"
                    density="compact"
                    placeholder="Ingresa tu contraseña"
                    prependInnerIcon="mdi-lock-outline"
                    variant="outlined"
                    :input="passwordInput"
                  />
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      v-if="authStore?.isLoading"
                      hide-details
                      class="px-8 rounded-lg loading-button"
                      size="large"
                      type="submit"
                      variant="flat"
                    >
                      Iniciar Sesión...
                    </v-btn>
                    <v-btn
                      v-else
                      hide-details
                      class="px-8 rounded-lg"
                      color="primary"
                      size="large"
                      type="submit"
                      variant="flat"
                    >
                      Iniciar Sesión
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { onMounted, ref } from "vue";
import InputC from "../components/inputs/InputC.vue";
import InputPassword from "../components/inputs/InputPassword.vue";
import { useAuthStore } from "../stores/Auth";
import { useRouter } from "vue-router";

export default {
  components: { InputC, InputPassword },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    let inputs = ref({
      user: "",
      password: "",
    });
    const login = () => {
      const redirect = () => {
        router.push("/searchOrder");
      };
      authStore.login(inputs.value.user, inputs.value.password, redirect);
    };
    const userInput = (event) => {
      inputs.value.user = event.target.value;
    };
    const passwordInput = (event) => {
      inputs.value.password = event.target.value;
    };
    onMounted(() => {
      authStore.error = 0;
    });
    return {
      login,
      inputs,
      userInput,
      passwordInput,
      authStore,
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
.loading-button {
  background-color: #4a5da3;
  color: #d0d4e2;
}
</style>
