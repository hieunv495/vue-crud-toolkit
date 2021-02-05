<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 300px">
      <v-btn color="success" @click="id = '1'">Open Update</v-btn>
    </v-layout>

    <crud-update
      :id="id"
      title="Update post"
      :api-detail="apiDetail"
      :api-update="apiUpdate"
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
      <template #actions="{ submit }">
        <v-layout justify-center>
          <v-btn color="warning" class="mr-2" @click="submit"
            >Custom submit button</v-btn
          >
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
  name: "crud-update-custom-actions-example",
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

  methods: {
    apiUpdate: postsApi.update,
    apiDetail: postsApi.getOne,

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