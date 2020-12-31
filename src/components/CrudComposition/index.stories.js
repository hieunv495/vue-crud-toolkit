import DefaultExample_code from "!!raw-loader!./examples/default.vue";
import DefaultExample from "./examples/default.vue";

import CustomExample from "./examples/custom.vue";
import CustomExample_code from "!!raw-loader!./examples/custom.vue";

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

// ------------ DEFAULT ------------
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

// ------------ CUSTOM ------------
export const Custom = () => CustomExample;
Custom.parameters = {
  docs: {
    source: {
      code: CustomExample_code,
    },
  },
};
