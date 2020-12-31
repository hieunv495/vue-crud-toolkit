<template>
  <smart-window
    :visible="!!id"
    :title="title"
    :dialog="dialog"
    :dialog-props="dialogProps"
    @close="$emit('close')"
  >
    <template v-if="$slots.header" #header>
      <!-- @slot Custom your header -->
      <slot name="header" v-bind="self" />
    </template>

    <template v-if="$slots.actions" #actions>
      <slot name="actions" v-bind="self" />
    </template>

    <template v-if="rawData">
      <slot v-bind="self">
        <pre>{{ JSON.stringify(rawData, undefined, 2) }}</pre>
      </slot>
    </template>
    <template v-else>
      <template v-if="loading">
        <slot name="loading" v-bind="self">
          <v-skeleton-loader type="card" />
        </slot>
      </template>
      <slot v-else-if="error" name="error" v-bind="self">
        <v-alert type="warning">{{ error }}</v-alert>
      </slot>
      <slot v-else-if="!data" name="empty">
        <v-alert type="warning">Empty</v-alert>
      </slot>
      <slot v-else v-bind="self">
        <pre>{{ JSON.stringify(data, undefined, 2) }}</pre>
      </slot>
    </template>
  </smart-window>
</template>

<script>
import Vue from "vue";
import SmartWindow from "../SmartWindow.vue";
import getErrorMessage from "../utils/getErrorMessage";

export default Vue.extend({
  name: "crud-detail",
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
    getErrorMessage: {
      type: Function,
      default: null,
    },
    rawData: {
      type: Object,
      default: null,
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
      loading: true,
      error: null,
      errorMessage: null,
      data: null,
    };
  },

  computed: {
    self() {
      return this;
    },
  },

  watch: {
    id() {
      this.loadData();
    },
  },

  created() {
    if (this.id) {
      this.loadData();
    }
  },

  methods: {
    async loadData() {
      const requestId = ++this.requestId;
      try {
        this.loading = true;
        this.error = null;
        const data = await this.getOneApi(this.id);
        if (requestId === this.requestId) {
          this.data = data;
        }
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.error = e;
          const getMessage = this.getErrorMessage || getErrorMessage;
          this.errorMessage = getMessage(e);
        }
      } finally {
        if (requestId === this.requestId) {
          this.loading = false;
        }
      }
    },
  },
});
</script>

<style>
</style>