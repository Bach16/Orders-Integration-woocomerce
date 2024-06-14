<template>
  <v-text-field
    @input="input"
    :name="name"
    :v-model="vModel"
    :hide-details="hideDetails"
    :class="classs"
    :rules="!isSearch? [rules.required] : undefined"
    :placeholder="placeholder"
    :variant="variant"
    :height="height"
    @keypress="onlyNumber ? this.$onlyNumbers($event) : undefined"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  props: [
    "classs",
    "density",
    "placeholder",
    "innerIcon",
    "variant",
    "input",
    "name",
    "vModel",
    "hideDetails",
    "appendInnerIcon",
    "label",
    "height",
    "onlyNumber",
    "isSearch"
  ],
};
</script>
