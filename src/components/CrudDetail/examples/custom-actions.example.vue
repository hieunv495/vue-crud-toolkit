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
      <!-- Add this block  -->
      <template #actions>
        <v-layout justify-center>
          <v-btn color="success" class="mr-2" @click="id = null"> Close </v-btn>
          <v-btn color="success" class="mr-2" @click="onUpdate"> Update </v-btn>
          <v-btn color="warning" @click="onRemove"> Delete </v-btn>
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
  name: "crud-detail-custom-actions-example",
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
    onUpdate() {
      alert("Update");
    },
    onRemove() {
      alert("Remove");
    },
  },
};
</script>

<style>
</style>