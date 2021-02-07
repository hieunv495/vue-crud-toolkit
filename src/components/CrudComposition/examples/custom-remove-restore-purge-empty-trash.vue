<template>
  <crud-composition :bus="bus">
    <template
      #dashboard-normal-header-filter="{ loading, filter, updateFilter }"
    >
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #dashboard-normal-default="{ items }">
      <posts-table
        :items="items"
        :trash-mode="false"
        @click-detail="bus.$emit('open-detail', $event.id)"
        @click-update="bus.$emit('open-update', $event.id)"
        @click-remove="bus.$emit('open-remove', $event.id)"
        @click-restore="bus.$emit('open-restore', $event.id)"
        @click-purge="bus.$emit('open-purge', $event.id)"
      />
    </template>

    <template
      #dashboard-trash-header-filter="{ loading, filter, updateFilter }"
    >
      <default-search-text-filter
        :loading="loading"
        :value="filter.q"
        @input="updateFilter({ q: $event })"
      />
    </template>
    <template #dashboard-trash-default="{ items }">
      <posts-table
        :items="items"
        :trash-mode="true"
        @click-detail="bus.$emit('open-detail', $event.id)"
        @click-update="bus.$emit('open-update', $event.id)"
        @click-remove="bus.$emit('open-remove', $event.id)"
        @click-restore="bus.$emit('open-restore', $event.id)"
        @click-purge="bus.$emit('open-purge', $event.id)"
      />
    </template>

    <template #detail-default="{ data }">
      <v-text-field :value="data.title" label="Title" disabled />
      <v-textarea :value="data.description" label="Description" disabled />
    </template>

    <template #create-default="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template>

    <template #update-default="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template>

    <!-- Add this block  -->
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
  name: "crud-composition-custom-remove-restore-purge-empty-trash-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudConfirmDialog,
  },
  provide() {
    return {
      router: false,
      hasTrash: true,

      viewCreateDetailUpdateConfig: {
        dialog: this.dialog,
      },

      dashboardConfig: {
        defaultNormalFilter: { q: "" },
        defaultNormalPage: 1,
        defaultNormalPerPage: 10,
        defaultTrashFilter: { q: "" },
        defaultTrashPage: 1,
        defaultTrashPerPage: 10,
      },

      detailConfig: {
        dialogProps: { maxWidth: 800 },
      },

      createConfig: {
        getBeginFormData,
        dialogProps: { maxWidth: 800 },
        onSuccess: "DETAIL",
      },

      updateConfig: {
        getBeginFormData,
        dialogProps: { maxWidth: 800 },
        onSuccess: "DETAIL",
      },

      getObjectId: (item) => item.id,

      getErrorMessage: (e) => e.message,

      apiNormalPagination: postsApi.getPagination,
      apiTrashPagination: postsApi.getTrashPagination,
      apiNormalCount: postsApi.normalCount,
      apiTrashCount: postsApi.trashCount,
      apiDetail: postsApi.getOne,
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