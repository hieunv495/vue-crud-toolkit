<template>
  <div>
    <v-layout v-if="!visible" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="visible = true">Open Create</v-btn>
    </v-layout>

    <crud-create
      ref="crudCreate"
      title="Create new item"
      :visible="visible"
      :api-create="apiCreate"
      :get-error-message="getErrorMessage"
      :get-begin-form-data="getBeginFormData"
      :card="card"
      :card-props="{
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
import { CrudCreate } from "vue-crud-toolkit";
import PostForm from "@/components/posts/PostForm.vue";

export default {
  name: "crud-create-default-error-example",
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

  mounted() {
    this.$nextTick(() => {
      this.$refs.crudCreate.submit();
    });
  },

  methods: {
    apiCreate: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Form data invalid"));
        }, 1000);
      }),

    getErrorMessage: (e) => "Error occurred. " + e.message,

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