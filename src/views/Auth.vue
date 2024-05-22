<template>
  <v-row class="fill-height">
    <v-col cols="12" lg="6" md="8" sm="10">
      <v-card ref="form" >
        <h1 class="text-center pa-2">Empresa Logo</h1>
        <v-form d-flex align-content-center>
          <v-container fluid>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  width="100%"
                  label="User"
                  hide-details
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show2 ? 'text' : 'password'"
                  class="input-group--focused"
                  label="Password"
                  name="input-10-2"
                  hide-details
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-tooltip v-if="formHasErrors" location="left">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="my-0"
                icon
                v-bind="attrs"
                v-on="on"
                @click="resetForm"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh form</span>
          </v-tooltip>
          <RouterLink
            :to="{
              name: 'searchOrder',
            }"
          >
            <v-btn color="primary" variant="text" @click="submit">
              Ingresar
            </v-btn>
          </RouterLink>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>

<style>
.fill-height {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mt-12 {
  margin-top: 12px;
}
</style>
