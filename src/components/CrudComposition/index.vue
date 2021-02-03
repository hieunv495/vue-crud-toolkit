<template>
  <div>
    <slot v-if="detailDialog" name="detail" v-bind="self">
      <crud-detail
        v-if="$scopedSlots['detail-content']"
        :id="detailId"
        :api-get-one="apiGetOne"
        :get-error-message="getErrorMessage"
        :dialog="detailDialog"
        :dialog-props="detailDialogProps"
        :title="detailTitle"
        :text-back="textBack"
        @close="bus.$emit('close-detail')"
      >
        <template #default="detail">
          <slot name="detail-content" v-bind="detail" />
        </template>
      </crud-detail>
    </slot>
    <slot v-if="createDialog" name="create" v-bind="self">
      <crud-create
        v-if="$scopedSlots['create-content']"
        :visible="createVisible"
        :title="createTitle"
        :api-create="apiCreate"
        :get-error-message="getErrorMessage"
        :get-begin-form-data="getBeginFormData"
        :dialog="createDialog"
        :dialog-props="createDialogProps"
        :text-back="textBack"
        :text-create-submit="textCreateSubmit"
        @close="bus.$emit('close-create')"
        @success="
          bus.$emit('close-create');
          bus.$emit('notify-success', 'Create success!');
          bus.$emit('dashboard-go-to-page', 1);
        "
      >
        <template #default="create">
          <slot name="create-content" v-bind="create" />
        </template>
      </crud-create>
    </slot>
    <slot v-if="updateDialog" name="update" v-bind="self">
      <crud-update
        v-if="$scopedSlots['update-content']"
        :id="updateId"
        :title="updateTitle"
        :api-get-one="apiGetOne"
        :api-update="apiUpdate"
        :get-error-message="getErrorMessage"
        :get-begin-form-data="getBeginFormData"
        :dialog="updateDialog"
        :dialog-props="updateDialogProps"
        :text-back="textBack"
        :text-update-submit="textUpdateSubmit"
        @close="bus.$emit('close-update')"
        @success="
          bus.$emit('close-update');
          bus.$emit('notify-success', 'Update success');
          bus.$emit('dashboard-refresh');
        "
      >
        <template #default="update">
          <slot name="update-content" v-bind="update" />
        </template>
      </crud-update>
    </slot>

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
        :id="removeId"
        :visible="!!removeId"
        :api-request="apiRemove"
        :get-error-message="getErrorMessage"
        :title="textRemoveTitle"
        :message="textRemoveMessage"
        :accept-button-label="textRemoveAcceptButtonLabel"
        @close="bus.$emit('close-remove')"
        @success="
          bus.$emit('close-remove');
          bus.$emit('notify-success', 'Remove success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <slot name="restore" v-bind="self">
      <crud-confirm-dialog
        :id="restoreId"
        :visible="!!restoreId"
        :api-request="apiRestore"
        :get-error-message="getErrorMessage"
        :title="textRestoreTitle"
        :message="textRestoreMessage"
        :accept-button-label="textRestoreAcceptButtonLabel"
        @close="bus.$emit('close-restore')"
        @success="
          bus.$emit('close-restore');
          bus.$emit('notify-success', 'Restore success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>
    <slot name="purge" v-bind="self">
      <crud-confirm-dialog
        :id="purgeId"
        :visible="!!purgeId"
        :api-request="apiPurge"
        :get-error-message="getErrorMessage"
        :title="textPurgeTitle"
        :message="textPurgeMessage"
        :accept-button-label="textPurgeAcceptButtonLabel"
        @close="bus.$emit('close-purge')"
        @success="
          bus.$emit('close-purge');
          bus.$emit('notify-success', 'Purge success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <slot name="empty-trash" v-bind="self">
      <crud-confirm-dialog
        :visible="emptyTrashVisible"
        :api-request="apiEmptyTrash"
        :get-error-message="getErrorMessage"
        :title="textEmptyTrashTitle"
        :message="textEmptyTrashMessage"
        :accept-button-label="textEmptyTrashAcceptButtonLabel"
        @close="bus.$emit('close-empty-trash')"
        @success="
          bus.$emit('close-empty-trash');
          bus.$emit('notify-success', 'Empty trash success');
          bus.$emit('dashboard-refresh');
        "
      />
    </slot>

    <v-window :value="page">
      <v-window-item value="DASHBOARD">
        <slot name="dashboard" v-bind="self">
          <crud-dashboard
            v-if="$scopedSlots['dashboard-content']"
            :router="router"
            :bus="bus"
            :default-filter="defaultFilter"
            :default-page="defaultPage"
            :default-perPage="defaultPerPage"
            :api-normal-pagination="apiNormalPagination"
            :api-trash-pagination="apiTrashPagination"
            :api-normal-count="apiNormalCount"
            :api-trash-count="apiTrashCount"
            :get-error-message="getErrorMessage"
            :has-trash="hasTrash"
            :title="dashboardTitle"
            :text-create="textCreate"
            :text-normal="textNormal"
            :text-trash="textTrash"
            :text-empty-trash="textEmptyTrash"
            @click-create="bus.$emit('open-create')"
            @click-empty-trash="bus.$emit('open-empty-trash')"
          >
            <template #header-filter="dashboard">
              <slot name="dashboard-header-filter" v-bind="dashboard" />
            </template>
            <template #default="dashboard">
              <slot name="dashboard-content" v-bind="dashboard" />
            </template>
          </crud-dashboard>
        </slot>
      </v-window-item>

      <v-window-item
        v-if="
          !detailDialog &&
          ($scopedSlots['detail'] || $scopedSlots['detail-content'])
        "
        value="DETAIL"
      >
        <slot v-if="page === 'DETAIL'" name="detail" v-bind="self">
          <crud-detail
            v-if="$scopedSlots['detail-content']"
            :id="detailId"
            :api-get-one="apiGetOne"
            :get-error-message="getErrorMessage"
            :dialog="detailDialog"
            :title="detailTitle"
            :text-back="textBack"
            @close="bus.$emit('close-detail')"
          >
            <template #default="detail">
              <slot name="detail-content" v-bind="detail">
                Detail content
              </slot>
            </template>
          </crud-detail>
        </slot>
      </v-window-item>
      <v-window-item
        v-if="
          !createDialog &&
          ($scopedSlots['create'] || $scopedSlots['create-content'])
        "
        value="CREATE"
      >
        <slot v-if="page === 'CREATE'" name="create" v-bind="self">
          <crud-create
            v-if="$scopedSlots['create-content']"
            :visible="createVisible"
            :title="createTitle"
            :api-create="apiCreate"
            :get-error-message="getErrorMessage"
            :get-begin-form-data="getBeginFormData"
            :dialog="createDialog"
            :dialog-props="createDialogProps"
            :text-back="textBack"
            :text-create-submit="textCreateSubmit"
            @close="bus.$emit('close-create')"
            @success="
              bus.$emit('close-create');
              bus.$emit('notify-success', 'Create success!');
              bus.$emit('dashboard-go-to-page', 1);
            "
          >
            <template #default="create">
              <slot name="create-content" v-bind="create" />
            </template>
          </crud-create>
        </slot>
      </v-window-item>
      <v-window-item
        v-if="
          !updateDialog &&
          ($scopedSlots['update'] || $scopedSlots['update-content'])
        "
        value="UPDATE"
      >
        <slot v-if="page === 'UPDATE'" name="update" v-bind="self">
          <crud-update
            v-if="$scopedSlots['update-content']"
            :id="updateId"
            :title="updateTitle"
            :api-get-one="apiGetOne"
            :api-update="apiUpdate"
            :get-error-message="getErrorMessage"
            :get-begin-form-data="getBeginFormData"
            :dialog="updateDialog"
            :dialog-props="updateDialogProps"
            :text-back="textBack"
            :text-update-submit="textUpdateSubmit"
            @close="bus.$emit('close-update')"
            @success="
              bus.$emit('close-update');
              bus.$emit('notify-success', 'Update success');
              bus.$emit('dashboard-refresh');
            "
          >
            <template #default="update">
              <slot name="update-content" v-bind="update" />
            </template>
          </crud-update>
        </slot>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import getErrorMessage from "../utils/getErrorMessage";
import SuccessSnackbar from "../snackbar/SuccessSnackbar.vue";
import ErrorSnackbar from "../snackbar/ErrorSnackbar.vue";
import CrudDashboard from "../CrudDashboard";
import CrudDetail from "../CrudDetail";
import CrudCreate from "../CrudCreate";
import CrudUpdate from "../CrudUpdate";
import CrudConfirmDialog from "../CrudConfirmDialog";
import SyncSearchParams from "@/components/utils/SyncSearchParams";

export default {
  name: "crud-composition",
  components: {
    SuccessSnackbar,
    ErrorSnackbar,
    CrudConfirmDialog,
    CrudDashboard,
    CrudDetail,
    CrudCreate,
    CrudUpdate,
  },

  props: {
    router: {
      type: Boolean,
      default: false,
    },
    bus: { type: Object, required: true },
    dashboardTitle: { type: String, default: null },
    hasTrash: { type: Boolean, default: true },
    defaultFilter: { type: Object, default: () => ({}) },
    defaultPage: { type: Number, default: 1 },
    defaultPerPage: { type: Number, default: 5 },
    getBeginFormData: { type: Function, default: null },
    detailDialog: { type: Boolean, default: false },
    detailDialogProps: { type: Object, default: null },
    detailTitle: { type: String, default: null },
    createDialog: { type: Boolean, default: false },
    createDialogProps: { type: Object, default: null },
    createTitle: { type: String, default: null },
    updateDialog: { type: Boolean, default: false },
    updateDialogProps: { type: Object, default: null },
    updateTitle: { type: String, default: null },

    apiNormalPagination: { type: Function, default: null },
    apiTrashPagination: { type: Function, default: null },
    apiNormalCount: { type: Function, default: null },
    apiTrashCount: { type: Function, default: null },
    apiGetOne: { type: Function, default: null },
    apiCreate: { type: Function, default: null },
    apiUpdate: { type: Function, default: null },
    apiRemove: { type: Function, default: null },
    apiRestore: { type: Function, default: null },
    apiPurge: { type: Function, default: null },
    apiEmptyTrash: { type: Function, default: null },

    getErrorMessage: {
      type: Function,
      default: getErrorMessage,
    },

    textCreate: {
      type: String,
      default: "Add",
    },
    textNormal: {
      type: String,
      default: "Normal",
    },
    textTrash: {
      type: String,
      default: "Trash",
    },
    textEmptyTrash: {
      type: String,
      default: "Empty trash",
    },
    textBack: {
      type: String,
      default: "Back",
    },
    textCreateSubmit: {
      type: String,
      default: "Save",
    },
    textUpdateSubmit: {
      type: String,
      default: "Save",
    },

    textRemoveTitle: {
      type: String,
      default: "Confirm remove",
    },
    textRemoveMessage: {
      type: String,
      default: "Are you sure?",
    },
    textRemoveAcceptButtonLabel: {
      type: String,
      default: "Remove",
    },

    textRestoreTitle: {
      type: String,
      default: "Confirm restore",
    },
    textRestoreMessage: {
      type: String,
      default: "Are you sure?",
    },
    textRestoreAcceptButtonLabel: {
      type: String,
      default: "Restore",
    },

    textPurgeTitle: {
      type: String,
      default: "Confirm purge",
    },
    textPurgeMessage: {
      type: String,
      default: "Are you sure?",
    },
    textPurgeAcceptButtonLabel: {
      type: String,
      default: "Purge",
    },

    textEmptyTrashTitle: {
      type: String,
      default: "Confirm empty trash",
    },
    textEmptyTrashMessage: {
      type: String,
      default: "Are you sure?",
    },
    textEmptyTrashAcceptButtonLabel: {
      type: String,
      default: "Empty trash",
    },
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
  watch: {
    router() {
      if (this.router) {
        this.subscribeHistory();
      } else {
        this.unSubscribeHistory();
      }
    },
  },

  created() {
    if (this.router) {
      this.syncSearchParams = new SyncSearchParams({
        historyPush: true,
        paramTypes: {
          "detail-id": {
            type: "json",
            default: null,
            cleanDefault: true,
          },
          "create-visible": {
            type: "json",
            default: false,
            cleanDefault: true,
          },
          "update-id": {
            type: "json",
            default: null,
            cleanDefault: true,
          },
          "remove-id": {
            type: "json",
            default: null,
            cleanDefault: true,
          },
          "restore-id": {
            type: "json",
            default: null,
            cleanDefault: true,
          },
          "purge-id": {
            type: "json",
            default: null,
            cleanDefault: true,
          },
          "empty-trash-visible": {
            type: "json",
            default: false,
            cleanDefault: true,
          },
        },
        paramsGetter: () => ({
          "detail-id": this.detailId,
          "create-visible": this.createVisible,
          "update-id": this.updateId,
          "remove-id": this.removeId,
          "restore-id": this.restoreId,
          "purge-id": this.purgeId,
          "empty-trash-visible": this.emptyTrashVisible,
        }),
        paramsSetter: async (params) => {
          this.detailId = params["detail-id"];
          this.createVisible = params["create-visible"];
          this.updateId = params["update-id"];
          this.removeId = params["remove-id"];
          this.restoreId = params["restore-id"];
          this.purgeId = params["purge-id"];
          this.emptyTrashVisible = params["empty-trash-visible"];
        },
      });
    }

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
    if (this.syncSearchParams) {
      this.syncSearchParams.destroy();
    }

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
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeDetail() {
      this.detailId = null;
      if (this.router) {
        window.history.back();
      }
    },

    openCreate() {
      this.createVisible = true;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeCreate() {
      this.createVisible = false;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },

    openUpdate(id) {
      this.updateId = id;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeUpdate() {
      this.updateId = null;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },

    openRemove(id) {
      this.removeId = id;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeRemove() {
      this.removeId = null;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },

    openRestore(id) {
      this.restoreId = id;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeRestore() {
      this.restoreId = null;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },

    openPurge(id) {
      this.purgeId = id;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closePurge() {
      this.purgeId = null;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },

    openEmptyTrash() {
      this.emptyTrashVisible = true;
      if (this.router) {
        this.syncSearchParams.push();
      }
    },
    closeEmptyTrash() {
      this.emptyTrashVisible = false;
      if (this.router) {
        this.syncSearchParams.push();
        // window.history.back();
      }
    },
  },
};
</script>

