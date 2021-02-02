<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="id = '1'">Open Update</v-btn>
    </v-layout>

    <crud-update
      :id="id"
      title="Update post"
      :get-one-api="getOneApi"
      :update-api="updateApi"
      :get-begin-form-data="getBeginFormData"
      :dialog="dialog"
      :dialog-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
      @success="onSuccess"
    >
      <!-- Add this block  -->
      <template #fetch-error="{ fetchErrorMessage }">
        <v-alert type="error">
          Fetch error is: '{{ fetchErrorMessage }}'
        </v-alert>
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
    getOneApi: () => Promise.reject(new Error("404 not found")),
    updateApi: () => Promise.reject(new Error("Form data invalid")),

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
}
</script>

<style>
</style>