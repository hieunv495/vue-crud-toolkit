<template>
  <v-text-field
    :value="value"
    :loading="loading"
    :placeholder="placeholder"
    outlined
    dense
    rounded
    clearable
    hide-details
    prepend-inner-icon="mdi-magnify"
    class="ml-8 mr-8"
    @input="$emit('input', $event || '')"
  />
</template>
<script >
import Vue from 'vue';
export default Vue.extend({
  name: 'default-search-text-filter',
  props: {
    value: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Tìm kiếm',
    },
  },
});
</script>