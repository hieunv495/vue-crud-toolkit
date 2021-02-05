<template>
  <crud-dashboard
    :bus="bus"
    title="Post manager"
    :default-normal-filter="{ q: '' }"
    :default-normal-page="1"
    :default-normal-per-page="5"
    :default-trash-filter="{ q: '' }"
    :default-trash-page="1"
    :default-trash-per-page="5"
    :api-normal-pagination="apiNormalPagination"
    :api-trash-pagination="apiTrashPagination"
    :api-normal-count="apiNormalCount"
    :api-trash-count="apiTrashCount"
    @click-create="onClickCreate"
    @click-empty-trash="onClickEmptyTrash"
  >
    <!-- Add this block -->
    <template #normal-footer-per-page="{ perPage, updatePerPage }">
      <v-layout align-center>
        <v-flex class="mr-2">
          <v-chip color="success">Rows per page:</v-chip>
        </v-flex>
        <v-flex>
          <v-select
            :items="[5, 10, 20, 50, 100]"
            :value="perPage"
            dense
            hide-details
            outlined
            style="width: 100px; font-size: 14px"
            @input="updatePerPage"
          />
        </v-flex>
      </v-layout>
    </template>
    <!-- End -->
    <template #normal-header-filter="{ loading, filter, updateFilter }">
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #normal-default="{ items }">
      <posts-table :items="items" :trash-mode="false" />
    </template>

    <!-- Add this block -->
    <template #trash-footer-per-page="{ perPage, updatePerPage }">
      <v-layout align-center>
        <v-flex class="mr-2">
          <v-chip color="success">Rows per page:</v-chip>
        </v-flex>
        <v-flex>
          <v-select
            :items="[5, 10, 20, 50, 100]"
            :value="perPage"
            dense
            hide-details
            outlined
            style="width: 100px; font-size: 14px"
            @input="updatePerPage"
          />
        </v-flex>
      </v-layout>
    </template>
    <!-- End -->
    <template #trash-header-filter="{ loading, filter, updateFilter }">
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #trash-default="{ items }">
      <posts-table :items="items" :trash-mode="true" />
    </template>
  </crud-dashboard>
</template>

<script>
import Vue from "vue";
import { CrudDashboard, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-dashboard-custom-footer-per-page-example",
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
    apiNormalPagination: postsApi.getPagination,
    apiTrashPagination: postsApi.getTrashPagination,
    apiNormalCount: postsApi.normalCount,
    apiTrashCount: postsApi.trashCount,
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