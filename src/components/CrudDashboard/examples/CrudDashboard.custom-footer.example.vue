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
    <template #footer="{ page, perPage, count, updatePage, updatePerPage }">
      <v-layout justify-center align-center style="background-color: grey">
        <v-flex shrink>
          <v-text-field
            :value="page"
            type="number"
            @input="updatePage(parseInt($event))"
            label="Page"
          />
        </v-flex>
        <v-flex shrink>
          <v-text-field
            :value="perPage"
            type="number"
            @input="updatePerPage(parseInt($event))"
            label="PerPage"
          />
        </v-flex>
        <v-flex shrink> Total: {{ count }} </v-flex>
      </v-layout>
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

export default {
  name: "crud-dashboard-custom-footer-example",
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
};
</script>

<style>
</style>