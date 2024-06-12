<template>
  <v-text-field
  :class="classs"
  :rules="[rules.required]"
  :append-inner-icon="visibles ? 'mdi-eye-off' : 'mdi-eye'"
  :type="visibles ? 'text' : 'password'"
  :density="density"
  :placeholder="placeholder"
  :prepend-inner-icon="prependInnerIcon"
  :variant="variant"
  @click:append-inner="visibles = !visibles"
  @input="input"
  :height="height"
  :v-model="vModel"


  ></v-text-field>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      rules: {
        required: (value) =>  !!value || "Required."
      },
    };
  },
  props: [
    "classs",
    "density",
    "placeholder",
    "visible",
    "prependInnerIcon",
    "variant",
    "vModel",
    "onClick",
    "input",
    "height"
  ],
  setup() {
    let visibles = ref(false);
    return {
      visibles,
    };
  },
};
</script>
