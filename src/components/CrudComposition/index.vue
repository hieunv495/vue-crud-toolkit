<template>
  <div>
    <slot v-if="detailDialog" name="detail" v-bind="self" />
    <slot v-if="createDialog" name="create" v-bind="self" />
    <slot v-if="updateDialog" name="update" v-bind="self" />

    <slot name="success-dialog" v-bind="self">
      <success-snackbar
        :value="notification.success.visible"
        :message="notification.success.message"
        :timeout="2000"
        @input="notification.success.visible = false"
      />
    </slot>
    <slot name="error-dialog" v-bind="self">
      <error-snackbar
        :value="notification.error.visible"
        :message="notification.error.message"
        :timeout="2000"
        @input="notification.error.visible = false"
      />
    </slot>

    <slot name="remove" v-bind="self">
      <crud-confirm-dialog
        v-if="removeApi"
        :id="removeId"
        :visible="!!removeId"
        :request-api="removeApi"
        title="Xác nhận xóa?"
        message="Sau khi xóa dữ liệu sẽ được chuyển vào thùng rác"
        accept-button-label="Xóa"
        @close="closeRemove"
        @success="
          closeRemove();
          notifySuccess('Remove success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <slot name="restore" v-bind="self">
      <crud-confirm-dialog
        v-if="restoreApi"
        :id="restoreId"
        :visible="!!restoreId"
        :request-api="restoreApi"
        title="Xác nhận khôi phục?"
        message="Sau khi khôi phục dữ liệu sẽ được sử dụng bình thường"
        accept-button-label="Khôi phục"
        @close="closeRestore"
        @success="
          closeRestore();
          notifySuccess('Restore success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>
    <slot name="purge" v-bind="self">
      <crud-confirm-dialog
        v-if="purgeApi"
        :id="purgeId"
        :visible="!!purgeId"
        :request-api="purgeApi"
        title="Xác nhận dọn dẹp?"
        message="Sau khi dọn dẹp dữ liệu sẽ bị xóa khỏi hệ thống"
        accept-button-abel="Dọn dẹp"
        @close="closePurge"
        @success="
          closePurge();
          notifySuccess('Purge success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <slot name="empty-trash" v-bind="self">
      <crud-confirm-dialog
        v-if="emptyTrashApi"
        :visible="emptyTrashVisible"
        :request-api="emptyTrashApi"
        title="Xác nhận dọn dẹp thùng rác?"
        message="Sau khi dọn dẹp dữ liệu sẽ bị xóa khỏi hệ thống"
        accept-button-label="Dọn dẹp"
        @close="closeEmptyTrash"
        @success="
          closeEmptyTrash();
          notifySuccess('Empty trash success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <v-window :value="page">
      <v-window-item value="DASHBOARD">
        <slot name="dashboard" v-bind="self" />
      </v-window-item>

      <v-window-item v-if="!detailDialog" value="DETAIL">
        <slot v-if="page === 'DETAIL'" name="detail" v-bind="self" />
      </v-window-item>
      <v-window-item v-if="!createDialog" value="CREATE">
        <slot v-if="page === 'CREATE'" name="create" v-bind="self" />
      </v-window-item>
      <v-window-item v-if="!updateDialog" value="UPDATE">
        <slot v-if="page === 'UPDATE'" name="update" v-bind="self" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import Vue from "vue";
import SuccessSnackbar from "../snackbar/SuccessSnackbar.vue";
import ErrorSnackbar from "../snackbar/ErrorSnackbar.vue";
import CrudConfirmDialog from "../CrudConfirmDialog.vue";

export default Vue.extend({
  name: "crud-composition",
  components: {
    SuccessSnackbar,
    ErrorSnackbar,
    CrudConfirmDialog,
  },

  props: {
    bus: { type: Object, default: null },
    detailDialog: { type: Boolean, default: false },
    createDialog: { type: Boolean, default: false },
    updateDialog: { type: Boolean, default: false },
    removeApi: { type: Function, default: null },
    restoreApi: { type: Function, default: null },
    purgeApi: { type: Function, default: null },
    emptyTrashApi: { type: Function, default: null },
  },

  data() {
    return {
      notification: {
        success: { visible: false, message: "" },
        error: { visible: false, message: "" },
      },

      detailId: null,
      createVisible: false,
      updateId: null,
      removeId: null,
      restoreId: null,
      purgeId: null,
      emptyTrashVisible: false,
    };
  },

  computed: {
    self() {
      return this;
    },

    page() {
      if (!this.detailDialog && this.detailId) return "DETAIL";
      if (!this.createDialog && this.createVisible) return "CREATE";
      if (!this.updateDialog && this.updateId) return "UPDATE";
      return "DASHBOARD";
    },
  },

  created() {
    if (this.bus) {
      this.bus.$on("notify-success", this.notifySuccess);
      this.bus.$on("notify-error", this.notifyError);
      this.bus.$on("open-detail", this.openDetail);
      this.bus.$on("close-detail", this.closeDetail);
      this.bus.$on("open-create", this.openCreate);
      this.bus.$on("close-create", this.closeCreate);
      this.bus.$on("open-update", this.openUpdate);
      this.bus.$on("close-update", this.closeUpdate);
      this.bus.$on("open-remove", this.openRemove);
      this.bus.$on("close-remove", this.closeRemove);
      this.bus.$on("open-restore", this.openRestore);
      this.bus.$on("close-restore", this.closeRestore);
      this.bus.$on("open-purge", this.openPurge);
      this.bus.$on("close-purge", this.closePurge);
      this.bus.$on("open-empty-trash", this.openEmptyTrash);
      this.bus.$on("close-empty-trash", this.closeEmptyTrash);
    }
  },

  destroyed() {
    if (this.bus) {
      this.bus.$off("notify-success", this.notifySuccess);
      this.bus.$off("notify-error", this.notifyError);
      this.bus.$off("open-detail", this.openDetail);
      this.bus.$off("close-detail", this.closeDetail);
      this.bus.$off("open-create", this.openCreate);
      this.bus.$off("close-create", this.closeCreate);
      this.bus.$off("open-update", this.openUpdate);
      this.bus.$off("close-update", this.closeUpdate);
      this.bus.$off("open-remove", this.openRemove);
      this.bus.$off("close-remove", this.closeRemove);
      this.bus.$off("open-restore", this.openRestore);
      this.bus.$off("close-restore", this.closeRestore);
      this.bus.$off("open-purge", this.openPurge);
      this.bus.$off("close-purge", this.closePurge);
      this.bus.$off("open-empty-trash", this.openEmptyTrash);
      this.bus.$off("close-empty-trash", this.closeEmptyTrash);
    }
  },

  methods: {
    notifySuccess(message) {
      this.notification.success.message = message;
      this.notification.success.visible = true;
    },
    notifyError(message) {
      this.notification.error.message = message;
      this.notification.error.visible = true;
    },
    openDetail(id) {
      this.detailId = id;
    },
    closeDetail() {
      this.detailId = null;
    },

    openCreate() {
      this.createVisible = true;
    },
    closeCreate() {
      this.createVisible = false;
    },

    openUpdate(id) {
      this.updateId = id;
    },
    closeUpdate() {
      this.updateId = null;
    },

    openRemove(id) {
      this.removeId = id;
    },
    closeRemove() {
      this.removeId = null;
    },

    openRestore(id) {
      this.restoreId = id;
    },
    closeRestore() {
      this.restoreId = null;
    },

    openPurge(id) {
      this.purgeId = id;
    },
    closePurge() {
      this.purgeId = null;
    },

    openEmptyTrash() {
      this.emptyTrashVisible = true;
    },
    closeEmptyTrash() {
      this.emptyTrashVisible = false;
    },
  },
});
</script>

