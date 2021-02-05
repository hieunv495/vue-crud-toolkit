import DefaultExample_code from "!!raw-loader!./examples/default.vue";
import DefaultExample from "./examples/default.vue";

import WithRouterExample_code from "!!raw-loader!./examples/with-router.vue";
import WithRouterExample from "./examples/with-router.vue";

import LimitAccessExample_code from "!!raw-loader!./examples/limit-access.vue";
import LimitAccessExample from "./examples/limit-access.vue";

import CustomDashboardExample from "./examples/custom-dashboard.vue";
import CustomDashboardExample_code from "!!raw-loader!./examples/custom-dashboard.vue";

import CustomDetailExample from "./examples/custom-detail.vue";
import CustomDetailExample_code from "!!raw-loader!./examples/custom-detail.vue";

import CustomCreateExample from "./examples/custom-create.vue";
import CustomCreateExample_code from "!!raw-loader!./examples/custom-create.vue";

import CustomUpdateExample from "./examples/custom-update.vue";
import CustomUpdateExample_code from "!!raw-loader!./examples/custom-update.vue";

import CustomRemoveRestorePurgeEmptyTrashExample from "./examples/custom-remove-restore-purge-empty-trash.vue";
import CustomRemoveRestorePurgeEmptyTrashExample_code from "!!raw-loader!./examples/custom-remove-restore-purge-empty-trash.vue";

import CustomTextExample from "./examples/custom-text.vue";
import CustomTextExample_code from "!!raw-loader!./examples/custom-text.vue";

import WithErrorExample from "./examples/with-error.vue";
import WithErrorExample_code from "!!raw-loader!./examples/with-error.vue";

import CustomTitleActionsExample from "./examples/custom-title-actions.vue";
import CustomTitleActionsExample_code from "!!raw-loader!./examples/custom-title-actions.vue";

import CustomHeaderExample from "./examples/custom-header.vue";
import CustomHeaderExample_code from "!!raw-loader!./examples/custom-header.vue";

import CrudComposition from "./index";

export default {
  title: "CRUD/Composition",
  component: CrudComposition,

  argTypes: {
    bus: {
      control: {
        disable: true,
      },
    },
    dialog: {
      type: "boolean",
    },
  },
};

// ------------ DEFAULT ------------
export const Default = () => DefaultExample;
Default.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// ------------ WITH DIALOG ------------
export const WithDialog = () => DefaultExample;
WithDialog.args = {
  dialog: true,
};
WithDialog.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// ------------ LIMIT ACCESS ------------
export const LimitAccess = () => LimitAccessExample;
LimitAccess.args = {
  dialog: true,
};
LimitAccess.parameters = {
  docs: {
    source: {
      code: LimitAccessExample_code,
    },
  },
};

// ------------ WITH ROUTER ------------
export const WithRouter = () => WithRouterExample;
WithRouter.parameters = {
  docs: {
    source: {
      code: WithRouterExample_code,
    },
  },
};

// ------------ CUSTOM DASHBOARD ------------
export const CustomDashboard = () => CustomDashboardExample;
CustomDashboard.parameters = {
  docs: {
    source: {
      code: CustomDashboardExample_code,
    },
  },
};

// ------------ CUSTOM DETAIL ------------
export const CustomDetail = () => CustomDetailExample;
CustomDetail.parameters = {
  docs: {
    source: {
      code: CustomDetailExample_code,
    },
  },
};

// ------------ CUSTOM CREATE ------------
export const CustomCreate = () => CustomCreateExample;
CustomCreate.parameters = {
  docs: {
    source: {
      code: CustomCreateExample_code,
    },
  },
};

// ------------ CUSTOM UPDATE ------------
export const CustomUpdate = () => CustomUpdateExample;
CustomUpdate.parameters = {
  docs: {
    source: {
      code: CustomUpdateExample_code,
    },
  },
};

// ------------ CUSTOM REMOVE RESTORE PURGE EMPTY TRASH ------------
export const CustomRemoveRestorePurgeEmptyTrash = () =>
  CustomRemoveRestorePurgeEmptyTrashExample;
CustomRemoveRestorePurgeEmptyTrash.parameters = {
  docs: {
    source: {
      code: CustomRemoveRestorePurgeEmptyTrashExample_code,
    },
  },
};

// ------------ CUSTOM TEXT ------------
export const CustomText = () => CustomTextExample;
CustomText.parameters = {
  docs: {
    source: {
      code: CustomTextExample_code,
    },
  },
};

// ------------ WITH ERROR   ------------
export const WithError = () => WithErrorExample;
WithError.parameters = {
  docs: {
    source: {
      code: WithErrorExample_code,
    },
  },
};

// ------------ CUSTOM TITLE ACTIONS   ------------
export const CustomTitleActions = () => CustomTitleActionsExample;
CustomTitleActions.parameters = {
  docs: {
    source: {
      code: CustomTitleActionsExample_code,
    },
  },
};

// ------------ CUSTOM HEADER    ------------
export const CustomHeader = () => CustomHeaderExample;
CustomHeader.parameters = {
  docs: {
    source: {
      code: CustomHeaderExample_code,
    },
  },
};
