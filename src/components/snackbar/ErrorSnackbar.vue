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
    {{ message }}
    <v-btn dark text @click="$emit('input', false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'error-snackbar',
  props: {
    value: { type: Boolean, required: true },
    message: { type: String, default: 'An error occur!' },
    timeout: { type: Number, required: true },
  },
});
</script>

<style>
</style>