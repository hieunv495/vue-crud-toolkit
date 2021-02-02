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
    <!-- 
    <template #detail-content="{ data }">
      <v-text-field :value="data.title" label="Title" disabled />
      <v-textarea :value="data.description" label="Description" disabled />
    </template> -->

    <!-- Add this block  -->
    <template #detail="{ detailId, detailDialog }">
      <crud-detail
        :id="detailId"
        :get-one-api="getOneApi"
        :dialog="detailDialog"
        title="Cutom detail"
        @close="bus.$emit('close-detail')"
      >
        <template #title="{ title }">
          <v-chip color="warning">Custom title: {{ title }} </v-chip>
        </template>
        <template #default="{ data }">
          <v-alert type="info">This is custom detail page</v-alert>
          <v-text-field :value="data.title" label="Title" disabled />
          <v-textarea :value="data.description" label="Description" disabled />
        </template>
      </crud-detail>
    </template>
    <!-- End  -->

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
import {
  CrudComposition,
  CrudDetail,
  DefaultSearchTextFilter,
} from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable";
import PostForm from "@/components/posts/PostForm";
import postsApi from "@/apis/posts.api";

export default Vue.extend({
  name: "crud-composition-custom-detail-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudDetail,
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
    this.bus.$emit("open-detail", "1");
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
});
</script>

<style>
</style>