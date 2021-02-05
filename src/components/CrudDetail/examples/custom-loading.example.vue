<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = '1'">Open detail</v-btn>
    </v-layout>

    <crud-detail
      title="Post detail"
      :id="id"
      :api-get-one="apiGetOne"
      :card="card"
      :card-props="{
        maxWidth: 600,
        persistent: false,
      }"
      @close="id = null"
    >
      <!-- Add this block  -->
      <template #loading>
        <v-layout justify-center align-center>
          <v-progress-circular indeterminate color="primary" />
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

export default {
  name: "crud-detail-custom-loading-example",
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
    apiGetOne: () => new Promise(() => {}),
  },
};
</script>

<style>
</style>