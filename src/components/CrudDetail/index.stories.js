import CustomActionsExample_code from "!!raw-loader!./examples/custom-actions.example.vue";
import CustomEmptyExample_code from "!!raw-loader!./examples/custom-empty.example.vue";
import CustomErrorExample_code from "!!raw-loader!./examples/custom-error.example.vue";
import CustomHeaderExample_code from "!!raw-loader!./examples/custom-header.example.vue";
import CustomLoadingExample_code from "!!raw-loader!./examples/custom-loading.example.vue";
import DefaultEmptyExample_code from "!!raw-loader!./examples/default-empty.example.vue";
import DefaultErrorExample_code from "!!raw-loader!./examples/default-error.example.vue";
import DefaultLoadingExample_code from "!!raw-loader!./examples/default-loading.example.vue";
import DefaultExample_code from "!!raw-loader!./examples/default.example.vue";
// Custom empty
import CustomActionsExample from "./examples/custom-actions.example.vue";
// Custom empty
import CustomEmptyExample from "./examples/custom-empty.example.vue";
// Custom error
import CustomErrorExample from "./examples/custom-error.example.vue";
// Custom header
import CustomHeaderExample from "./examples/custom-header.example.vue";
// Custom loading
import CustomLoadingExample from "./examples/custom-loading.example.vue";
// Default empty
import DefaultEmptyExample from "./examples/default-empty.example.vue";
// Default error
import DefaultErrorExample from "./examples/default-error.example.vue";
// Default loading
import DefaultLoadingExample from "./examples/default-loading.example.vue";
// Default
import DefaultExample from "./examples/default.example.vue";
import CrudDetail from "./index.vue";

export default {
  title: "CRUD/Detail",
  component: CrudDetail,

  argTypes: {
    id: {
      description: "Id of item",
      // control: {
      //   type: "select",
      //   options: [null, "0", "1", "2"],
      // },
    },
    getOneApi: {
      description:
        "This is function that fetch item data by `id`, it can be async when return a `Promise`",
    },
    getErrorMessage: {
      description: "Function get error message when `getOneApi` throw an error",
    },
    dialog: {
      control: {
        type: "boolean",
      },
    },
  },
};

// DEFAULT

export const Default = () => DefaultExample;
Default.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// DEFAULT LOADING
export const DefaultLoading = () => DefaultLoadingExample;
DefaultLoading.parameters = {
  docs: {
    source: {
      code: DefaultLoadingExample_code,
    },
  },
};

// CUSTOM LOADING
export const CustomLoading = () => CustomLoadingExample;
CustomLoading.parameters = {
  docs: {
    source: {
      code: CustomLoadingExample_code,
    },
  },
};

// DEFAULT ERROR
export const DefaultError = () => DefaultErrorExample;
DefaultError.parameters = {
  docs: {
    source: {
      code: DefaultErrorExample_code,
    },
  },
};

// CUSTOM ERROR
export const CustomError = () => CustomErrorExample;
CustomError.parameters = {
  docs: {
    source: {
      code: CustomErrorExample_code,
    },
  },
};

// DEFAULT EMPTY
export const DefaultEmpty = () => DefaultEmptyExample;
DefaultEmpty.parameters = {
  docs: {
    source: {
      code: DefaultEmptyExample_code,
    },
  },
};

// CUSTOM EMPTY
export const CustomEmpty = () => CustomEmptyExample;
CustomEmpty.parameters = {
  docs: {
    source: {
      code: CustomEmptyExample_code,
    },
  },
};

// WITH DIALOG

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

// CUSTOM ACTIONS
export const CustomActions = () => CustomActionsExample;
CustomActions.parameters = {
  docs: {
    source: {
      code: CustomActionsExample_code,
    },
  },
};

export const CustomActionsWithDialog = () => CustomActionsExample;
CustomActionsWithDialog.args = {
  dialog: true,
};
CustomActionsWithDialog.parameters = {
  docs: {
    source: {
      code: CustomActionsExample_code,
    },
  },
};

// CUSTOM HEADER

export const CustomHeader = () => CustomHeaderExample;
CustomHeader.parameters = {
  docs: {
    source: {
      code: CustomHeaderExample_code,
    },
  },
};

export const CustomHeaderWithDialog = () => CustomHeaderExample;
CustomHeaderWithDialog.args = {
  dialog: true,
};
CustomHeaderWithDialog.parameters = {
  docs: {
    source: {
      code: CustomHeaderExample_code,
    },
  },
};
