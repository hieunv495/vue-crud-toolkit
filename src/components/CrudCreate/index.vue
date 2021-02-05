<template>
  <v-alert v-if="!access.create" type="warning">Access denied!</v-alert>
  <smart-window
    v-else-if="visible"
    :title="title || textCreateTitle"
    :card="card"
    :card-props="cardProps"
    @close="$emit('close')"
  >
    <template v-if="$scopedSlots.header" #header>
      <!-- @slot Custom your header -->
      <slot name="header" v-bind="self" />
    </template>

    <template v-if="$scopedSlots.title" #title>
      <slot name="title" v-bind="self" />
    </template>

    <template #actions>
      <slot name="actions" v-bind="self">
        <v-layout justify-center align-center>
          <v-btn :loading="loading" color="success" @click="submit">
            <v-icon left>mdi-content-save</v-icon>{{ textCreateSubmit }}
          </v-btn>
        </v-layout>
      </slot>
    </template>

    <slot v-if="errorMessage" name="error" v-bind="self">
      <v-layout column class="my-2">
        <v-alert type="error">{{ errorMessage }}</v-alert>
      </v-layout>
    </slot>
    <slot v-bind="self" />
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow";
import getErrorMessage from "../utils/getErrorMessage";

export default {
  name: "crud-create",
  components: { SmartWindow },
  inject: {
    access: { default: { create: true } },
    textCreateTitle: { default: "Create" },
    textCreateSubmit: { default: "Save" },
  },
  props: {
    apiCreate: {
      type: Function,
      required: true,
    },
    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },
    getBeginFormData: {
      type: Function,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    card: {
      type: Boolean,
      default: false,
    },
    cardProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      beginFormData: this.getBeginFormData(),
      formBus: new Vue(),
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
        this.loading = false;
        this.error = null;
        this.beginFormData = this.getBeginFormData();
      }
    },
  },

  methods: {
    submit() {
      this.formBus.$emit("submit");
    },

    close() {
      this.$emit("close");
    },

    async sendRequest(formData) {
      this.loading = true;
      this.error = null;

      try {
        let item = await this.apiCreate(formData);
        this.$emit("success", item);
      } catch (e) {
        console.error(e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>