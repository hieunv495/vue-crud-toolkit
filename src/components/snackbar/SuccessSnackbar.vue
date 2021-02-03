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
// import Vue from "vue";
export default {
  inject: {
    textClose: { default: "Close" },
  },
  props: {
    value: { type: Boolean, required: true },
    message: { type: String, default: "Success!" },
    timeout: { type: Number, required: true },
  },
};
</script>

<style>
</style>