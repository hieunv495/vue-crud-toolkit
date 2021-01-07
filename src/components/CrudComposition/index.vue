<template>
  <div>
    <slot v-if="detailDialog" name="detail" v-bind="self">
      <crud-detail
        v-if="$scopedSlots['detail-content']"
        :id="detailId"
        :get-one-api="getOneApi"
        :dialog="detailDialog"
        :dialog-props="detailDialogProps"
        :title="detailTitle"
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
        :create-api="createApi"
        :get-begin-form-data="getBeginFormData"
        :dialog="createDialog"
        :dialog-props="createDialogProps"
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
        :get-one-api="getOneApi"
        :update-api="updateApi"
        :get-begin-form-data="getBeginFormData"
        :dialog="updateDialog"
        :dialog-props="updateDialogProps"
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
        :request-api="removeApi"
        title="Confirm remove?"
        message="Are you sure?"
        accept-button-label="remove"
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
        :request-api="restoreApi"
        title="Confirm restore?"
        message="Are you sure?"
        accept-button-label="Restore"
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
        :request-api="purgeApi"
        title="Confirm purge?"
        message="Are you sure?"
        accept-button-abel="Purge"
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
        :request-api="emptyTrashApi"
        title="Confirm empty trash?"
        message="Are you sure?"
        accept-button-label="Empty trash"
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
            :default-limit="defaultLimit"
            :default-page="defaultPage"
            :get-list-api="getListApi"
            :get-trash-list-api="getTrashListApi"
            :normal-count-api="normalCountApi"
            :trash-count-api="trashCountApi"
            :has-trash="hasTrash"
            :title="dashboardTitle"
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
            :get-one-api="getOneApi"
            :dialog="detailDialog"
            :title="detailTitle"
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
            :create-api="createApi"
            :get-begin-form-data="getBeginFormData"
            :dialog="createDialog"
            :dialog-props="createDialogProps"
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
            :get-one-api="getOneApi"
            :update-api="updateApi"
            :get-begin-form-data="getBeginFormData"
            :dialog="updateDialog"
            :dialog-props="updateDialogProps"
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
// import Vue from "vue";
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
    defaultLimit: { type: Number, default: 5 },
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
    getListApi: { type: Function, default: null },
    getTrashListApi: { type: Function, default: null },
    normalCountApi: { type: Function, default: null },
    trashCountApi: { type: Function, default: null },
    getOneApi: { type: Function, default: null },
    createApi: { type: Function, default: null },
    updateApi: { type: Function, default: null },
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
          },
          "create-visible": {
            type: "json",
            default: false,
          },
          "update-id": {
            type: "json",
            default: null,
          },
          "remove-id": {
            type: "json",
            default: null,
          },
          "restore-id": {
            type: "json",
            default: null,
          },
          "purge-id": {
            type: "json",
            default: null,
          },
          "empty-trash-visible": {
            type: "json",
            default: false,
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

