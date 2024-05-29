<template>
  <v-text-field
    @input="input"
    :name="name"
    :v-model="vModel"
    :hide-details="hideDetails"
    :class="classs"
    :rules="!isSearch? [rules.required] : undefined"
    :density="density"
    :placeholder="placeholder"
    :prepend-inner-icon="innerIcon"
    :append-inner-icon="appendInnerIcon"
    :variant="variant"
    :label="label"
    :height="height"
    @keypress="onlyNumber ? onlyNumbers($event) : undefined"
  ></v-text-field>
</template>

<script>
export default {
  methods: {
    onlyNumbers(event) {
      const charCode = event.charCode ? event.charCode : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
  },
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
