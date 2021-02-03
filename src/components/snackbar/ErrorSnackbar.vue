<template>
  <v-snackbar
    :value="value"
    :top="true"
    :color="'warning'"
    :multi-line="false"
    :timeout="timeout"
    :vertical="false"
    @input="$emit('input', $event)"
  >
    <v-layout align-center>
      <v-flex>
        {{ message }}
      </v-flex>
      <v-flex shrink>
        <v-btn dark text @click="$emit('input', false)">{{ textClose }}</v-btn>
      </v-flex>
    </v-layout>
  </v-snackbar>
</template>

<script>
export default {
  name: "error-snackbar",
  inject: {
    textClose: { default: "Close" },
  },
  props: {
    value: { type: Boolean, required: true },
    message: { type: String, default: "An error occur!" },
    timeout: { type: Number, required: true },
  },
};
</script>

<style>
</style>