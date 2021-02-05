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
    :get-error-message="getErrorMessage"
    @click-create="onClickCreate"
    @click-empty-trash="onClickEmptyTrash"
  >
    <template #normal-header-filter="{ loading, filter, updateFilter }">
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        placeholder="Normal search"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #normal-default="{ items, trashMode }">
      <posts-table :items="items" :trash-mode="trashMode" />
    </template>
    <template #normal-error="{ loading, errorMessage, loadData }">
      <v-layout column justify-center align-center class="my-8">
        <h2>Normal Custom error</h2>
        <v-alert min-width="200" type="success">{{ errorMessage }}</v-alert>
        <v-btn :loading="loading" color="success" @click="loadData">
          <v-icon left>mdi-refresh</v-icon>
          Retry
        </v-btn>
      </v-layout>
    </template>

    <template #trash-header-filter="{ loading, filter, updateFilter }">
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        placeholder="Trash search"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #trash-default="{ items, trashMode }">
      <posts-table :items="items" :trash-mode="trashMode" />
    </template>
    <template #trash-error="{ loading, errorMessage, loadData }">
      <v-layout column justify-center align-center class="my-8">
        <h2>Trash Custom error</h2>
        <v-alert min-width="200" type="success">{{ errorMessage }}</v-alert>
        <v-btn :loading="loading" color="success" @click="loadData">
          <v-icon left>mdi-refresh</v-icon>
          Retry
        </v-btn>
      </v-layout>
    </template>
  </crud-dashboard>
</template>

<script>
import Vue from "vue";
import { CrudDashboard, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-dashboard-with-error-example",
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
    apiNormalPagination: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Not found"));
        }, 1000);
      }),
    apiTrashPagination: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Not found"));
        }, 1000);
      }),
    apiNormalCount: postsApi.normalCount,
    apiTrashCount: postsApi.trashCount,

    getErrorMessage: (e) => "Error occurred. " + e.message,

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