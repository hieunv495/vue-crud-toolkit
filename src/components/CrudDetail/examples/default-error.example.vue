<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = 'nothing'">Open detail</v-btn>
    </v-layout>

    <crud-detail
      title="Post detail"
      :id="id"
      :api-detail="apiDetail"
      :get-error-message="getErrorMessage"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
    >
      <template #default="{ data }">
        <v-text-field :value="data.title" label="Title" disabled />
        <v-textarea :value="data.description" label="Description" disabled />
      </template>
    </crud-detail>
  </div>
</template>

<script>
import { CrudDetail } from "vue-crud-toolkit";
import postsApi from "@/apis/posts.api";

export default {
  name: "crud-detail-default-error-example",
  components: { CrudDetail },
  props: {
    card: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: "nothing",
    };
  },
  methods: {
    apiDetail: postsApi.getOne,
    getErrorMessage: (e) => "Error occurred. " + e.message,
  },
};
</script>

<style>
</style>