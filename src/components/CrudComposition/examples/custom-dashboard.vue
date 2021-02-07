<template>
  <crud-composition :bus="bus">
    <!--
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
        :default-normal-filter="dashboardConfig.defaultNormalFilter"
        :default-normal-page="dashboardConfig.defaultNormalPage"
        :default-normal-per-page="dashboardConfig.defaultNormalPerPage"
        :default-trash-filter="dashboardConfig.defaultTrashFilter"
        :default-trash-page="dashboardConfig.defaultTrashPage"
        :default-trash-per-page="dashboardConfig.defaultTrashPerPage"
        :api-normal-pagination="apiNormalPagination"
        :api-trash-pagination="apiTrashPagination"
        :api-normal-count="apiNormalCount"
        :api-trash-count="apiTrashCount"
        :has-trash="hasTrash"
        @click-create="bus.$emit('open-create')"
        @click-empty-trash="bus.$emit('open-empty-trash')"
      >
        <template #normal-header-filter="{ loading, filter, updateFilter }">
          <default-search-text-filter
            :loading="loading"
            :value="filter.q"
            @input="updateFilter({ q: $event })"
          />
        </template>
        <template #normal-default="{ items }">
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

        <template #trash-header-filter="{ loading, filter, updateFilter }">
          <default-search-text-filter
            :loading="loading"
            :value="filter.q"
            @input="updateFilter({ q: $event })"
          />
        </template>
        <template #trash-default="{ items }">
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
      </crud-dashboard>
    </template>
    <!-- End  -->

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