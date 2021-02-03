import CrudConfirmDialog from "./index.vue";

import DefaultExample from "./examples/default.example.vue";
import DefaultExample_code from "!!raw-loader!./examples/default.example.vue";

import WithErrorExample from "./examples/with-error.example.vue";
import WithErrorExample_code from "!!raw-loader!./examples/with-error.example.vue";

import CustomErrorExample from "./examples/custom-error.example.vue";
import CustomErrorExample_code from "!!raw-loader!./examples/custom-error.example.vue";

import CustomMessageExample from "./examples/custom-message.example.vue";
import CustomMessageExample_code from "!!raw-loader!./examples/custom-message.example.vue";

import CustomTitleExample from "./examples/custom-title.example.vue";
import CustomTitleExample_code from "!!raw-loader!./examples/custom-title.example.vue";

export default {
  title: "CRUD/ConfirmDialog",
  component: CrudConfirmDialog,
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

// WITH ERROR
export const WithError = () => WithErrorExample;
WithError.parameters = {
  docs: {
    source: {
      code: WithErrorExample_code,
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

// CUSTOM MESSAGE
export const CustomMessage = () => CustomMessageExample;
CustomMessage.parameters = {
  docs: {
    source: {
      code: CustomMessageExample_code,
    },
  },
};

// CUSTOM TITLE
export const CustomTitle = () => CustomTitleExample;
CustomTitle.parameters = {
  docs: {
    source: {
      code: CustomTitleExample_code,
    },
  },
};
