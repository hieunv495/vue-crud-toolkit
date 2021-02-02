<template>
  <v-layout align-center>
    <v-btn
      :color="trashMode ? 'normal' : 'success'"
      text
      @click="$emit('update-trash-mode', false)"
      >{{ textNormal }} ({{ normalTotal }})</v-btn
    >
    <span>|</span>
    <v-btn
      :color="trashMode ? 'success' : 'normal'"
      text
      @click="$emit('update-trash-mode', true)"
      >{{ textTrash }} ({{ trashTotal }})</v-btn
    >
  </v-layout>
</template>

<script>
export default {
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
    textNormal: {
      type: String,
      default: "Normal",
    },
    textTrash: {
      type: String,
      default: "Trash",
    },
  },
};
</script>

<style>
</style>