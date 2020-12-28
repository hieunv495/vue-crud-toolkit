<template>
  <v-dialog
    v-if="dialog"
    :value="visible"
    scrollable
    v-bind="dialogProps"
    @input="$emit('close')"
  >
    <v-card :key="key">
      <slot name="header" v-bind="this">
        <v-layout align-center>
          <v-flex>
            <v-card-title>{{ title }}</v-card-title>
          </v-flex>
          <v-flex shrink>
            <v-btn icon large @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </slot>
      <v-card-text>
        <slot v-bind="this" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" v-bind="this" />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div v-else-if="visible" :key="key">
    <slot name="header" v-bind="this">
      <v-layout align="center">
        <v-flex shrink>
          <v-btn color="success" class="mr-8" @click="$emit('close')">
            <v-icon left>mdi-arrow-left</v-icon>
            {{ backTitle }}</v-btn
          >
        </v-flex>
        <v-flex>
          <h1 class="text-h5">{{ title }}</h1>
        </v-flex>
        <v-flex shrink>
          <slot name="actions" v-bind="this" />
        </v-flex>
      </v-layout>
    </slot>
    <slot v-bind="this" />
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "smart-window",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    backTitle: {
      type: String,
      default: "Back",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    dialogProps: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      key: 0,
    };
  },
  watch: {
    visible(val) {
      if (val) this.key++;
    },
  },
});
</script>

<style>
</style>