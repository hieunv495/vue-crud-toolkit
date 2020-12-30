<template>
  <smart-window
    :visible="visible"
    :title="title"
    :dialog="dialog"
    :dialog-props="dialogProps"
    @close="$emit('close')"
  >
    <template #actions>
      <slot name="actions" v-bind="this">
        <v-layout justify-center align-center>
          <v-btn
            :loading="loading"
            color="success"
            class="mr-8"
            @click="clickSubmit"
          >
            <v-icon left>mdi-content-save</v-icon>Save
          </v-btn>
        </v-layout>
      </slot>
    </template>

    <slot v-if="errorMessage" name="error">
      <v-alert type="error" class="mt-4">{{ errorMessage }}</v-alert>
    </slot>
    <slot v-bind="this" />
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow.vue";
import getErrorMessage from "../utils/getErrorMessage";

export default Vue.extend({
  name: "crud-create",
  components: { SmartWindow },
  props: {
    createApi: {
      type: Function,
      required: true,
    },
    getErrorMessage: {
      type: Function,
      default: null,
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
      loading: false,
      error: null,
      errorMessage: null,
      beginFormData: this.getBeginFormData(),
      formBus: new Vue(),
    };
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
    clickSubmit() {
      this.formBus.$emit("submit");
    },

    async sendRequest(formData) {
      this.loading = true;
      this.error = null;

      try {
        let item = await this.createApi(formData);
        this.$emit("success", item);
      } catch (e) {
        this.error = e;
        this.errorMessage = this.getErrorMessage
          ? this.getErrorMessage(e)
          : getErrorMessage(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style>
</style>