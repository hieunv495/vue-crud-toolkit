<template>
  <v-snackbar
    :value="value"
    :color="'success'"
    :multi-line="false"
    :timeout="timeout"
    :top="true"
    :vertical="false"
    @input="$emit('input', $event)"
  >
    {{ message }}
    <v-btn dark text @click="$emit('input', false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
// import Vue from "vue";
export default {
  props: {
    value: { type: Boolean, required: true },
    message: { type: String, default: "Success!" },
    timeout: { type: Number, required: true },
  },
};
</script>

<style>
</style>