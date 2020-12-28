<template>
  <v-layout align-center>
    <v-btn
      :color="trashMode ? 'normal' : 'success'"
      text
      @click="$emit('update-trash-mode', false)"
      >Available ({{ normalTotal }})</v-btn
    >
    <span>|</span>
    <v-btn
      :color="trashMode ? 'success' : 'normal'"
      text
      @click="$emit('update-trash-mode', true)"
      >Trash ({{ trashTotal }})</v-btn
    >
  </v-layout>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "trash-mode-navigation",
  props: {
    trashMode: {
      type: Boolean,
      required: true,
    },

    normalTotal: {
      type: Number,
      required: true,
    },
    trashTotal: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style>
</style>