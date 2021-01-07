<template>
  <div>
    <slot name="header" v-bind="self">
      <v-layout align-center wrap style="gap: 16px">
        <v-flex shrink>
          <slot name="header-title" v-bind="self">
            <v-layout justify-center>
              <v-flex>
                <div class="text-h5">{{ title }}</div>
              </v-flex>
            </v-layout>
          </slot>
        </v-flex>
        <v-flex>
          <slot name="header-filter" v-bind="self">
            <!-- <default-search-text-filter
              :value="filter.q"
              :loading="loading"
              @input="updateFilter({ q: $event })"
            /> -->
          </slot>
        </v-flex>
        <!-- <v-flex shrink>
          <v-layout justify-center style="width: 40px">
            <v-progress-circular
              v-if="loading"
              size="28"
              indeterminate
              color="primary"
            />
          </v-layout>
        </v-flex> -->
        <v-flex shrink>
          <v-btn :loading="loading" icon @click="loadData">
            <v-icon color="success">mdi-refresh</v-icon>
          </v-btn>
        </v-flex>
        <v-flex shrink>
          <slot name="header-actions" v-bind="self">
            <!-- <v-spacer /> -->
            <v-btn v-if="!trashMode" color="success" @click="clickCreate">
              <v-icon left>mdi-plus</v-icon>{{ createButtonLabel }}
            </v-btn>
            <v-btn v-else color="warning" @click="clickEmptyTrash">
              <v-icon left>mdi-delete</v-icon>Empty trash
            </v-btn>
          </slot>
        </v-flex>
      </v-layout>
      <v-divider class="mt-4 mb-4" />

      <slot v-if="hasTrash" name="trash-mode-navigation" v-bind="self">
        <trash-mode-navigation
          :trash-mode="trashMode"
          :normal-total="normalTotal"
          :trash-total="trashTotal"
          @update-trash-mode="updateTrashMode"
        />
        <v-divider />
      </slot>
    </slot>

    <slot v-bind="self">
      Content display
      <pre>{{ JSON.stringify(items, undefined, 2) }}</pre>
    </slot>

    <slot name="footer" v-bind="self">
      <v-layout align-center wrap>
        <v-flex shrink class="mr-2">
          <slot name="footer-limit" v-bind="self">
            <v-layout>
              <v-flex>
                <v-subheader>Rows per page:</v-subheader>
              </v-flex>
              <v-flex>
                <v-select
                  :items="[5, 10, 20, 50, 100]"
                  :value="limit"
                  dense
                  hide-details
                  style="width: 56px; font-size: 14px"
                  @input="updateLimit"
                />
              </v-flex>
            </v-layout>
          </slot>
        </v-flex>
        <v-flex shrink>
          <slot name="footer-statistic" v-bind="self">
            <v-subheader>
              {{ (page - 1) * limit + 1 }} - {{ page * limit }} of {{ total }}
            </v-subheader>
          </slot>
        </v-flex>
        <v-flex>
          <slot name="footer-pagination" v-bind="self">
            <v-row justify="center">
              <v-container style="max-width: 400px">
                <v-pagination
                  :value="page"
                  :length="Math.ceil(total / limit) || 1"
                  @input="updatePage"
                />
              </v-container>
            </v-row>
          </slot>
        </v-flex>
      </v-layout>
    </slot>
  </div>
</template>

<script>
import getErrorMessage from "../utils/getErrorMessage";
import TrashModeNavigation from "./TrashModeNavigation.vue";
import SyncSearchParams from "@/components/utils/SyncSearchParams";

export default {
  name: "crud-dashboard",
  components: {
    TrashModeNavigation,
  },
  props: {
    router: {
      type: Boolean,
      default: false,
    },
    bus: { type: Object, default: null },
    title: {
      type: String,
      required: true,
    },
    defaultFilter: {
      type: Object,
      default: () => ({}),
    },
    defaultLimit: {
      type: Number,
      default: 10,
    },
    defaultPage: {
      type: Number,
      default: 1,
    },
    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },
    getListApi: {
      type: Function,
      required: true,
    },
    getTrashListApi: {
      type: Function,
      required: true,
    },
    normalCountApi: {
      type: Function,
      required: true,
    },
    trashCountApi: {
      type: Function,
      required: true,
    },
    createButtonLabel: {
      type: String,
      default: "Add",
    },
    hasTrash: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      requestId: 0,
      loading: true,
      error: null,
      items: [],
      limit: this.defaultLimit,
      page: this.defaultPage,
      total: 0,
      filter: this.defaultFilter,
      trashMode: false,
      normalTotal: 0,
      trashTotal: 0,
      syncSearchParams: null,
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

  created() {
    if (this.router) {
      this.syncSearchParams = new SyncSearchParams({
        historyPush: false,
        paramTypes: {
          page: {
            type: "number",
            default: this.defaultPage,
          },
          limit: {
            type: "number",
            default: this.defaultLimit,
          },
          filter: {
            type: "json",
            default: this.defaultFilter,
          },
          "trash-mode": {
            type: "json",
            default: false,
          },
        },
        paramsGetter: () => ({
          page: this.page,
          limit: this.limit,
          filter: this.filter,
          "trash-mode": this.trashMode,
        }),
        paramsSetter: async (params) => {
          const isPageChange = this.page !== params.page;

          this.page = params.page;
          this.limit = params.limit;
          this.filter = params.filter;
          this.trashMode = params["trash-mode"];
          await this.loadData();

          if (!isPageChange) {
            this.onLoadNewPageSuccess();
          }
        },
      });

      this.loadData();
    } else {
      this.loadData();
    }

    if (this.bus) {
      this.bus.$on("dashboard-refresh", this.refresh);
      this.bus.$on("dashboard-go-to-page", this.goToPage);
    }
  },

  destroyed() {
    if (this.syncSearchParams) {
      this.syncSearchParams.destroy();
    }

    if (this.bus) {
      this.bus.$off("dashboard-refresh", this.refresh);
      this.bus.$off("dashboard-go-to-page", this.goToPage);
    }
  },

  methods: {
    clickCreate() {
      this.$emit("click-create");
    },

    clickEmptyTrash() {
      this.$emit("click-empty-trash");
    },
    updateTrashMode(mode) {
      this.trashMode = mode;
      this.page = 1;
      this.filter = this.defaultFilter;
      if (this.router) {
        this.syncSearchParams.push();
      }
      this.loadData();
    },

    updateFilter(filter) {
      this.filter = filter;
      this.page = 1;
      if (this.router) {
        this.syncSearchParams.push();
      }
      this.loadData();
    },

    async updatePage(page) {
      this.page = page;

      if (this.router) {
        this.syncSearchParams.push();
      }

      await this.loadData();

      this.onLoadNewPageSuccess();
    },

    onLoadNewPageSuccess() {
      window.document.body.scrollTop = 0;
      window.document.documentElement.scrollTop = 0;
    },

    updateLimit(limit) {
      this.limit = limit;
      if (this.router) {
        this.syncSearchParams.push();
      }
      this.loadData();
    },

    goToPage(page) {
      this.updatePage(page);
    },

    refresh() {
      return this.loadData();
    },

    async loadData() {
      this.loading = true;
      this.error = null;

      const requestId = this.requestId + 1;
      this.requestId = requestId;

      try {
        let get = null;
        if (this.hasTrash) {
          get = this.trashMode ? this.getTrashListApi : this.getListApi;
        } else {
          get = this.getListApi;
        }

        const getListItemsPromise = get({
          ...this.filter,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        });
        const getNormalTotalPromise = this.normalCountApi();
        const getTrashTotalPromise = this.hasTrash ? this.trashCountApi() : 0;

        const [{ items, total }, normalTotal, trashTotal] = await Promise.all([
          getListItemsPromise,
          getNormalTotalPromise,
          getTrashTotalPromise,
        ]);

        if (requestId === this.requestId) {
          this.items = items;
          this.total = total;
          this.normalTotal = normalTotal;
          this.trashTotal = trashTotal;
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