<template>
  <div>
    <slot name="header" v-bind="this">
      <v-layout align-center>
        <v-flex shrink>
          <slot name="header-title" v-bind="this">
            <div class="text-h5">{{ title }}</div>
          </slot>
        </v-flex>
        <v-flex class="mx-8">
          <slot name="header-filter" v-bind="this">
            <!-- <default-search-text-filter
              :value="filter.q"
              :loading="loading"
              @input="updateFilter({ q: $event })"
            /> -->
          </slot>
        </v-flex>
        <v-flex shrink>
          <slot name="header-actions" v-bind="this">
            <!-- <v-spacer /> -->
            <v-btn v-if="!trashMode" color="success" @click="clickCreate">
              <v-icon left>mdi-plus</v-icon>{{ createButtonLabel }}
            </v-btn>
            <v-btn v-else color="success" @click="clickEmptyTrash">
              <v-icon left>mdi-delete</v-icon>Empty trash
            </v-btn>
          </slot>
        </v-flex>
      </v-layout>
      <v-divider class="mt-4 mb-4" />

      <slot v-if="hasTrash" name="trash-mode-navigation" v-bind="this">
        <trash-mode-navigation
          :trash-mode="trashMode"
          :normal-total="normalTotal"
          :trash-total="trashTotal"
          @update-trash-mode="updateTrashMode"
        />
        <v-divider />
      </slot>
      <!-- <slot v-else name="normal-total" v-bind="this">
        Tổng: {{ normalTotal }}
      </slot> -->
    </slot>

    <slot v-bind="this">
      Content display
      <pre>{{ JSON.stringify(items, undefined, 2) }}</pre>
    </slot>

    <slot name="footer" v-bind="this">
      <v-row align="center">
        <v-flex shrink>
          <slot name="footer-statistic" v-bind="this">
            <v-subheader
              >{{ (page - 1) * limit + 1 }} - {{ page * limit }} /
              {{ total }} results</v-subheader
            >
          </slot>
        </v-flex>
        <v-flex>
          <slot name="footer-pagination" v-bind="this">
            <v-container>
              <v-row justify="center">
                <v-container style="max-width: 400px">
                  <v-pagination
                    :value="page"
                    :length="Math.ceil(total / limit) || 1"
                    @input="updatePage"
                  />
                </v-container>
              </v-row>
            </v-container>
          </slot>
        </v-flex>
      </v-row>
    </slot>
  </div>
</template>

<script>
import Vue from "vue";
import getErrorMessage from "../utils/getErrorMessage";
import TrashModeNavigation from "./TrashModeNavigation.vue";

export default Vue.extend({
  name: "crud-dashboard",
  components: {
    TrashModeNavigation,
  },
  props: {
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
      default: null,
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
      errorMessage: null,
      items: [],
      limit: this.defaultLimit,
      page: this.defaultPage,
      total: 0,
      filter: this.defaultFilter,
      trashMode: false,
      normalTotal: 0,
      trashTotal: 0,
    };
  },

  created() {
    this.loadData();

    if (this.bus) {
      this.bus.$on("dashboard-refresh", this.refresh);
      this.bus.$on("dashboard-go-to-page", this.goToPage);
    }
  },

  destroyed() {
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
      this.loadData();
    },

    updateFilter(filter) {
      this.filter = filter;
      this.page = 1;
      this.loadData();
    },

    updatePage(page) {
      this.page = page;
      this.loadData();
    },

    goToPage(page) {
      return this.loadData(page);
    },

    refresh() {
      return this.loadData();
    },

    async loadData(page) {
      page = page || this.page;
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
          offset: (page - 1) * this.limit,
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
          this.page = page;
        }
      } catch (e) {
        console.error(e);
        if (requestId === this.requestId) {
          this.error = e;
          this.errorMessage = this.getErrorMessage
            ? this.getErrorMessage(e)
            : getErrorMessage(e);
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