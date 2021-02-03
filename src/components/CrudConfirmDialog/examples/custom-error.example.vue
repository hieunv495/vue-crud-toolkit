<template>
  <div>
    <v-layout v-if="!id" justify-center align-center style="height: 200px">
      <v-btn color="success" @click="id = '1'">Open dialog</v-btn>
    </v-layout>

    <crud-confirm-dialog
      :id="id"
      :visible="!!id"
      :api-request="apiRequest"
      :get-error-message="getErrorMessage"
      title="Confirm dialog title"
      message="Are you sure?"
      accept-button-label="Accept"
      @close="id = null"
      @success="onSuccess"
    >
      <template #error="{ errorMessage }">
        <v-alert type="info">{{ errorMessage }}</v-alert>
      </template>
    </crud-confirm-dialog>
  </div>
</template>

<script>
import { CrudConfirmDialog } from "vue-crud-toolkit";

export default {
  name: "crud-confirm-dialog-default-example",
  components: { CrudConfirmDialog },

  data() {
    return {
      id: null,
    };
  },
  methods: {
    apiRequest: () =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          reject(new Error("Send request error"));
        }, 1000)
      ),

    getErrorMessage: (e) => "Error occurred. " + e.message,

    onSuccess() {
      this.id = null;
      alert("Success");
    },
  },
};
</script>

<style>
</style>