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
      :get-begin-form-data="getBeginFormData"
      :get-error-message="getErrorMessage"
      :dialog="dialog"
      :dialog-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
      @success="onSuccess"
    >
      <!-- Add this block  -->
      <template #fetch-error="{ fetchLoading, fetchErrorMessage, fetchData }">
        <v-layout column justify-center align-center class="my-8">
          <v-alert min-width="200" type="info">
            {{ fetchErrorMessage }}
          </v-alert>
          <v-btn :loading="fetchLoading" outlined @click="fetchData">
            <v-icon left>mdi-refresh</v-icon>
            Retry
          </v-btn>
        </v-layout>
      </template>
      <!-- End  -->
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
  name: "crud-update-custom-fetch-error-example",
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