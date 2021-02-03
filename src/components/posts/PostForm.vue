<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="formData.title"
      :rules="[rules.required]"
      aria-required
      label="Title"
    />
    <v-textarea
      v-model="formData.description"
      :rules="[rules.required]"
      aria-required
      label="Description"
    />
  </v-form>
</template> 

<script>
import { CrudFormMixin } from "vue-crud-toolkit";
export default {
  mixins: [CrudFormMixin],
};
</script>

<style>
</style>