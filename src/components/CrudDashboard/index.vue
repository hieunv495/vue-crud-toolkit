<template>
  <crud-single-dashboard
    v-if="!trashMode"
    key="normal"
    :router="router"
    :bus="bus"
    :title="title"
    :default-filter="defaultNormalFilter"
    :default-page="defaultNormalPage"
    :default-per-page="defaultNormalPerPage"
    :get-error-message="getErrorMessage"
    :api-pagination="apiNormalPagination"
    @load-data="fetchTotalData"
    @click-create="$emit('click-create')"
  >
    <template v-for="slotName in normalSlots" #[slotName]="dashboard">
      <slot :name="'normal-' + slotName" v-bind="dashboard" />
    </template>

    <template #after-header="dashboard">
      <slot v-if="hasTrash" name="normal-after-header" v-bind="dashboard">
        <slot name="trash-mode-navigation" v-bind="self">
          <trash-mode-navigation
            :trash-mode="trashMode"
            :normal-total="normalTotal"
            :trash-total="trashTotal"
            @update-trash-mode="updateTrashMode"
          />
          <v-divider />
        </slot>
      </slot>
    </template>
  </crud-single-dashboard>
  <crud-single-dashboard
    v-else
    key="trash"
    :router="router"
    :bus="bus"
    :title="title"
    :default-filter="defaultTrashFilter"
    :default-page="defaultTrashPage"
    :default-per-page="defaultTrashPerPage"
    :get-error-message="getErrorMessage"
    :api-pagination="apiTrashPagination"
    @load-data="fetchTotalData"
    @click-empty-trash="$emit('click-empty-trash')"
  >
    <template v-for="slotName in trashSlots" #[slotName]="dashboard">
      <slot :name="'trash-' + slotName" v-bind="dashboard" />
    </template>

    <template #after-header="dashboard">
      <slot v-if="hasTrash" name="trash-after-header" v-bind="dashboard">
        <slot name="trash-mode-navigation" v-bind="self">
          <trash-mode-navigation
            :trash-mode="trashMode"
            :normal-total="normalTotal"
            :trash-total="trashTotal"
            @update-trash-mode="updateTrashMode"
          />
          <v-divider />
        </slot>
      </slot>
    </template>
    <template #header-actions="dashboard">
      <slot name="trash-header-actions" v-bind="dashboard">
        <v-btn
          v-if="access.emptyTrash"
          color="warning"
          @click="$emit('click-empty-trash')"
        >
          <v-icon left>mdi-delete</v-icon>{{ textEmptyTrashActivator }}
        </v-btn>
        <v-divider />
      </slot>
    </template>
  </crud-single-dashboard>
</template>

<script>
import getErrorMessage from "../utils/getErrorMessage";
import TrashModeNavigation from "./TrashModeNavigation.vue";
import SyncSearchParams from "@/components/utils/SyncSearchParams";
import CrudSingleDashboard from "./CrudSingleDashboard.vue";

export default {
  name: "crud-dashboard",
  components: {
    TrashModeNavigation,
    CrudSingleDashboard,
  },
  inject: {
    access: { default: { emptyTrash: true } },
    textEmptyTrashActivator: { default: "Empty trash" },
  },
  props: {
    router: {
      type: Boolean,
      default: false,
    },
    bus: { type: Object, default: null },
    title: {
      type: String,
      default: null,
    },
    defaultNormalFilter: {
      type: Object,
      default: () => ({}),
    },
    defaultNormalPage: {
      type: Number,
      default: 1,
    },
    defaultNormalPerPage: {
      type: Number,
      default: 10,
    },
    defaultTrashFilter: {
      type: Object,
      default: () => ({}),
    },
    defaultTrashPage: {
      type: Number,
      default: 1,
    },
    defaultTrashPerPage: {
      type: Number,
      default: 10,
    },
    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },
    apiNormalPagination: {
      type: Function,
      required: true,
    },
    apiTrashPagination: {
      type: Function,
      required: true,
    },
    apiNormalCount: {
      type: Function,
      required: true,
    },
    apiTrashCount: {
      type: Function,
      required: true,
    },
    hasTrash: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      fetchTotalDataLoading: false,
      fetchTotalDataError: null,
      normalTotal: 0,
      trashTotal: 0,
      SyncSearchParams: null,
      trashMode: false,
    };
  },
  computed: {
    self() {
      return this;
    },
    normalSlots() {
      return Object.keys(this.$scopedSlots)
        .filter(
          (name) => name.startsWith("normal-") && name !== "normal-after-header"
        )

        .map((name) => name.substring("normal-".length));
    },
    trashSlots() {
      return Object.keys(this.$scopedSlots)
        .filter(
          (name) =>
            name.startsWith("trash-") &&
            name !== "trash-after-header" &&
            name !== "trash-header-actions"
        )
        .map((name) => name.substring("trash-".length));
    },
  },
  created() {
    if (this.router) {
      this.syncSearchParams = new SyncSearchParams({
        historyPush: false,
        paramTypes: {
          "trash-mode": {
            type: "json",
            default: false,
            cleanDefault: true,
          },
        },
        paramsGetter: () => ({
          "trash-mode": this.trashMode,
        }),
        paramsSetter: async (params) => {
          this.trashMode = params["trash-mode"];
        },
      });
    }
  },

  destroyed() {
    if (this.syncSearchParams) {
      this.syncSearchParams.destroy();
    }
  },
  methods: {
    async fetchTotalData() {
      this.fetchTotalDataLoading = true;
      this.fetchTotalDataError = null;
      try {
        const getNormalTotalPromise = this.apiNormalCount();
        const getTrashTotalPromise = this.hasTrash ? this.apiTrashCount() : 0;
        const [normalTotal, trashTotal] = await Promise.all([
          getNormalTotalPromise,
          getTrashTotalPromise,
        ]);
        this.normalTotal = normalTotal;
        this.trashTotal = trashTotal;
      } catch (e) {
        console.error(e);
        this.fetchTotalDataError = e;
      }
    },
    updateTrashMode(mode) {
      this.trashMode = mode;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
  },
};
</script>

<style>
</style>