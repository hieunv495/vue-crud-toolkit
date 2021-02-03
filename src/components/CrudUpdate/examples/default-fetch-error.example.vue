<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="id = '1'">Open Update</v-btn>
    </v-layout>

    <crud-update
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
import PostForm from "@/components/posts/PostForm.vue";

export default {
  name: "crud-update-default-fetch-error-example",
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

  methods: {
    apiGetOne: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Not found"));
        }, 1000);
      }),
    apiUpdate: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Update error"));
        }, 1000);
      }),

    getErrorMessage: (e) => "Error occurred. " + e.message,

    getBeginFormData(fetchedData) {
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