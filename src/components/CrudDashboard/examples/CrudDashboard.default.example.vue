<template>
  <crud-dashboard
    :bus="bus"
    title="Post manager"
    :default-filter="{ q: '' }"
    :default-limit="5"
    :default-page="1"
    :get-list-api="getListApi"
    :get-trash-list-api="getTrashListApi"
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
</template>

<script>
import Vue from "vue";
import { CrudDashboard, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable/index.vue";
import postsApi from "@/apis/posts.api";

export default Vue.extend({
  name: "crud-dashboard-default-example",
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
    getListApi: postsApi.getList,
    getTrashListApi: postsApi.getTrashList,
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