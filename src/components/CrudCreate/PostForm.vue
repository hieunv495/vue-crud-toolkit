<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="formData.title" label="Title" />
    <v-textarea v-model="formData.description" label="Description" />
  </v-form>
</template> 

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    formBus: { type: Object, default: null },
    beginFormData: {
      type: Object,
      required: true,
    },
    sendRequest: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      formData: JSON.parse(JSON.stringify(this.beginFormData)),
    };
  },

  created() {
    if (this.formBus) {
      this.formBus.$on("submit", this.submit);
    }
  },

  destroyed() {
    if (this.formBus) {
      this.formBus.$off("submit", this.submit);
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.sendRequest(this.formData);
      }
    },
  },
});
</script>

<style>
</style>