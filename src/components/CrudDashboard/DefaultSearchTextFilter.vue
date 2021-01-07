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
    @input="$emit('input', $event || '')"
  />
</template>
<script >
export default {
  name: "default-search-text-filter",
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
      default: "Search",
    },
  },
};
</script>