<template>
  <div>
    <v-layout v-if="!visible" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="visible = true">Open Create</v-btn>
    </v-layout>

    <crud-create
      title="Create new item"
      :visible="visible"
      :api-create="apiCreate"
      :get-begin-form-data="getBeginFormData"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="visible = false"
      @success="onSuccess"
    >
      <!-- Add this block  -->
      <template #title="{ title }">
        <v-chip color="warning">Custom title: {{ title }}</v-chip>
      </template>
      <!-- End  -->
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
import { CrudCreate } from "vue-crud-toolkit";
import postsApi from "@/apis/posts.api";
import PostForm from "@/components/posts/PostForm.vue";

export default {
  name: "crud-create-custom-title-example",
  components: { CrudCreate, PostForm },
  props: {
    card: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: true,
    };
  },

  methods: {
    apiCreate: postsApi.create,
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