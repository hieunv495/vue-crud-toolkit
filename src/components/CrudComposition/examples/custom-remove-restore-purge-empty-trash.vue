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
    <template #dashboard-header-filter="{ loading, filter, updateFilter }">
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

    <!-- Add this block  -->
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
    <!-- End  -->
  </crud-composition>
</template>

<script>
import Vue from "vue";
import {
  CrudComposition,
  CrudConfirmDialog,
  DefaultSearchTextFilter,
} from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable";
import PostForm from "@/components/posts/PostForm";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-composition-custom-remove-restore-purge-empty-trash-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudConfirmDialog,
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