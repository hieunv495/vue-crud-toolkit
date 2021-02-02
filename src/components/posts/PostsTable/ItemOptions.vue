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
          <v-list-item-title>Restore</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-purge')">
          <v-list-item-icon>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Purge</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item @click="$emit('click-detail')">
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Detail</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-update')">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Update</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('click-remove')">
          <v-list-item-icon>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Remove</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    trashMode: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
</style>