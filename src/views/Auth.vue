<template>
  <v-row class="fill-height">
    <v-col cols="12" lg="6" md="8" sm="10">
      <v-card ref="form" class="pa-4 mx-2">
        <h1 class="text-center pa-2">Empresa Logo</h1>
        <v-form class="text-center">
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="10" md="8">
                <v-text-field
                  label="User"
                  hide-details
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="10" md="8">
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show2 ? 'text' : 'password'"
                  label="Password"
                  name="input-10-2"
                  hide-details
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider class="mt-4"></v-divider>
        <v-card-actions class="d-flex justify-end">
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
            :to="{ name: 'searchOrder' }"
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
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
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
.mt-4 {
  margin-top: 16px;
}
.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
