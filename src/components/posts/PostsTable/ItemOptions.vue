<template>
  <v-menu offset-y>
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list>
      <template v-if="trashMode">
        <v-list-item @click="$emit('click-restore')">
          <v-list-item-icon>
            <v-icon>mdi-restore</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Khôi phục</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-purge')">
          <v-list-item-icon>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dọn dẹp</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item @click="$emit('click-view')">
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Xem thực tế</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-update')">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Chỉnh sửa</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-remove')">
          <v-list-item-icon>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Xóa</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  props: {
    trashMode: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style>
</style>