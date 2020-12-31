import DefaultExample_code from "!!raw-loader!./examples/default.example.vue";
import DefaultExample from "./examples/default.example.vue";

import CustomActionsExample from "./examples/custom-actions.example.vue";
import CustomActionsExample_code from "!!raw-loader!./examples/custom-actions.example.vue";

import DefaultErrorExample from "./examples/default-error.example.vue";
import DefaultErrorExample_code from "!!raw-loader!./examples/default-error.example.vue";

import CustomErrorExample from "./examples/custom-error.example.vue";
import CustomErrorExample_code from "!!raw-loader!./examples/custom-error.example.vue";

import CrudCreate from "./index";

export default {
  title: "CRUD/Create",
  component: CrudCreate,

  argTypes: {
    bus: {
      control: {
        disable: true,
      },
    },
    dialog: {
      control: {
        type: "boolean",
      },
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

// ------------ DEFAULT ------------
export const CustomActions = () => CustomActionsExample;
Default.parameters = {
  docs: {
    source: {
      code: CustomActionsExample_code,
    },
  },
};

// ------------ DEFAULT ERROR ------------
export const DefaultError = () => DefaultErrorExample;
DefaultError.parameters = {
  docs: {
    source: {
      code: DefaultErrorExample_code,
    },
  },
};

// ------------ CUSTOM ERROR ------------
export const CustomError = () => CustomErrorExample;
CustomError.parameters = {
  docs: {
    source: {
      code: CustomErrorExample_code,
    },
  },
};