<template>
  <div>
    <v-layout v-if="!visible" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="visible = true">Open Create</v-btn>
    </v-layout>

    <crud-create
      title="Create new item"
      :visible="visible"
      :create-api="createApi"
      :get-begin-form-data="getBeginFormData"
      :dialog="false"
      :dialog-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="visible = false"
      @success="onSuccess"
    >
      <template #default="{ formBus, beginFormData, sendRequest }">
        <post-form
          :form-bus="formBus"
          :begin-form-data="beginFormData"
          :send-request="sendRequest"
        />
      </template>
    </crud-create>
  </div>
</template>

<script>
import CrudCreate from "./index";
import postsApi from "../../apis/posts.api";
import PostForm from "./PostForm.vue";

export default {
  name: "create-example",
  components: { CrudCreate, PostForm },

  data() {
    return {
      visible: true,
    };
  },

  methods: {
    createApi: postsApi.create,
    getBeginFormData() {
      return {
        title: "Input your title",
        description: "Input your description",
      };
    },
    onSuccess() {
      alert("Create success");
      this.visible = false;
    },
  },
};
</script>

<style>
</style>