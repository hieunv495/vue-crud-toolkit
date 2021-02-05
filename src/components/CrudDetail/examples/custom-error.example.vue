<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = 'nothing'">Open detail</v-btn>
    </v-layout>

    <crud-detail
      title="Post detail"
      :id="id"
      :api-get-one="apiGetOne"
      :get-error-message="getErrorMessage"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
    >
      <!-- Add this block  -->
      <template #error="{ loading, errorMessage, loadData }">
        <v-layout column justify-center align-center class="my-8">
          <h2>Custom error</h2>
          <v-alert min-width="200" type="info">{{ errorMessage }}</v-alert>
          <v-btn :loading="loading" outlined @click="loadData">
            <v-icon left>mdi-refresh</v-icon>
            Retry
          </v-btn>
        </v-layout>
      </template>
      <!-- End  -->
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
  name: "crud-detail-custom-error-example",
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
    apiGetOne: postsApi.getOne,
    getErrorMessage: (e) => "Error occurred. " + e.message,
  },
};
</script>

<style>
</style>