<template>
  <div>
    <v-layout align-center style="gap: 16px" class="mb-2">
      <v-flex shrink>
        <v-btn icon color="success" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex shrink>
        <v-btn icon color="success" @click="forward">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-flex>
      <v-flex shrink>
        <v-btn icon color="success" @click="refresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-text-field
          :value="href"
          hide-details=""
          readonly
          outlined
          dense
          style="font-size: 12px"
        />
      </v-flex>
    </v-layout>

    <crud-composition
      router
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

export default Vue.extend({
  name: "crud-composition-with-router-example",
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
      href: window.location.href,
    };
  },

  created() {
    window.addEventListener("popstate", this.updateHref);
  },

  destroyed() {
    window.removeEventListener("popstate", this.updateHref);
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

    updateHref() {
      this.href = window.location.href;
    },
    back() {
      window.history.back();
    },
    forward() {
      window.history.forward();
    },
    refresh() {
      window.location.reload();
    },
  },
});
</script>

<style>
</style>