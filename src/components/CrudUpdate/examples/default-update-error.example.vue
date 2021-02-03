<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="id = '1'">Open Update</v-btn>
    </v-layout>

    <crud-update
      ref="crudUpdate"
      :id="id"
      title="Update post"
      :api-get-one="apiGetOne"
      :api-update="apiUpdate"
      :get-error-message="getErrorMessage"
      :get-begin-form-data="getBeginFormData"
      :dialog="dialog"
      :dialog-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
      @success="onSuccess"
    >
      <template #default="{ formBus, beginFormData, sendRequest }">
        <post-form
          :form-bus="formBus"
          :begin-form-data="beginFormData"
          :send-request="sendRequest"
        />
      </template>
    </crud-update>
  </div>
</template>

<script>
import { CrudUpdate } from "vue-crud-toolkit";
import postsApi from "@/apis/posts.api";
import PostForm from "@/components/posts/PostForm.vue";

export default {
  name: "crud-update-default-update-error-example",
  components: { CrudUpdate, PostForm },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      id: "1",
    };
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.crudUpdate.submit();
      }, 500);
    });
  },

  methods: {
    apiGetOne: postsApi.getOne,
    apiUpdate: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Update error"));
        }, 1000);
      }),

    getErrorMessage: (e) => "Error occurred. " + e.message,

    getBeginFormData(fetchedData) {
      console.log(fetchedData);
      return JSON.parse(JSON.stringify(fetchedData));
    },
    onSuccess() {
      this.id = null;
      this.$nextTick(() => {
        alert("Update success");
      });
    },
  },
};
</script>

<style>
</style>