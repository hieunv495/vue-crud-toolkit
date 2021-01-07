<template>
  <v-dialog
    v-if="dialog"
    :value="visible"
    scrollable
    v-bind="dialogProps"
    @input="$emit('close')"
  >
    <v-card :key="key">
      <slot name="header" v-bind="self">
        <v-layout align-center>
          <v-flex>
            <slot name="title" v-bind="self">
              <v-card-title>{{ title }}</v-card-title>
            </slot>
          </v-flex>
          <v-flex shrink>
            <v-btn icon large @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </slot>
      <v-card-text>
        <slot v-bind="self" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" v-bind="self" />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div v-else-if="visible" :key="key">
    <slot name="header" v-bind="self">
      <v-layout wrap align="center" style="gap: 16px">
        <v-flex shrink>
          <v-btn color="success" @click="$emit('close')">
            <v-icon left>mdi-arrow-left</v-icon>
            {{ backTitle }}</v-btn
          >
        </v-flex>
        <v-flex>
          <slot name="title" v-bind="self">
            <h1 class="text-h5">{{ title }}</h1>
          </slot>
        </v-flex>
        <v-flex shrink>
          <slot name="actions" v-bind="self" />
        </v-flex>
      </v-layout>
    </slot>
    <slot v-bind="self" />
  </div>
</template>

<script>
export default {
  name: "smart-window",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    backTitle: {
      type: String,
      default: "Back",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    dialogProps: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      key: 0,
    };
  },
  computed: {
    self() {
      return this;
    },
  },
  watch: {
    visible(val) {
      if (val) this.key++;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>