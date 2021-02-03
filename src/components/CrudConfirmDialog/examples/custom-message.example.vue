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
      <!-- Add this block -->
      <template #message="{ message }">
        <div>This custom message: '{{ message }}'</div>
        <v-divider class="my-4" />
        <v-row>
          <v-col>
            <v-btn color="primary">Btn 1</v-btn>
          </v-col>
          <v-col>
            <v-btn color="warning">Btn 2</v-btn>
          </v-col>
        </v-row>
      </template>
      <!-- End -->
    </crud-confirm-dialog>
  </div>
</template>

<script>
import { CrudConfirmDialog } from "vue-crud-toolkit";

export default {
  name: "crud-confirm-dialog-custom-message-example",
  components: { CrudConfirmDialog },

  data() {
    return {
      id: null,
    };
  },
  methods: {
    apiRequest: () =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
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