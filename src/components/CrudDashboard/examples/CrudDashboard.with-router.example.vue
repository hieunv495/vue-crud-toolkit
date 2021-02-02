<template>
  <div>
    <browser-navigation />
    <v-divider class="my-2" />

    <crud-dashboard
      router
      :bus="bus"
      title="Post manager"
      :default-filter="{ q: '' }"
      :default-page="1"
      :default-per-page="5"
      :get-pagination-api="getPaginationApi"
      :get-trash-pagination-api="getTrashPaginationApi"
      :normal-count-api="normalCountApi"
      :trash-count-api="trashCountApi"
      @click-create="onClickCreate"
      @click-empty-trash="onClickEmptyTrash"
    >
      <template #header-filter="{ loading, filter, updateFilter }">
        <default-search-text-filter
          :loading="loading"
          :value="filter.q"
          @input="updateFilter({ q: $event })"
        />
      </template>
      <template #default="{ items, trashMode }">
        <posts-table :items="items" :trash-mode="trashMode" />
      </template>
    </crud-dashboard>
  </div>
</template>

<script>
import Vue from "vue";
import { CrudDashboard, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";
import BrowserNavigation from "@/components/BrowserNavigation";

export default Vue.extend({
  name: "crud-dashboard-with-router-example",
  components: {
    CrudDashboard,
    DefaultSearchTextFilter,
    PostsTable,
    BrowserNavigation,
  },
  data() {
    return {
      bus: new Vue(),
    };
  },
  methods: {
    getPaginationApi: postsApi.getPagination,
    getTrashPaginationApi: postsApi.getTrashPagination,
    normalCountApi: postsApi.normalCount,
    trashCountApi: postsApi.trashCount,
    onClickCreate() {
      alert("Create");
    },
    onClickEmptyTrash() {
      alert("Empty trash");
    },
  },
});
</script>

<style>
</style>