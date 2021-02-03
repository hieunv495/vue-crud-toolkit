<template>
  <div>
    <div>
      <v-form>
        <v-row>
          <v-switch v-model="normalPaginationError" label="Pagination error" />
          <v-switch
            v-model="trashPaginationError"
            label="Trash pagination error"
          />
          <v-switch v-model="normalCountError" label="Normal count error" />
          <v-switch v-model="trashCountError" label="Trash count error" />
          <v-switch v-model="getOneError" label="Get one error" />
          <v-switch v-model="createError" label="Create error" />
          <v-switch v-model="updateError" label="Update error" />
          <v-switch v-model="removeError" label="Remove error" />
          <v-switch v-model="restoreError" label="Restore error" />
          <v-switch v-model="purgeError" label="Purge error" />
          <v-switch v-model="emptyTrashError" label="Empty trash error" />
        </v-row>
      </v-form>
    </div>

    <v-divider class="my-2" />

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
  name: "crud-composition-with-error-example",
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

      getErrorMessage: (e) => "An error occurred. " + e.message,

      apiNormalPagination: (...args) => {
        if (this.normalPaginationError) {
          return this.getApiError("Pagination error")();
        }
        return postsApi.getPagination(...args);
      },
      apiTrashPagination: (...args) => {
        if (this.trashPaginationError) {
          return this.getApiError("Trash pagination error")();
        }
        return postsApi.getTrashPagination(...args);
      },
      apiNormalCount: (...args) => {
        if (this.normalCountError) {
          return this.getApiError("Normal count error")();
        }
        return postsApi.normalCount(...args);
      },
      apiTrashCount: (...args) => {
        if (this.trashCountError) {
          return this.getApiError("Trash count error")();
        }
        return postsApi.trashCount(...args);
      },
      apiGetOne: (...args) => {
        if (this.getOneError) {
          return this.getApiError("Get one error")();
        }
        return postsApi.getOne(...args);
      },
      apiCreate: (...args) => {
        if (this.createError) {
          return this.getApiError("Create error")();
        }
        return postsApi.create(...args);
      },
      apiUpdate: (...args) => {
        if (this.updateError) {
          return this.getApiError("Update error")();
        }
        return postsApi.update(...args);
      },
      apiRemove: (...args) => {
        if (this.removeError) {
          return this.getApiError("Remove error")();
        }
        return postsApi.remove(...args);
      },
      apiRestore: (...args) => {
        if (this.restoreError) {
          return this.getApiError("Restore error")();
        }
        return postsApi.restore(...args);
      },
      apiPurge: (...args) => {
        if (this.purgeError) {
          return this.getApiError("Purge error")();
        }
        return postsApi.purge(...args);
      },
      apiEmptyTrash: (...args) => {
        if (this.emptyTrashError) {
          return this.getApiError("Empty error")();
        }
        return postsApi.emptyTrash(...args);
      },

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

      normalPaginationError: false,
      trashPaginationError: false,
      normalCountError: false,
      trashCountError: false,
      getOneError: true,
      createError: true,
      updateError: true,
      removeError: true,
      restoreError: true,
      purgeError: true,
      emptyTrashError: true,
    };
  },

  methods: {
    getApiError(message) {
      return () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error(message));
          }, 1000);
        });
    },
  },
};
</script>

<style>
</style>