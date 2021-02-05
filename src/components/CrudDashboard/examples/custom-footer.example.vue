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
    <!-- Add this block  -->
    <template
      #normal-footer="{ page, perPage, count, updatePage, updatePerPage }"
    >
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

    <!-- Add this block  -->
    <template
      #trash-footer="{ page, perPage, count, updatePage, updatePerPage }"
    >
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