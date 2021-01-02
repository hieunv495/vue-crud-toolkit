<template>
  <smart-window
    :visible="visible"
    :title="title"
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
            :loading="loading"
            color="success"
            class="mr-8"
            @click="submit"
          >
            <v-icon left>mdi-content-save</v-icon>Save
          </v-btn>
        </v-layout>
      </slot>
    </template>

    <slot v-if="errorMessage" name="error" v-bind="self">
      <v-alert type="error">{{ errorMessage }}</v-alert>
    </slot>
    <slot v-bind="self" />
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow";
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

    async sendRequest(formData) {
      this.loading = true;
      this.error = null;

      try {
        let item = await this.createApi(formData);
        this.$emit("success", item);
      } catch (e) {
        console.error(e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style>
</style>