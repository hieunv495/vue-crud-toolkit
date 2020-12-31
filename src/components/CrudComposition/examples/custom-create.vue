<template>
  <crud-composition
    :bus="bus"
    :detail-dialog="dialog"
    :create-dialog="dialog"
    :update-dialog="dialog"
    has-trash
    :defaultFilter="{ q: '' }"
    :defaultLimit="5"
    :defaultPage="1"
    :getBeginFormData="getBeginFormData"
    :get-list-api="getListApi"
    :get-trash-list-api="getTrashListApi"
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

    <template #detail-content="{ data }">
      <v-text-field :value="data.title" label="Title" disabled />
      <v-textarea :value="data.description" label="Description" disabled />
    </template>
    <!-- 
    <template #create-content="{ formBus, beginFormData, sendRequest }">
      <post-form
        :form-bus="formBus"
        :begin-form-data="beginFormData"
        :send-request="sendRequest"
      />
    </template> -->

    <!-- Add this block  -->
    <template #create="{ createVisible, createDialog }">
      <crud-create
        :visible="createVisible"
        :title="'Custom Create'"
        :create-api="createApi"
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
        <template #title="{ title }">
          <v-chip color="warning">Custom title: {{ title }} </v-chip>
        </template>
        <template #default="{ formBus, beginFormData, sendRequest }">
          <h1>This is custom create</h1>
          <post-form
            :form-bus="formBus"
            :begin-form-data="beginFormData"
            :send-request="sendRequest"
          />
        </template>
      </crud-create>
    </template>
    <!-- End  -->

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
  CrudCreate,
  DefaultSearchTextFilter,
} from "vue-crud-toolkit";
import PostsTable from "@/components/posts/PostsTable";
import PostForm from "@/components/posts/PostForm";
import postsApi from "@/apis/posts.api";

export default Vue.extend({
  name: "crud-composition-custom-create-example",
  components: {
    CrudComposition,
    DefaultSearchTextFilter,
    PostsTable,
    PostForm,
    CrudCreate,
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
    this.bus.$emit("open-create");
  },

  methods: {
    getListApi: postsApi.getList,
    getTrashListApi: postsApi.getTrashList,
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