<template>
  <v-card v-if="card" :key="key" v-bind="cardProps">
    <!-- @slot header -->
    <slot name="header" v-bind="self">
      <v-layout align-center>
        <v-flex>
          <!-- @slot title -->
          <slot name="title" v-bind="self">
            <v-card-title>{{ title }}</v-card-title>
          </slot>
        </v-flex>
        <v-flex shrink>
          <!-- @slot actions -->
          <slot name="actions" v-bind="self" />
        </v-flex>
        <v-flex shrink>
          <!-- @slot close -->
          <slot name="close">
            <v-btn
              icon
              large
              @click="$emit('close')"
              title="Close"
              class="ml-8"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </slot>
        </v-flex>
      </v-layout>
    </slot>
    <v-card-text>
      <!-- @slot default -->
      <slot v-bind="self" />
    </v-card-text>
  </v-card>
  <div v-else :key="key">
    <!-- @slot header -->
    <slot name="header" v-bind="self">
      <v-layout align-center wrap align="center" style="gap: 16px">
        <v-flex shrink>
          <!-- @slot back -->
          <slot name="back">
            <v-btn
              :title="textBack"
              color="success"
              large
              icon
              @click="$emit('close')"
            >
              <v-icon>mdi-arrow-left</v-icon>
              <!-- {{ textBack }} -->
            </v-btn>
          </slot>
        </v-flex>
        <v-flex>
          <!-- @slot title -->
          <slot name="title" v-bind="self">
            <h1 class="text-h5">{{ title }}</h1>
          </slot>
        </v-flex>
        <v-flex shrink>
          <!-- @slot actions -->
          <slot name="actions" v-bind="self" />
        </v-flex>
      </v-layout>
    </slot>
    <!-- @slot default -->
    <slot v-bind="self" />
  </div>
</template>

<script>
export default {
  name: "smart-window",
  inject: {
    textBack: { default: "Back" },
  },
  props: {
    title: {
      type: String,
      default: null,
    },

    card: {
      type: Boolean,
      default: false,
    },
    cardProps: {
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

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>