<template>
  <crud-composition
    :bus="bus"
    :detail-dialog="true"
    :create-dialog="true"
    :update-dialog="true"
  >
    <template #dashboard>
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

    <template #detail="{ detailId, detailDialog }">
      <crud-detail
        :id="detailId"
        :api-get-one="apiGetOne"
        :dialog="detailDialog"
        title="Post detail"
        @close="bus.$emit('close-detail')"
      >
        <template #default="{ data }">
          <v-text-field :value="data.title" label="Title" disabled />
          <v-textarea :value="data.description" label="Description" disabled />
        </template>
      </crud-detail>
    </template>

    <template #create="{ createVisible, createDialog }">
      <crud-create
        :visible="createVisible"
        :title="'Create'"
        :api-create="apiCreate"
        :get-begin-form-data="getBeginFormData"
        :dialog="createDialog"
        :dialog-props="{
          maxWidth: 600,
          persistent: true,
        }"
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
    <template #update="{ updateId, updateDialog }">
      <crud-update
        :id="updateId"
        title="Update post"
        :api-get-one="apiGetOne"
        :api-update="apiUpdate"
        :get-begin-form-data="getBeginFormData"
        :dialog="updateDialog"
        :dialog-props="{
          maxWidth: 600,
          persistent: true,
        }"
        @close="bus.$emit('close-update')"
        @success="
          bus.$emit('close-update');
          bus.$emit('notify-success', 'Update success');
          bus.$emit('dashboard-refresh');
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
    <template #remove="{ removeId }">
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
          bus.$emit('dashboard-refresh');
        "
      />
    </template>
    <template #restore="{ restoreId }">
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
          bus.$emit('dashboard-refresh');
        "
      />
    </template>
    <template #purge="{ purgeId }">
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
          bus.$emit('dashboard-refresh');
        "
      />
    </template>
    <template #empty-trash="{ emptyTrashVisible }">
      <crud-confirm-dialog
        :visible="emptyTrashVisible"
        :api-request="apiEmptyTrash"
        title="Confirm empty trash"
        message="Are you sure?"
        @close="bus.$emit('close-empty-trash')"
        @success="
          bus.$emit('close-empty-trash');
          bus.$emit('notify-success', 'Empty trash success');
          bus.$emit('dashboard-refresh');
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