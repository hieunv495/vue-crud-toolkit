<template>
  <div>
    <v-container>
      <v-form>
        <h1>Access</h1>
        <v-row>
          <v-switch v-model="access.create" label="Create" />
          <v-switch v-model="access.detail" label="Detail" />
          <v-switch v-model="access.update" label="Update" />
          <v-switch v-model="access.remove" label="Remove" />
          <v-switch v-model="access.restore" label="Restore" />
          <v-switch v-model="access.purge" label="Purge" />
          <v-switch v-model="access.emptyTrash" label="Empty trash" />
        </v-row>
      </v-form>
    </v-container>
    <v-divider class="my-2" />
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
    </crud-composition>
  </div>
</template>

<script>
import Vue from "vue";
import { CrudComposition, DefaultSearchTextFilter } from "vue-crud-toolkit";
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
  name: "crud-composition-default-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
  },
  provide() {
    return {
      router: false,
      hasTrash: true,

      access: this.access,

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
      access: {
        create: false,
        detail: false,
        update: false,
        remove: false,
        restore: false,
        purge: false,
        emptyTrash: false,
      },
    };
  },
};
</script>

<style>
</style>