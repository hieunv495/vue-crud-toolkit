<template>
  <crud-composition
    :bus="bus"
    :detail-dialog="dialog"
    :create-dialog="dialog"
    :update-dialog="dialog"
    has-trash
    :default-filter="{ q: '' }"
    :default-page="1"
    :default-per-page="5"
    :get-begin-form-data="getBeginFormData"
    :api-normal-pagination="apiNormalPagination"
    :api-trash-pagination="apiTrashPagination"
    :api-normal-count="apiNormalCount"
    :api-trash-count="apiTrashCount"
    :api-get-one="apiGetOne"
    :api-create="apiCreate"
    :api-update="apiUpdate"
    :api-remove="apiRemove"
    :api-restore="apiRestore"
    :api-purge="apiPurge"
    :api-empty-trash="apiEmptyTrash"
    detailTitle="Post detail"
    dashboard-title="Post manager"
    create-title="Create new post"
    update-title="Update post"
  >
    <!-- <template #dashboard-header-filter="{ loading, filter, updateFilter }">
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #dashboard-content="{ items, trashMode }">
      <posts-table
        :items="items"
        :trash-mode="trashMode"
        @click-detail="bus.$emit('open-detail', $event.id)"
        @click-update="bus.$emit('open-update', $event.id)"
        @click-remove="bus.$emit('open-remove', $event.id)"
        @click-restore="bus.$emit('open-restore', $event.id)"
        @click-purge="bus.$emit('open-purge', $event.id)"
      />
    </template>
     -->
    <!-- Add this block  -->
    <template #dashboard>
      <crud-dashboard
        :bus="bus"
        :default-filter="{ q: '' }"
        :default-page="1"
        :default-per-page="10"
        :api-normal-pagination="apiNormalPagination"
        :api-trash-pagination="apiTrashPagination"
        :api-normal-count="apiNormalCount"
        :api-trash-count="apiTrashCount"
        :has-trash="true"
        title="Custom dashboard"
        @click-create="bus.$emit('open-create')"
        @click-empty-trash="bus.$emit('open-empty-trash')"
      >
        <template #header-filter="{ loading, filter, updateFilter }">
          <default-search-text-filter
            :loading="loading"
            :value="filter.q"
            @input="updateFilter({ q: $event })"
          />
        </template>
        <template #default="{ items, trashMode }">
          <posts-table
            :items="items"
            :trash-mode="trashMode"
            @click-detail="bus.$emit('open-detail', $event.id)"
            @click-update="bus.$emit('open-update', $event.id)"
            @click-remove="bus.$emit('open-remove', $event.id)"
            @click-restore="bus.$emit('open-restore', $event.id)"
            @click-purge="bus.$emit('open-purge', $event.id)"
          />
        </template>
      </crud-dashboard>
    </template>
    <!-- End  -->
    <template #detail-content="{ data }">
      <v-text-field :value="data.title" label="Title" disabled />
      <v-textarea :value="data.description" label="Description" disabled />
    </template>

    <template #create-content="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template>

    <template #update-content="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template>
  </crud-composition>
</template>

<script>
import Vue from "vue";
import {
  CrudComposition,
  CrudDashboard,
  DefaultSearchTextFilter,
} from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable";
import PostForm from "@/components/posts/PostForm";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-composition-custom-dashboard-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudDashboard,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
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
    apiGetOne: postsApi.getOne,
    apiCreate: postsApi.create,
    apiUpdate: postsApi.update,
    apiRemove: postsApi.remove,
    apiRestore: postsApi.restore,
    apiPurge: postsApi.purge,
    apiEmptyTrash: postsApi.emptyTrash,

    getBeginFormData(fetchedData) {
      if (fetchedData) {
        return JSON.parse(JSON.stringify(fetchedData));
      }
      return {
        title: "",
        description: "",
      };
    },
  },
};
</script>

<style>
</style>