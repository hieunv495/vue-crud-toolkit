<template>
  <smart-window
    :visible="!!id"
    :title="title"
    :dialog="dialog"
    :dialog-props="dialogProps"
    @close="$emit('close')"
  >
    <template #actions>
      <slot name="actions" v-bind="this" />
    </template>

    <template v-if="rawData">
      <slot v-bind="this">
        <pre>{{ JSON.stringify(rawData, undefined, 2) }}</pre>
      </slot>
    </template>
    <template v-else>
      <template v-if="loading" name="loading" v-bind="this">
        <v-skeleton-loader type="card" />
      </template>
      <slot v-else-if="error" name="error" v-bind="this">
        <v-alert type="warning">{{ error.message }}</v-alert>
      </slot>
      <slot v-else-if="!data" name="empty">
        <v-alert type="info">Không có dữ liệu</v-alert>
      </slot>
      <slot v-else v-bind="this">
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
      data: null,
    };
  },

  computed: {
    vuetify() {
      return this.$vuetify;
    },
    icons() {
      return this.$vuetify.icons.component;
    },
  },

  watch: {
    visible() {
      this.loadData();
    },
    id() {
      this.loadData();
    },
  },

  created() {
    if (this.visible) {
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
        console.log(e);
        const getMessage = this.getErrorMessage || getErrorMessage;
        if (requestId === this.requestId) this.error = getMessage(e);
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