import DefaultExample from "./examples/default.example.vue";
import DefaultExample_code from "!!raw-loader!./examples/default.example.vue";

import CustomTitleExample from "./examples/custom-title.example.vue";
import CustomTitleExample_code from "!!raw-loader!./examples/custom-title.example.vue";

import CustomActionsExample from "./examples/custom-actions.example.vue";
import CustomActionsExample_code from "!!raw-loader!./examples/custom-actions.example.vue";

import CustomHeaderExample from "./examples/custom-header.example.vue";
import CustomHeaderExample_code from "!!raw-loader!./examples/custom-header.example.vue";

import DefaultFetchErrorExample from "./examples/default-fetch-error.example.vue";
import DefaultFetchErrorExample_code from "!!raw-loader!./examples/default-fetch-error.example.vue";

import CustomFetchErrorExample from "./examples/custom-fetch-error.example.vue";
import CustomFetchErrorExample_code from "!!raw-loader!./examples/custom-fetch-error.example.vue";

import DefaultUpdateErrorExample from "./examples/default-update-error.example.vue";
import DefaultUpdateErrorExample_code from "!!raw-loader!./examples/default-update-error.example.vue";

import CustomUpdateErrorExample from "./examples/custom-update-error.example.vue";
import CustomUpdateErrorExample_code from "!!raw-loader!./examples/custom-update-error.example.vue";

import CustomTextExample from "./examples/custom-text.example.vue";
import CustomTextExample_code from "!!raw-loader!./examples/custom-text.example.vue";

import CrudUpdate from "./index";

export default {
  title: "CRUD/Update",
  component: CrudUpdate,

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

// ------------ CUSTOM ACTIONS ------------
export const CustomHeader = () => CustomHeaderExample;
CustomHeader.parameters = {
  docs: {
    source: {
      code: CustomHeaderExample_code,
    },
  },
};

// ------------ DEFAULT FETCH ERROR ------------
export const DefaultFetchError = () => DefaultFetchErrorExample;
DefaultFetchError.parameters = {
  docs: {
    source: {
      code: DefaultFetchErrorExample_code,
    },
  },
};

// ------------ CUSTOM FETCH ERROR ------------
export const CustomFetchError = () => CustomFetchErrorExample;
CustomFetchError.parameters = {
  docs: {
    source: {
      code: CustomFetchErrorExample_code,
    },
  },
};

// ------------ DEFAULT UPDATE ERROR ------------
export const DefaultUpdateError = () => DefaultUpdateErrorExample;
DefaultUpdateError.parameters = {
  docs: {
    source: {
      code: DefaultUpdateErrorExample_code,
    },
  },
};

// ------------ CUSTOM UPDATE ERROR ------------
export const CustomUpdateError = () => CustomUpdateErrorExample;
CustomUpdateError.parameters = {
  docs: {
    source: {
      code: CustomUpdateErrorExample_code,
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
