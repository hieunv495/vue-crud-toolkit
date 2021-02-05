<template>
  <smart-window
    v-if="!!id"
    :title="title || textDetailTitle"
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
        <v-btn
          :disabled="!data"
          :title="textUpdateActivator"
          large
          icon
          color="success"
          @click="$emit('open-update')"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </slot>
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
        <error-report
          :loading="loading"
          :error-message="errorMessage"
          @retry="loadData"
        />
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
import SmartWindow from "../SmartWindow";
import getErrorMessage from "../utils/getErrorMessage";
import ErrorReport from "@/components/ErrorReport/index.vue";

export default {
  name: "crud-detail",
  components: { SmartWindow, ErrorReport },
  inject: {
    textDetailTitle: { default: "Detail" },
    textUpdateActivator: { default: "Update" },
  },
  props: {
    bus: { type: Object, default: null },
    id: {
      type: [String, Number],
      default: null,
    },
    apiGetOne: {
      type: Function,
      required: true,
    },
    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },
    rawData: {
      type: Object,
      default: null,
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
      requestId: 0,
      loading: true,
      error: null,
      data: null,
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
    id(val) {
      if (val) this.loadData();
    },
  },

  created() {
    if (this.id) {
      this.loadData();
    }

    if (this.bus) {
      this.bus.$on("refresh-detail", this.loadData);
    }
  },

  destroyed() {
    if (this.bus) {
      this.bus.$off("refresh-detail", this.loadData);
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async loadData() {
      if (!this.id) return;
      const requestId = ++this.requestId;
      try {
        this.loading = true;
        this.error = null;
        const data = await this.apiGetOne(this.id);
        if (requestId === this.requestId) {
          this.data = data;
        }
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.error = e;
        }
      } finally {
        if (requestId === this.requestId) {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style>
</style>