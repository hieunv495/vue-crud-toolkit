<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">Ảnh</th>
          <th class="text-left">Trang</th>
          <th class="text-left">Mô tả</th>
          <th class="text-left">Lượt xem</th>
          <th class="text-left">Chỉnh sửa cuối</th>
          <th class="text-left">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>
            <!-- <v-img :src="item.thumbnailImage" width="50px" /> -->
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
              @click-view="$emit('click-view', item)"
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
import Vue from 'vue';
import moment from 'moment';
import ItemOptions from './ItemOptions';
export default Vue.extend({
  name: 'posts-table',
  components: { ItemOptions },
  filters: {
    date: (value) => {
      return moment(value).format('HH:mm DD/MM/YYYY');
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
});
</script>

<style>
</style>