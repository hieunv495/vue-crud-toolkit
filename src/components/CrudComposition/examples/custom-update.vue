<template>
  <crud-composition :bus="bus">
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
    <!-- 
    <template #update-content="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template> -->

    <!-- Add this block  -->
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
          bus.$emit('refresh-detail');
        "
      >
        <template #title="{ title }">
          <v-chip color="warning">Custom title: {{ title }}</v-chip>
        </template>
        <template #default="{ formBus, beginFormData, sendRequest }">
          <post-form
            :form-bus="formBus"
            :begin-form-data="beginFormData"
            :send-request="sendRequest"
          />
        </template>
      </crud-update>
    </template>
    <!-- End  -->
  </crud-composition>
</template>

<script>
import Vue from "vue";
import {
  CrudComposition,
  CrudUpdate,
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
  name: "crud-composition-custom-update-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudUpdate,
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

  mounted() {
    this.bus.$emit("open-update", "1");
  },
};
</script>

<style>
</style>