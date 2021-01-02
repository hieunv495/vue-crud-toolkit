<template>
  <v-layout align-center style="gap: 16px">
    <v-flex shrink>
      <v-btn icon color="success" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-flex>
    <v-flex shrink>
      <v-btn icon color="success" @click="forward">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex shrink>
      <v-btn icon color="success" @click="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-text-field
        :value="href"
        hide-details=""
        readonly
        outlined
        dense
        style="font-size: 12px"
      />
    </v-flex>
    <v-flex shrink>
      <v-btn
        tag="a"
        :href="href"
        target="_blank"
        icon
        color="success"
        @click="back"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "browser-navigation",

  data() {
    return {
      href: window.location.href,
    };
  },

  created() {
    window.addEventListener("popstate", this.updateHref);
  },

  destroyed() {
    window.removeEventListener("popstate", this.updateHref);
  },

  methods: {
    updateHref() {
      this.href = window.location.href;
    },
    back() {
      window.history.back();
    },
    forward() {
      window.history.forward();
    },
    refresh() {
      window.location.reload();
    },
  },
});
</script>

<style>
</style>