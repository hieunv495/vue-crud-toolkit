import BuildInHeaderFilterExample_code from "!!raw-loader!./examples/build-in-header-filter.example";
import CustomContentExample_code from "!!raw-loader!./examples/custom-content.example";
import CustomFooterPerPageExample_code from "!!raw-loader!./examples/custom-footer-per-page.example";
import CustomFooterPaginationExample_code from "!!raw-loader!./examples/custom-footer-pagination.example";
import CustomFooterStatisticExample_code from "!!raw-loader!./examples/custom-footer-statistic.example";
import CustomFooterExample_code from "!!raw-loader!./examples/custom-footer.example";
import CustomHeaderActionsExample_code from "!!raw-loader!./examples/custom-header-actions.example";
import CustomHeaderFilterExample_code from "!!raw-loader!./examples/custom-header-filter.example";
import CustomHeaderTitleExample_code from "!!raw-loader!./examples/custom-header-title.example";
import CustomTrashModeNavigationExample_code from "!!raw-loader!./examples/custom-trash-mode-navigation.example";
import DefaultExample_code from "!!raw-loader!./examples/default.example";
import NoFilterExample_code from "!!raw-loader!./examples/no-filter.example";
import NoTrashExample_code from "!!raw-loader!./examples/no-trash.example";
import BuildInHeaderFilterExample from "./examples/build-in-header-filter.example";
import CustomContentExample from "./examples/custom-content.example";
import CustomFooterPerPageExample from "./examples/custom-footer-per-page.example";
import CustomFooterPaginationExample from "./examples/custom-footer-pagination.example";
import CustomFooterStatisticExample from "./examples/custom-footer-statistic.example";
import CustomFooterExample from "./examples/custom-footer.example";
import CustomHeaderActionsExample from "./examples/custom-header-actions.example";
import CustomHeaderFilterExample from "./examples/custom-header-filter.example";
import CustomHeaderTitleExample from "./examples/custom-header-title.example";
import CustomTrashModeNavigationExample from "./examples/custom-trash-mode-navigation.example";
import DefaultExample from "./examples/default.example";
import NofilterExample from "./examples/no-filter.example";
import NoTrashExample from "./examples/no-trash.example";
import CrudDashboard from "./index.vue";

import CustomTextExample from "./examples/custom-text.example";
import CustomTextExample_code from "!!raw-loader!./examples/custom-text.example";

import WithRouterExample from "./examples/with-router.example";
import WithRouterExample_code from "!!raw-loader!./examples/with-router.example";

import WithErrorExample from "./examples/with-error.example";
import WithErrorExample_code from "!!raw-loader!./examples/with-error.example";

import CustomErrorExample from "./examples/custom-error.example";
import CustomErrorExample_code from "!!raw-loader!./examples/custom-error.example";

export default {
  title: "CRUD/Dashboard",
  component: CrudDashboard,
  argTypes: {
    bus: {
      control: {
        disable: true,
      },
    },
  },
};

// ----------- DEFAULT ------------
export const Default = () => DefaultExample;
Default.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// ----------- WITH ROUTER ------------
export const WithRouter = () => WithRouterExample;
WithRouter.parameters = {
  docs: {
    source: {
      code: WithRouterExample_code,
    },
  },
};

// ----------- NO TRASH ------------
export const NoTrash = () => NoTrashExample;

NoTrash.parameters = {
  docs: {
    source: {
      code: NoTrashExample_code,
    },
  },
};

// ----------- CUSTOM CONTENT -----------
export const CustomContent = () => CustomContentExample;
CustomContent.parameters = {
  docs: {
    source: {
      code: CustomContentExample_code,
    },
  },
};

// ----------- CUSTOM TITLE -----------
export const CustomHeaderTitle = () => CustomHeaderTitleExample;
CustomHeaderTitle.parameters = {
  docs: {
    source: {
      code: CustomHeaderTitleExample_code,
    },
  },
};

// ----------- NO FILTER -----------

export const NoHeaderFilter = () => NofilterExample;
NoHeaderFilter.parameters = {
  docs: {
    source: {
      code: NoFilterExample_code,
    },
  },
};

// ----------- DEFAULT FILTER -----------
export const BuiltInHeaderFilter = () => BuildInHeaderFilterExample;
BuiltInHeaderFilter.parameters = {
  docs: {
    source: {
      code: BuildInHeaderFilterExample_code,
    },
  },
};

// ----------- CUSTOM HEADER FILTER -----------
export const CustomHeaderFilter = () => CustomHeaderFilterExample;
CustomHeaderFilter.parameters = {
  docs: {
    source: {
      code: CustomHeaderFilterExample_code,
    },
  },
};

// ----------- CUSTOM HEADER ACTIONS -----------
export const CustomHeaderActions = () => CustomHeaderActionsExample;
CustomHeaderActions.parameters = {
  docs: {
    source: {
      code: CustomHeaderActionsExample_code,
    },
  },
};

// ----------- CUSTOM TRASH MODE NAVIGATION -----------
export const CustomTrashModeNavigation = () => CustomTrashModeNavigationExample;
CustomTrashModeNavigation.parameters = {
  docs: {
    source: {
      code: CustomTrashModeNavigationExample_code,
    },
  },
};

// ----------- CUSTOM FOOTER PER PAGE -----------
export const CustomFooterPerPage = () => CustomFooterPerPageExample;
CustomFooterPerPage.parameters = {
  docs: {
    source: {
      code: CustomFooterPerPageExample_code,
    },
  },
};

// ----------- CUSTOM FOOTER STATISTIC -----------
export const CustomFooterStatistic = () => CustomFooterStatisticExample;
CustomFooterStatistic.parameters = {
  docs: {
    source: {
      code: CustomFooterStatisticExample_code,
    },
  },
};

// ----------- CUSTOM FOOTER PAGINATION -----------
export const CustomFooterPagination = () => CustomFooterPaginationExample;
CustomFooterPagination.parameters = {
  docs: {
    source: {
      code: CustomFooterPaginationExample_code,
    },
  },
};

// ----------- CUSTOM FOOTER -----------
export const CustomFooter = () => CustomFooterExample;
CustomFooter.parameters = {
  docs: {
    source: {
      code: CustomFooterExample_code,
    },
  },
};

// ----------- CUSTOM TEXT ------------
export const CustomText = () => CustomTextExample;
CustomText.parameters = {
  docs: {
    source: {
      code: CustomTextExample_code,
    },
  },
};

// ----------- WITH ERROR ------------
export const WithError = () => WithErrorExample;
WithError.parameters = {
  docs: {
    source: {
      code: WithErrorExample_code,
    },
  },
};

// ----------- CUSTOM ERROR ------------
export const CustomError = () => CustomErrorExample;
CustomError.parameters = {
  docs: {
    source: {
      code: CustomErrorExample_code,
    },
  },
};
