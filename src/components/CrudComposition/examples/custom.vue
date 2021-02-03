<template>
  <crud-composition :bus="bus">
    <template
      #dashboard="{
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
        :has-trash="true"
        title="Quản lý bài viết"
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

    <template #detail="{ detailId, detailConfig, apiGetOne }">
      <crud-detail
        :id="detailId"
        :api-get-one="apiGetOne"
        :dialog="detailConfig.dialog"
        :dialog-props="detailConfig.dialogProps"
        title="Post detail"
        @close="bus.$emit('close-detail')"
      >
        <template #default="{ data }">
          <v-text-field :value="data.title" label="Title" disabled />
          <v-textarea :value="data.description" label="Description" disabled />
        </template>
      </crud-detail>
    </template>

    <template #create="{ createVisible, createConfig, apiCreate }">
      <crud-create
        :visible="createVisible"
        :title="'Create'"
        :api-create="apiCreate"
        :get-begin-form-data="createConfig.getBeginFormData"
        :dialog="createConfig.dialog"
        :dialog-props="createConfig.dialogProps"
        @close="bus.$emit('close-create')"
        @success="
          bus.$emit('close-create');
          bus.$emit('notify-success', 'Create success!');
          bus.$emit('dashboard-go-to-page', 1);
        "
      >
        <template #default="{ formBus, beginFormData, sendRequest }">
          <post-form
            :form-bus="formBus"
            :begin-form-data="beginFormData"
            :send-request="sendRequest"
          />
        </template>
      </crud-create>
    </template>
    <template #update="{ updateId, updateConfig, apiGetOne, apiUpdate }">
      <crud-update
        :id="updateId"
        title="Update post"
        :api-get-one="apiGetOne"
        :api-update="apiUpdate"
        :get-begin-form-data="updateConfig.getBeginFormData"
        :dialog="updateConfig.dialog"
        :dialog-props="updateConfig.dialogProps"
        @close="bus.$emit('close-update')"
        @success="
          bus.$emit('close-update');
          bus.$emit('notify-success', 'Update success');
          bus.$emit('refresh-dashboard');
        "
      >
        <template #default="{ formBus, beginFormData, sendRequest }">
          <post-form
            :form-bus="formBus"
            :begin-form-data="beginFormData"
            :send-request="sendRequest"
          />
        </template>
      </crud-update>
    </template>
    <template #remove="{ removeId, apiRemove }">
      <crud-confirm-dialog
        :id="removeId"
        :visible="!!removeId"
        :api-request="apiRemove"
        title="Confirm remove"
        message="Are you sure?"
        @close="bus.$emit('close-remove')"
        @success="
          bus.$emit('close-remove');
          bus.$emit('notify-success', 'Remove success');
          bus.$emit('refresh-dashboard');
        "
      />
    </template>
    <template #restore="{ restoreId, apiRestore }">
      <crud-confirm-dialog
        :id="restoreId"
        :visible="!!restoreId"
        :api-request="apiRestore"
        title="Confirm restore"
        message="Are you sure?"
        @close="bus.$emit('close-restore')"
        @success="
          bus.$emit('close-restore');
          bus.$emit('notify-success', 'Restore success');
          bus.$emit('refresh-dashboard');
        "
      />
    </template>
    <template #purge="{ purgeId, apiPurge }">
      <crud-confirm-dialog
        :id="purgeId"
        :visible="!!purgeId"
        :api-request="apiPurge"
        title="Confirm purge"
        message="Are you sure?"
        @close="bus.$emit('close-purge')"
        @success="
          bus.$emit('close-purge');
          bus.$emit('notify-success', 'Purge success');
          bus.$emit('refresh-dashboard');
        "
      />
    </template>
    <template #empty-trash="{ emptyTrashVisible, apiEmptyTrash }">
      <crud-confirm-dialog
        :visible="emptyTrashVisible"
        :api-request="apiEmptyTrash"
        title="Confirm empty trash"
        message="Are you sure?"
        @close="bus.$emit('close-empty-trash')"
        @success="
          bus.$emit('close-empty-trash');
          bus.$emit('notify-success', 'Empty trash success');
          bus.$emit('refresh-dashboard');
        "
      />
    </template>
  </crud-composition>
</template>

<script>
import Vue from "vue";
import {
  CrudComposition,
  CrudDashboard,
  CrudDetail,
  CrudCreate,
  CrudUpdate,
  CrudConfirmDialog,
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
  components: {
    CrudComposition,
    CrudDashboard,
    CrudDetail,
    CrudCreate,
    CrudUpdate,
    CrudConfirmDialog,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
  },
  provide() {
    return {
      router: false,
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

  data() {
    return {
      bus: new Vue(),
    };
  },
};
</script>

<style>
</style>