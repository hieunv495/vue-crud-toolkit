<template>
  <v-layout column justify-center align-center class="my-8">
    <v-alert min-width="200" type="warning">{{ errorMessage }}</v-alert>
    <v-btn :loading="loading" outlined @click="$emit('retry')">
      <v-icon left>mdi-refresh</v-icon>
      Retry
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: "error-report",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>