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
  </crud-composition>
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
  name: "crud-composition-custom-text-example",
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

      textDashboardTitle: "Quản lý bài viết",
      textNormal: "Bình thường",
      textTrash: "Thùng rác",
      textBack: "Trở lại",
      textCancel: "Hủy",
      textAccept: "Đồng ý",
      textClose: "Đóng",

      textDetailTitle: "Chi tiết bài viết",
      textDetailActivator: "Chi tiết",

      textCreateTitle: "Thêm mới bài viết",
      textCreateActivator: "Thêm mới",
      textCreateSubmit: "Lưu",
      textCreateSuccess: "Thêm mới thành công",

      textUpdateTitle: "Cập nhật bài viết",
      textUpdateActivator: "Cập nhật",
      textUpdateSubmit: "Cập nhật",
      textUpdateSuccess: "Cập nhật thành công",

      textRemoveTitle: "Xác nhận xóa",
      textRemoveMessage: "Bạn có chắc chắn?",
      textRemoveActivator: "Xóa",
      textRemoveSubmit: "Xóa",
      textRemoveSuccess: "Xóa thành công",

      textRestoreTitle: "Xác nhận khôi phục",
      textRestoreMessage: "Bạn có chắc chắn?",
      textRestoreActivator: "Khôi phục",
      textRestoreSubmit: "Khôi phục",
      textRestoreSuccess: "Khôi phục thành công",

      textPurgeTitle: "Xác nhận dọn dẹp",
      textPurgeMessage: "Bạn có chắc chắn?",
      textPurgeActivator: "Dọn dẹp",
      textPurgeSubmit: "Dọn dẹp",
      textPurgeSuccess: "Dọn dẹp thành công",

      textEmptyTrashTitle: "Xác nhận dọn dẹp thùng rác",
      textEmptyTrashMessage: "Bạn có chắc chắn?",
      textEmptyTrashActivator: "Dọn dẹp thùng rác",
      textEmptyTrashSubmit: "Dọn dẹp thùng rác",
      textEmptyTrashSuccess: "Dọn dẹp thùng rác thành công",
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

  methods: {
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