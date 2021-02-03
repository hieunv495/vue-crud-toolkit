<template>
  <crud-composition :bus="bus">
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
    <template
      #dashboard="{
        hasTrash,
        dashboardConfig,
        apiNormalPagination,
        apiTrashPagination,
        apiNormalCount,
        apiTrashCount,
      }"
    >
      <crud-dashboard
        :bus="bus"
        :default-filter="dashboardConfig.defaultFilter"
        :default-page="dashboardConfig.defaultPage"
        :default-per-page="dashboardConfig.defaultPerPage"
        :api-normal-pagination="apiNormalPagination"
        :api-trash-pagination="apiTrashPagination"
        :api-normal-count="apiNormalCount"
        :api-trash-count="apiTrashCount"
        :has-trash="hasTrash"
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

    <template #detail-actions="{ id, data }">
      <v-layout justify-center style="gap: 16px">
        <v-btn
          :disabled="!data"
          color="success"
          @click="bus.$emit('open-update', id)"
        >
          Update
        </v-btn>
        <v-btn
          :disabled="!data"
          color="warning"
          @click="bus.$emit('open-remove', id)"
        >
          Remove
        </v-btn>
      </v-layout>
    </template>

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

const getBeginFormData = (fetchedData) => {
  if (fetchedData) {
    return JSON.parse(JSON.stringify(fetchedData));
  }
  return {
    title: "",
    description: "",
  };
};

export default {
  name: "crud-composition-custom-dashboard-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudDashboard,
  },
  provide() {
    return {
      router: true,
      hasTrash: true,

      dashboardConfig: {
        defaultFilter: { q: "" },
        defaultPage: 1,
        defaultPerPage: 10,
      },

      detailConfig: {
        dialog: this.dialog,
        dialogProps: { maxWidth: 800 },
      },

      createConfig: {
        getBeginFormData,
        dialog: this.dialog,
        dialogProps: { maxWidth: 800 },
      },

      updateConfig: {
        getBeginFormData,
        dialog: this.dialog,
        dialogProps: { maxWidth: 800 },
      },

      getErrorMessage: (e) => e.message,

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

      textDashboardTitle: "Post manager",
      textDetailTitle: "Post detail",
      textCreateTitle: "Create post",
      textUpdateTitle: "Update post",
    };
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
};
</script>

<style>
</style>