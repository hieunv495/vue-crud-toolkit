<template>
  <smart-window
    :visible="!!id"
    :title="title"
    :dialog="dialog"
    :dialog-props="dialogProps"
    @close="$emit('close')"
  >
    <template #actions>
      <slot name="actions" v-bind="self">
        <v-layout justify-center align-center>
          <v-btn
            :disabled="!beginFormData"
            :loading="updateLoading"
            color="success"
            class="mr-8"
            @click="clickSubmit"
          >
            <v-icon left>mdi-content-save</v-icon>Save
          </v-btn>
        </v-layout>
      </slot>
    </template>

    <template v-if="fetchLoading" name="fetch-loading" v-bind="self">
      <v-skeleton-loader type="card" />
    </template>

    <slot v-if="fetchError" name="fetch-error">
      <v-alert type="error" class="mt-4">{{ fetchError }}</v-alert>
    </slot>

    <slot v-if="updateError" name="update-error">
      <v-alert type="error" class="mt-4">{{ updateError }}</v-alert>
    </slot>
    <slot v-if="beginFormData" v-bind="self" />
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow.vue";
import getErrorMessage from "../utils/getErrorMessage";

export default Vue.extend({
  name: "crud-update",
  components: { SmartWindow },
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    getOneApi: {
      type: Function,
      required: true,
    },
    updateApi: {
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
      required: true,
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
    clickSubmit() {
      this.formBus.$emit("submit");
    },

    async fetchData() {
      const requestId = ++this.requestId;
      this.fetchLoading = true;
      this.fetchError = null;
      try {
        const result = await this.getOneApi(this.id);
        if (requestId === this.requestId) {
          this.fetchedData = result;
          this.beginFormData = this.getBeginFormData(this.fetchedData);
        }
      } catch (e) {
        if (requestId === this.requestId) {
          this.fetchError = this.getErrorMessage(e);
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
        const result = await this.updateApi(this.id, formData);
        this.$emit("success", result);
      } catch (e) {
        if (requestId === this.requestId) {
          this.updateError = this.getErrorMessage(e);
        }
      } finally {
        if (requestId === this.requestId) {
          this.updateLoading = false;
        }
      }
    },
  },
});
</script>

<style>
</style>