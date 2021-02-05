import DefaultExample_code from "!!raw-loader!./examples/default.example.vue";
import DefaultExample from "./examples/default.example.vue";

import CustomActionsExample from "./examples/custom-actions.example.vue";
import CustomActionsExample_code from "!!raw-loader!./examples/custom-actions.example.vue";

import DefaultErrorExample from "./examples/default-error.example.vue";
import DefaultErrorExample_code from "!!raw-loader!./examples/default-error.example.vue";

import CustomErrorExample from "./examples/custom-error.example.vue";
import CustomErrorExample_code from "!!raw-loader!./examples/custom-error.example.vue";

import CustomTitleExample from "./examples/custom-title.example.vue";
import CustomTitleExample_code from "!!raw-loader!./examples/custom-title.example.vue";

import CustomHeaderExample from "./examples/custom-header.example.vue";
import CustomHeaderExample_code from "!!raw-loader!./examples/custom-header.example.vue";

import CustomTextExample from "./examples/custom-text.example.vue";
import CustomTextExample_code from "!!raw-loader!./examples/custom-text.example.vue";

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
    card: {
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

// ------------ WITH CARD ------------
export const WithCard = () => DefaultExample;
WithCard.args = {
  card: true,
};
WithCard.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// ------------ CUSTOM TITLE ------------
export const CustomTitle = () => CustomTitleExample;
CustomTitle.parameters = {
  docs: {
    source: {
      code: CustomTitleExample_code,
    },
  },
};

// ------------ CUSTOM ACTIONS ------------
export const CustomActions = () => CustomActionsExample;
CustomActions.parameters = {
  docs: {
    source: {
      code: CustomActionsExample_code,
    },
  },
};

// ------------ CUSTOM HEADER ------------
export const CustomHeader = () => CustomHeaderExample;
CustomHeader.parameters = {
  docs: {
    source: {
      code: CustomHeaderExample_code,
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

// ------------ CUSTOM TEXT ------------
export const CustomText = () => CustomTextExample;
CustomText.parameters = {
  docs: {
    source: {
      code: CustomTextExample_code,
    },
  },
};
