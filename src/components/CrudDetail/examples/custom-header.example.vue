<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = '1'">Open detail</v-btn>
    </v-layout>

    <crud-detail
      title="Post detail"
      :id="id"
      :api-detail="apiDetail"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
    >
      <!-- Add this block -->
      <template #header="{ close, title, loadData }">
        <div style="background-color: grey; padding: 8px; color: white">
          <v-btn @click="close"> Close </v-btn>
          Custom title: {{ title }}
          <v-btn @click="loadData"> Load data </v-btn>
        </div>
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
  name: "crud-detail-custom-header-example",
  components: { CrudDetail },
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
  methods: {
    apiDetail: postsApi.getOne,
  },
};
</script>

<style>
</style>