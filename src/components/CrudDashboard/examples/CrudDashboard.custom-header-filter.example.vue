<template>
  <crud-dashboard
    :bus="bus"
    title="Post manager"
    :default-filter="{ q: '' }"
    :default-per-page="5"
    :default-page="1"
    :get-pagination-api="getPaginationApi"
    :get-trash-pagination-api="getTrashPaginationApi"
    :normal-count-api="normalCountApi"
    :trash-count-api="trashCountApi"
    @click-create="onClickCreate"
    @click-empty-trash="onClickEmptyTrash"
  >
    <!-- Add this block  -->
    <template #header-filter="{ loading, filter, updateFilter }">
      <v-text-field
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
        label="Search"
        placeholder="Input text"
      />
    </template>
    <!-- End  -->
    <template #default="{ items, trashMode }">
      <posts-table :items="items" :trash-mode="trashMode" />
    </template>
  </crud-dashboard>
</template>

<script>
import Vue from "vue";
import { CrudDashboard } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";

export default Vue.extend({
  name: "crud-dashboard-custom-header-filter-example",
  components: {
    CrudDashboard,
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