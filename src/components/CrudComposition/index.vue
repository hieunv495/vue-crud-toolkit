<template>
  <div>
    <slot v-if="createConfig.dialog" name="create" v-bind="self">
      <crud-create
        v-if="$scopedSlots['create-content']"
        :visible="createVisible"
        :api-create="apiCreate"
        :get-error-message="getErrorMessage"
        :get-begin-form-data="createConfig.getBeginFormData"
        :dialog="true"
        :dialog-props="createConfig.dialogProps"
        @close="bus.$emit('close-create')"
        @success="
          bus.$emit('close-create');
          bus.$emit('notify-success', textCreateSuccess);
          bus.$emit('dashboard-go-to-page', 1);
        "
      >
        <template v-if="$scopedSlots['create-header']" #header="create">
          <slot name="create-header" v-bind="create" />
        </template>
        <template v-if="$scopedSlots['create-title']" #title="create">
          <slot name="create-title" v-bind="create" />
        </template>
        <template v-if="$scopedSlots['create-actions']" #actions="create">
          <slot name="create-actions" v-bind="create" />
        </template>
        <template #default="create">
          <slot name="create-content" v-bind="create" />
        </template>
      </crud-create>
    </slot>

    <slot v-if="detailConfig.dialog" name="detail" v-bind="self">
      <crud-detail
        v-if="$scopedSlots['detail-content']"
        :bus="bus"
        :id="detailId"
        :api-get-one="apiGetOne"
        :get-error-message="getErrorMessage"
        :dialog="true"
        :dialog-props="detailConfig.dialogProps"
        @close="bus.$emit('close-detail')"
      >
        <template v-if="$scopedSlots['detail-header']" #header="detail">
          <slot name="detail-header" v-bind="detail" />
        </template>
        <template v-if="$scopedSlots['detail-title']" #title="detail">
          <slot name="detail-title" v-bind="detail" />
        </template>
        <template v-if="$scopedSlots['detail-actions']" #actions="detail">
          <slot name="detail-actions" v-bind="detail" />
        </template>
        <template #default="detail">
          <slot name="detail-content" v-bind="detail" />
        </template>
      </crud-detail>
    </slot>

    <slot v-if="updateConfig.dialog" name="update" v-bind="self">
      <crud-update
        v-if="$scopedSlots['update-content']"
        :id="updateId"
        :api-get-one="apiGetOne"
        :api-update="apiUpdate"
        :get-error-message="getErrorMessage"
        :get-begin-form-data="updateConfig.getBeginFormData"
        :dialog="true"
        :dialog-props="updateConfig.dialogProps"
        @close="bus.$emit('close-update')"
        @success="
          bus.$emit('close-update');
          bus.$emit('notify-success', textUpdateSuccess);
          bus.$emit('refresh-dashboard');
          bus.$emit('refresh-detail');
        "
      >
        <template v-if="$scopedSlots['update-header']" #header="update">
          <slot name="update-header" v-bind="update" />
        </template>
        <template v-if="$scopedSlots['update-title']" #title="update">
          <slot name="update-title" v-bind="update" />
        </template>
        <template v-if="$scopedSlots['update-actions']" #actions="update">
          <slot name="update-actions" v-bind="update" />
        </template>
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
        :accept-button-label="textRemoveSubmit"
        @close="bus.$emit('close-remove')"
        @success="
          bus.$emit('close-remove');
          bus.$emit('notify-success', textRemoveSuccess);
          bus.$emit('refresh-dashboard');
          bus.$emit('close-detail');
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
        :accept-button-label="textRestoreSubmit"
        @close="bus.$emit('close-restore')"
        @success="
          bus.$emit('close-restore');
          bus.$emit('notify-success', textRestoreSuccess);
          bus.$emit('refresh-dashboard');
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
        :accept-button-label="textPurgeSubmit"
        @close="bus.$emit('close-purge')"
        @success="
          bus.$emit('close-purge');
          bus.$emit('notify-success', textPurgeSuccess);
          bus.$emit('refresh-dashboard');
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
        :accept-button-label="textEmptyTrashSubmit"
        @close="bus.$emit('close-empty-trash')"
        @success="
          bus.$emit('close-empty-trash');
          bus.$emit('notify-success', textEmptyTrashSuccess);
          bus.$emit('refresh-dashboard');
        "
      />
    </slot>

    <v-window :value="page">
      <v-window-item :value="DASHBOARD">
        <slot name="dashboard" v-bind="self">
          <crud-dashboard
            v-if="$scopedSlots['dashboard-content']"
            :router="router"
            :bus="bus"
            :default-filter="dashboardConfig.defaultFilter"
            :default-page="dashboardConfig.defaultPage"
            :default-perPage="dashboardConfig.defaultPerPage"
            :api-normal-pagination="apiNormalPagination"
            :api-trash-pagination="apiTrashPagination"
            :api-normal-count="apiNormalCount"
            :api-trash-count="apiTrashCount"
            :get-error-message="getErrorMessage"
            :has-trash="hasTrash"
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
          !createConfig.dialog &&
          ($scopedSlots['create'] || $scopedSlots['create-content'])
        "
        :value="CREATE"
      >
        <slot v-if="page === CREATE" name="create" v-bind="self">
          <crud-create
            v-if="$scopedSlots['create-content']"
            :visible="createVisible"
            :api-create="apiCreate"
            :get-error-message="getErrorMessage"
            :get-begin-form-data="createConfig.getBeginFormData"
            :dialog="false"
            @close="bus.$emit('close-create')"
            @success="
              bus.$emit('close-create');
              bus.$emit('notify-success', textCreateSuccess);
              bus.$emit('dashboard-go-to-page', 1);
            "
          >
            <template v-if="$scopedSlots['create-header']" #header="create">
              <slot name="create-header" v-bind="create" />
            </template>
            <template v-if="$scopedSlots['create-title']" #title="create">
              <slot name="create-title" v-bind="create" />
            </template>
            <template v-if="$scopedSlots['create-actions']" #actions="create">
              <slot name="create-actions" v-bind="create" />
            </template>
            <template #default="create">
              <slot name="create-content" v-bind="create" />
            </template>
          </crud-create>
        </slot>
      </v-window-item>

      <v-window-item
        v-if="
          !detailConfig.dialog &&
          ($scopedSlots['detail'] || $scopedSlots['detail-content'])
        "
        :value="DETAIL"
      >
        <slot v-if="page === DETAIL" name="detail" v-bind="self">
          <crud-detail
            v-if="$scopedSlots['detail-content']"
            :bus="bus"
            :id="detailId"
            :api-get-one="apiGetOne"
            :get-error-message="getErrorMessage"
            :dialog="false"
            @close="bus.$emit('close-detail')"
          >
            <template v-if="$scopedSlots['detail-header']" #header="detail">
              <slot name="detail-header" v-bind="detail" />
            </template>
            <template v-if="$scopedSlots['detail-title']" #title="detail">
              <slot name="detail-title" v-bind="detail" />
            </template>
            <template v-if="$scopedSlots['detail-actions']" #actions="detail">
              <slot name="detail-actions" v-bind="detail" />
            </template>
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
          !updateConfig.dialog &&
          ($scopedSlots['update'] || $scopedSlots['update-content'])
        "
        :value="UPDATE"
      >
        <slot v-if="page === UPDATE" name="update" v-bind="self">
          <crud-update
            v-if="$scopedSlots['update-content']"
            :id="updateId"
            :api-get-one="apiGetOne"
            :api-update="apiUpdate"
            :get-error-message="getErrorMessage"
            :get-begin-form-data="updateConfig.getBeginFormData"
            :dialog="false"
            @close="bus.$emit('close-update')"
            @success="
              bus.$emit('close-update');
              bus.$emit('notify-success', textUpdateSuccess);
              bus.$emit('refresh-dashboard');
              bus.$emit('refresh-detail');
            "
          >
            <template v-if="$scopedSlots['update-header']" #header="update">
              <slot name="update-header" v-bind="update" />
            </template>
            <template v-if="$scopedSlots['update-title']" #title="update">
              <slot name="update-title" v-bind="update" />
            </template>
            <template v-if="$scopedSlots['update-actions']" #actions="update">
              <slot name="update-actions" v-bind="update" />
            </template>
            <template #default="update">
              <slot name="update-content" v-bind="update" />
            </template>
          </crud-update>
        </slot>
      </v-window-item>
      <v-window-item value="EMPTY"></v-window-item>
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

const DASHBOARD = "DASHBOARD";
const DETAIL = "DETAIL";
const CREATE = "CREATE";
const UPDATE = "UPDATE";

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

  inject: {
    router: {
      default: false,
    },
    hasTrash: { default: true },

    dashboardConfig: {
      default: {
        defaultFilter: { default: () => ({}) },
        defaultPage: { default: 1 },
        defaultPerPage: { default: 10 },
      },
    },

    detailConfig: {
      dialog: { default: true },
      dialogProps: { default: { maxWidth: 800 } },
    },

    createConfig: {
      getBeginFormData: { default: null },
      dialog: { default: true },
      dialogProps: { default: { maxWidth: 800 } },
    },

    updateConfig: {
      getBeginFormData: { default: null },
      dialog: { default: true },
      dialogProps: { default: { maxWidth: 800 } },
    },

    getErrorMessage: {
      default: getErrorMessage,
    },

    apiNormalPagination: { default: null },
    apiTrashPagination: { default: null },
    apiNormalCount: { default: null },
    apiTrashCount: { default: null },
    apiGetOne: { default: null },
    apiCreate: { default: null },
    apiUpdate: { default: null },
    apiRemove: { default: null },
    apiRestore: { default: null },
    apiPurge: { default: null },
    apiEmptyTrash: { default: null },

    textCreateSuccess: { default: "Creates success" },
    textUpdateSuccess: { default: "Update success" },

    textRemoveTitle: { default: "Confirm remove" },
    textRemoveMessage: { default: "Are you sure?" },
    textRemoveSubmit: { default: "Remove" },
    textRemoveSuccess: { default: "Remove success" },

    textRestoreTitle: { default: "Confirm restore" },
    textRestoreMessage: { default: "Are you sure?" },
    textRestoreSubmit: { default: "Restore" },
    textRestoreSuccess: { default: "Restore success" },

    textPurgeTitle: { default: "Confirm purge" },
    textPurgeMessage: { default: "Are you sure?" },
    textPurgeSubmit: { default: "Purge" },
    textPurgeSuccess: { default: "Purge success" },

    textEmptyTrashTitle: { default: "Confirm empty trash" },
    textEmptyTrashMessage: { default: "Are you sure?" },
    textEmptyTrashSubmit: { default: "Empty trash" },
    textEmptyTrashSuccess: { default: "Empty trash success" },
  },

  props: {
    bus: { type: Object, required: true },
  },

  data() {
    return {
      DASHBOARD,
      DETAIL,
      CREATE,
      UPDATE,
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
      if (!this.updateDialog && this.updateId) return UPDATE;
      if (!this.detailDialog && this.detailId) return DETAIL;
      if (!this.createDialog && this.createVisible) return CREATE;
      return DASHBOARD;
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
        this.syncSearchParams.push();
        // window.history.back();
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

