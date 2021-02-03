<template>
  <div>
    <div>
      <v-btn color="success" @click="refresh"> Refresh </v-btn>
      <v-btn color="success" @click="goToPage"> Go to page </v-btn>
      <v-text-field
        :value="page"
        type="number"
        @input="page = parseInt($event)"
      />
    </div>
    <v-divider />
    <crud-dashboard
      :bus="bus"
      :default-filter="{ q: '' }"
      :default-page="1"
      :default-per-page="5"
      :api-normal-pagination="apiNormalPagination"
      :api-trash-pagination="apiTrashPagination"
      :api-normal-count="apiNormalCount"
      :api-trash-count="apiTrashCount"
      :has-trash="true"
      title="Quản lý bài viết"
      @click-create="onClickCreate"
      @click-empty-trash="onClickEmptyTrash"
    >
      <template #default="{ items, trashMode }">
        <posts-table :items="items" :trash-mode="trashMode" />
      </template>
    </crud-dashboard>
  </div>
</template>

<script>
import Vue from "vue";
import { CrudDashboard } from "@/lib";
import PostsTable from "@/docs/components/posts/PostsTable";
import postsApi from "../../apis/posts.api";

export default {
  name: "dashboard-example",
  components: { CrudDashboard, PostsTable },

  data() {
    return {
      page: 1,
      bus: new Vue(),
    };
  },

  methods: {
    apiNormalPagination: postsApi.getPagination,
    apiTrashPagination: postsApi.getTrashPagination,
    apiNormalCount: postsApi.normalCount,
    apiTrashCount: postsApi.trashCount,
    onClickCreate() {
      alert("Open Create");
    },
    onClickEmptyTrash() {
      alert("Confirm Empty Trash");
    },

    refresh() {
      this.bus.$emit("refresh-dashboard");
    },
    goToPage() {
      this.bus.$emit("dashboard-go-to-page", this.page);
    },
  },
};
</script>

<style>
</style>