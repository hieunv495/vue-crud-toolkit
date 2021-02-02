<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = '1'">Open detail</v-btn>
    </v-layout>

    <crud-detail
      :id="id"
      :get-one-api="getOneApi"
      :dialog="dialog"
      :title="title"
      :dialog-props="{
        maxWidth: dialogMaxWidth,
        persistent: dialogPersistent,
      }"
      @close="id = null"
    >
      <template #actions>
        <v-layout justify-center>
          <v-btn color="success" class="mr-2" @click="id = null"> Close </v-btn>
          <v-btn color="success" class="mr-2" @click="update"> Update </v-btn>
          <v-btn color="warning" @click="remove"> Delete </v-btn>
        </v-layout>
      </template>

      <template #default="{ data }">
        <v-text-field :value="data.title" label="Title" disabled />
        <v-textarea :value="data.description" label="Description" disabled />
      </template>
    </crud-detail>
  </div>
</template>

<script>
import CrudDetail from "./index";
import postsApi from "../../apis/posts.api";

export default {
  name: "crud-detail-example",
  components: { CrudDetail },

  props: {},

  data() {
    return {
      id: null,
      title: "Detail information",
      dialog: false,
      dialogMaxWidth: 600,
      dialogPersistent: false,
    };
  },

  methods: {
    getOneApi: postsApi.getOne,

    update() {
      alert("Update");
    },
    remove() {
      alert("Remove");
    },
  },
}
</script>

<style>
</style>