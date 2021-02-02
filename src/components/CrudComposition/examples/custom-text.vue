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
    :get-pagination-api="getPaginationApi"
    :get-trash-pagination-api="getTrashPaginationApi"
    :normal-count-api="normalCountApi"
    :trash-count-api="trashCountApi"
    :get-one-api="getOneApi"
    :create-api="createApi"
    :update-api="updateApi"
    :remove-api="removeApi"
    :restore-api="restoreApi"
    :purge-api="purgeApi"
    :empty-trash-api="emptyTrashApi"
    detail-title="Post detail"
    dashboard-title="Post manager"
    create-title="Create new post"
    update-title="Update post"
    text-create="Thêm mới"
    text-normal="Bình thường"
    text-trash="Thùng rác"
    text-empty-trash="Dọn dẹp thùng rác"
    text-back="Trở lại"
    text-create-submit="Lưu"
    text-update-submit="Cập nhật"
    text-remove-title="Xác nhận xóa"
    text-remove-message="Bạn có chắc chắn?"
    text-remove-accept-button-label="Xóa"
    text-restore-title="Xác nhận khôi phục"
    text-restore-message="Bạn có chắc chắn?"
    text-restore-accept-button-label="Khôi phục"
    text-purge-title="Xác nhận dọn dẹp"
    text-purge-message="Bạn có chắc chắn?"
    text-purge-accept-button-label="Dọn dẹp"
    text-empty-trash-title="Xác nhận dọn dẹp thùng rác"
    text-empty-trash-message="Bạn có chắc chắn?"
    text-empty-trash-accept-button-label="Dọn dẹp thùng rác"
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
  </crud-composition>
</template>

<script>
import Vue from "vue";
import { CrudComposition, DefaultSearchTextFilter } from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable";
import PostForm from "@/components/posts/PostForm";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-composition-custom-text-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
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
    getPaginationApi: postsApi.getPagination,
    getTrashPaginationApi: postsApi.getTrashPagination,
    normalCountApi: postsApi.normalCount,
    trashCountApi: postsApi.trashCount,
    getOneApi: postsApi.getOne,
    createApi: postsApi.create,
    updateApi: postsApi.update,
    removeApi: postsApi.remove,
    restoreApi: postsApi.restore,
    purgeApi: postsApi.purge,
    emptyTrashApi: postsApi.emptyTrash,

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