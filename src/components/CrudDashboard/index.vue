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
              <v-icon left>mdi-plus</v-icon>{{ textCreate }}
            </v-btn>
            <v-btn v-else color="warning" @click="clickEmptyTrash">
              <v-icon left>mdi-delete</v-icon>{{ textEmptyTrash }}
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
          :text-normal="textNormal"
          :text-trash="textTrash"
          @update-trash-mode="updateTrashMode"
        />
        <v-divider />
      </slot>
    </slot>

    <slot v-if="error" name="error" v-bind="self">
      <error-report
        :loading="loading"
        :error-message="errorMessage"
        @retry="loadData"
      />
    </slot>

    <slot v-else v-bind="self">
      Content display
      <pre>{{ JSON.stringify(items, undefined, 2) }}</pre>
    </slot>

    <slot name="footer" v-bind="self">
      <v-layout align-center wrap>
        <v-flex shrink class="mr-2">
          <slot name="footer-per-page" v-bind="self">
            <v-layout>
              <v-flex>
                <v-subheader>Rows per page:</v-subheader>
              </v-flex>
              <v-flex>
                <v-select
                  :items="[5, 10, 20, 50, 100]"
                  :value="perPage"
                  dense
                  hide-details
                  style="width: 56px; font-size: 14px"
                  @input="updatePerPage"
                />
              </v-flex>
            </v-layout>
          </slot>
        </v-flex>
        <v-flex shrink>
          <slot name="footer-statistic" v-bind="self">
            <v-subheader>
              {{ (page - 1) * perPage + 1 }} - {{ page * perPage }} of
              {{ count }}
            </v-subheader>
          </slot>
        </v-flex>
        <v-flex>
          <slot name="footer-pagination" v-bind="self">
            <v-row justify="center">
              <v-container style="max-width: 400px">
                <v-pagination
                  :value="page"
                  :length="Math.ceil(count / perPage) || 1"
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
import ErrorReport from "@/components/ErrorReport/index.vue";

export default {
  name: "crud-dashboard",
  components: {
    TrashModeNavigation,
    ErrorReport,
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
    defaultPage: {
      type: Number,
      default: 1,
    },
    defaultPerPage: {
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
    textCreate: {
      type: String,
      default: "Add",
    },
    textNormal: {
      type: String,
      default: "Normal",
    },
    textTrash: {
      type: String,
      default: "Trash",
    },
    textEmptyTrash: {
      type: String,
      default: "Empty trash",
    },
  },

  data() {
    return {
      requestId: 0,
      loading: true,
      error: null,
      count: 0,
      items: [],
      perPage: this.defaultPerPage,
      page: this.defaultPage,
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
            cleanDefault: true,
          },
          perPage: {
            type: "number",
            default: this.defaultPerPage,
            cleanDefault: true,
          },
          filter: {
            type: "json",
            default: this.defaultFilter,
            cleanDefault: true,
          },
          "trash-mode": {
            type: "json",
            default: false,
            cleanDefault: true,
          },
        },
        paramsGetter: () => ({
          page: this.page,
          perPage: this.perPage,
          filter: this.filter,
          "trash-mode": this.trashMode,
        }),
        paramsSetter: async (params) => {
          const isPageChange = this.page !== params.page;

          this.page = params.page;
          this.perPage = params.perPage;
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

    updatePerPage(perPage) {
      this.perPage = perPage;
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
          get = this.trashMode
            ? this.apiTrashPagination
            : this.apiNormalPagination;
        } else {
          get = this.apiNormalPagination;
        }

        const getPaginationPromise = get({
          filter: this.filter,
          page: this.page,
          perPage: this.perPage,
        });
        const getNormalTotalPromise = this.apiNormalCount();
        const getTrashTotalPromise = this.hasTrash ? this.apiTrashCount() : 0;

        const [{ items, count }, normalTotal, trashTotal] = await Promise.all([
          getPaginationPromise,
          getNormalTotalPromise,
          getTrashTotalPromise,
        ]);

        if (requestId === this.requestId) {
          this.items = items;
          this.count = count;
          this.normalTotal = normalTotal;
          this.trashTotal = trashTotal;
        }
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.error = e;
          this.items = [];
          this.count = 0;
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