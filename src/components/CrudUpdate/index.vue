<template>
  <smart-window
    :visible="!!id"
    :title="title || textUpdateTitle"
    :dialog="dialog"
    :dialog-props="dialogProps"
    @close="$emit('close')"
  >
    <template v-if="$scopedSlots.title" #title>
      <slot name="title" v-bind="self" />
    </template>

    <template #actions>
      <slot name="actions" v-bind="self">
        <v-layout justify-center align-center>
          <v-btn
            :disabled="!beginFormData"
            :loading="updateLoading"
            color="success"
            class="mr-8"
            @click="submit"
          >
            <v-icon left>mdi-content-save</v-icon>{{ textUpdateSubmit }}
          </v-btn>
        </v-layout>
      </slot>
    </template>

    <template v-if="fetchLoading" name="fetch-loading" v-bind="self">
      <v-skeleton-loader type="card" />
    </template>

    <slot v-if="fetchError" name="fetch-error" v-bind="self">
      <error-report
        :loading="fetchLoading"
        :error-message="fetchErrorMessage"
        @retry="fetchData"
      />
    </slot>

    <slot v-if="updateError" name="update-error" v-bind="self">
      <v-layout column class="my-2">
        <v-alert type="error">{{ updateErrorMessage }}</v-alert>
      </v-layout>
    </slot>
    <slot v-if="beginFormData" v-bind="self" />
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow";
import getErrorMessage from "../utils/getErrorMessage";
import ErrorReport from "@/components/ErrorReport/index.vue";

export default {
  name: "crud-update",
  components: { SmartWindow, ErrorReport },
  inject: {
    textUpdateSubmit: { default: "Update" },
    textUpdateTitle: { default: "Update" },
  },
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    apiGetOne: {
      type: Function,
      required: true,
    },
    apiUpdate: {
      type: Function,
      required: true,
    },
    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },
    getBeginFormData: {
      type: Function,
      default: (fetchedData) => JSON.parse(JSON.stringify(fetchedData)),
    },
    title: {
      type: String,
      default: null,
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
      requestId: 0,
      fetchLoading: true,
      fetchError: null,
      fetchedData: null,
      updateLoading: false,
      updateError: null,
      beginFormData: null,
      formBus: new Vue(),
    };
  },
  computed: {
    self() {
      return this;
    },
    fetchErrorMessage() {
      return this.fetchError && this.getErrorMessage(this.fetchError);
    },
    updateErrorMessage() {
      return this.updateError && this.getErrorMessage(this.updateError);
    },
  },

  watch: {
    id(val) {
      if (val) {
        this.fetchLoading = true;
        this.fetchError = null;
        this.fetchedData = null;
        this.updateLoading = false;
        this.updateError = null;
        this.beginFormData = null;

        this.fetchData();
      }
    },
  },
  created() {
    if (this.id) this.fetchData();
  },

  methods: {
    submit() {
      this.formBus.$emit("submit");
    },

    async fetchData() {
      const requestId = ++this.requestId;
      this.fetchLoading = true;
      this.fetchError = null;
      try {
        const result = await this.apiGetOne(this.id);
        if (requestId === this.requestId) {
          this.fetchedData = result;
          this.beginFormData = this.getBeginFormData(this.fetchedData);
        }
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.fetchError = e;
        }
      } finally {
        if (requestId === this.requestId) {
          this.fetchLoading = false;
        }
      }
    },

    async sendRequest(formData) {
      const requestId = ++this.requestId;
      this.updateLoading = true;
      this.updateError = null;

      try {
        const result = await this.apiUpdate(this.id, formData);
        this.$emit("success", result);
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.updateError = e;
        }
      } finally {
        if (requestId === this.requestId) {
          this.updateLoading = false;
        }
      }
    },
  },
};
</script>

<style>
</style>