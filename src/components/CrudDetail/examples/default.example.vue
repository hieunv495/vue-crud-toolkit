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
  name: "crud-detail-default-example",
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