<template>
  <crud-dashboard
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
    <!-- Add this block  -->
    <template
      #trash-mode-navigation="{
        trashMode,
        updateTrashMode,
        normalTotal,
        trashTotal,
      }"
    >
      <v-btn
        :color="!trashMode ? 'success' : 'default'"
        @click="updateTrashMode(false)"
      >
        Normal ({{ normalTotal }} items)
      </v-btn>
      <v-btn
        :color="trashMode ? 'success' : 'default'"
        @click="updateTrashMode(true)"
      >
        Trash ({{ trashTotal }} items)
      </v-btn>
    </template>
    <!-- end -->
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
</template>

<script>
import Vue from "vue";
import { CrudDashboard, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";

export default Vue.extend({
  name: "crud-dashboard-custom-trash-mode-navigation-example",
  components: {
    CrudDashboard,
    DefaultSearchTextFilter,
    PostsTable,
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