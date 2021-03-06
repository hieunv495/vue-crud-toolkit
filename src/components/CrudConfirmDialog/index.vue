<template>
  <v-dialog :value="visible" max-width="400" @input="$emit('close')">
    <v-card>
      <v-card-title class="headline">
        <slot name="title" v-bind="self">
          {{ title }}
        </slot>
      </v-card-title>
      <v-card-text>
        <slot name="message" v-bind="self">
          {{ message }}
        </slot>
      </v-card-text>
      <v-card-text>
        <slot v-if="errorMessage" name="error" v-bind="self">
          <v-alert type="error">{{ errorMessage }}</v-alert>
        </slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions" v-bind="self">
          <v-layout justify-end>
            <v-btn color="darken-1" text class="mr-2" @click="$emit('close')">
              {{ cancelButtonLabel || textCancel }}
            </v-btn>
            <v-btn
              :loading="loading"
              color="warning darken-1"
              text
              @click="sendRequest"
            >
              {{ acceptButtonLabel || textAccept }}
            </v-btn>
          </v-layout>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getErrorMessage from "../utils/getErrorMessage";

export default {
  name: "crud-confirm-dialog",
  inject: {
    textCancel: { default: "Cancel" },
    textAccept: { default: "Accept" },
  },
  props: {
    id: { type: [String, Number], default: null },
    visible: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    cancelButtonLabel: { type: String, default: null },
    acceptButtonLabel: { type: String, default: null },
    apiRequest: { type: Function, required: true },
    getErrorMessage: { type: Function, default: getErrorMessage },
  },

  data() {
    return {
      loading: false,
      error: null,
    };
  },

  computed: {
    self() {
      return this;
    },
    errorMessage() {
      return this.error && this.getErrorMessage(this.error);
    },
  },

  watch: {
    visible(val) {
      if (val) {
        this.reset();
      }
    },
  },

  methods: {
    reset() {
      this.loading = false;
      this.error = null;
    },
    async sendRequest() {
      this.loading = true;
      this.error = null;
      try {
        const result = await this.apiRequest(this.id);
        this.$emit("success", result);
      } catch (error) {
        console.error(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>