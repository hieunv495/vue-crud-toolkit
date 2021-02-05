<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="id = '1'">Open Update</v-btn>
    </v-layout>

    <crud-update
      ref="crudUpdate"
      :id="id"
      title="Update post"
      :api-detail="apiDetail"
      :api-update="apiUpdate"
      :get-error-message="getErrorMessage"
      :get-begin-form-data="getBeginFormData"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
      @success="onSuccess"
    >
      <!-- Add this block  -->
      <template #update-error="{ updateErrorMessage }">
        <v-layout column class="my-2">
          <v-alert type="info">
            This is custom error: '{{ updateErrorMessage }}'
          </v-alert>
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
import postsApi from "@/apis/posts.api";
import PostForm from "@/components/posts/PostForm.vue";

export default {
  name: "crud-update-custom-update-error-example",
  components: { CrudUpdate, PostForm },
  props: {
    card: {
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
    apiDetail: postsApi.getOne,
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