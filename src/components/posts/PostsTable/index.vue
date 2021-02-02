<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">Image</th>
          <th class="text-left">Title</th>
          <th class="text-left">Description</th>
          <th class="text-left">View</th>
          <th class="text-left">Last updated</th>
          <th class="text-left">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>
            <v-img src="https://placehold.it/50x25" width="50px" />
          </td>
          <td>
            <b
              style="cursor: pointer"
              @click="trashMode ? null : $emit('click-detail', item)"
              >{{ item.title.slice(0, 50) }}...</b
            >
          </td>
          <td>{{ item.description.slice(0, 50) }}...</td>
          <td>{{ item.views }}</td>
          <td>{{ item.updatedAt | date }}</td>
          <td>
            <item-options
              :trash-mode="trashMode"
              @click-detail="$emit('click-detail', item)"
              @click-update="$emit('click-update', item)"
              @click-remove="$emit('click-remove', item)"
              @click-restore="$emit('click-restore', item)"
              @click-purge="$emit('click-purge', item)"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import moment from "moment";
import ItemOptions from "./ItemOptions";

export default {
  name: "posts-table",
  components: { ItemOptions },
  filters: {
    date: (value) => {
      return moment(value).format("HH:mm DD/MM/YYYY");
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    trashMode: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
</style>