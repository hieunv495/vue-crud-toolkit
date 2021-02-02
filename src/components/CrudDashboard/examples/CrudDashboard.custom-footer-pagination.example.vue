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
    <template #footer-pagination="{ page, perPage, count, updatePage }">
      <v-container>
        <v-row justify="center">
          <v-container style="max-width: 400px">
            <v-pagination
              :value="page"
              :length="Math.ceil(count / perPage) || 1"
              circle
              @input="updatePage"
            />
          </v-container>
        </v-row>
      </v-container>
    </template>
    <!-- End  -->
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
  name: "crud-dashboard-custom-footer-pagination-example",
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