import BuildInHeaderFilterExample_code from "!!raw-loader!./examples/CrudDashboard.build-in-header-filter.example";
import CustomContentExample_code from "!!raw-loader!./examples/CrudDashboard.custom-content.example";
import CustomFooterLimitExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-limit.example";
import CustomFooterPaginationExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-pagination.example";
import CustomFooterStatisticExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-statistic.example";
import CustomFooterExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer.example";
import CustomHeaderActionsExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-actions.example";
import CustomHeaderFilterExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-filter.example";
import CustomHeaderTitleExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-title.example";
import CustomTrashModeNavigationExample_code from "!!raw-loader!./examples/CrudDashboard.custom-trash-mode-navigation.example";
import DefaultExample_code from "!!raw-loader!./examples/CrudDashboard.default.example";
import NoFilterExample_code from "!!raw-loader!./examples/CrudDashboard.no-filter.example";
import NoTrashExample_code from "!!raw-loader!./examples/CrudDashboard.no-trash.example";
import BuildInHeaderFilterExample from "./examples/CrudDashboard.build-in-header-filter.example";
import CustomContentExample from "./examples/CrudDashboard.custom-content.example";
import CustomFooterLimitExample from "./examples/CrudDashboard.custom-footer-limit.example";
import CustomFooterPaginationExample from "./examples/CrudDashboard.custom-footer-pagination.example";
import CustomFooterStatisticExample from "./examples/CrudDashboard.custom-footer-statistic.example";
import CustomFooterExample from "./examples/CrudDashboard.custom-footer.example";
import CustomHeaderActionsExample from "./examples/CrudDashboard.custom-header-actions.example";
import CustomHeaderFilterExample from "./examples/CrudDashboard.custom-header-filter.example";
import CustomHeaderTitleExample from "./examples/CrudDashboard.custom-header-title.example";
import CustomTrashModeNavigationExample from "./examples/CrudDashboard.custom-trash-mode-navigation.example";
import DefaultExample from "./examples/CrudDashboard.default.example";
import NofilterExample from "./examples/CrudDashboard.no-filter.example";
import NoTrashExample from "./examples/CrudDashboard.no-trash.example";
import CrudDashboard from "./index.vue";

import WithRouterExample from "./examples/CrudDashboard.with-router.example";
import WithRouterExample_code from "!!raw-loader!./examples/CrudDashboard.with-router.example";

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

// ----------- CUSTOM FOOTER LIMIT -----------
export const CustomFooterLimit = () => CustomFooterLimitExample;
CustomFooterLimit.parameters = {
  docs: {
    source: {
      code: CustomFooterLimitExample_code,
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
