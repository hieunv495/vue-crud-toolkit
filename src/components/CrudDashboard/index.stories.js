import { action } from "@storybook/addon-actions";
import Vue from "vue";
import postsApi from "../../apis/posts.api.js";
import vuetify from "../../plugins/vuetify";
import DefaultSearchTextFilter from "./DefaultSearchTextFilter.vue";
import CrudDashboard from "./index.vue";
import PostsTable from "./PostsTable";

import DefaultExample from "./examples/CrudDashboard.default.example";
import DefaultExample_code from "!!raw-loader!./examples/CrudDashboard.default.example";

import NoTrashExample from "./examples/CrudDashboard.no-trash.example";
import NoTrashExample_code from "!!raw-loader!./examples/CrudDashboard.no-trash.example";

import CustomContentExample from "./examples/CrudDashboard.custom-content.example";
import CustomContentExample_code from "!!raw-loader!./examples/CrudDashboard.custom-content.example";

import CustomHeaderTitleExample from "./examples/CrudDashboard.custom-header-title.example";
import CustomHeaderTitleExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-title.example";

import NofilterExample from "./examples/CrudDashboard.no-filter.example";
import NoFilterExample_code from "!!raw-loader!./examples/CrudDashboard.no-filter.example";

import BuildInHeaderFilterExample from "./examples/CrudDashboard.build-in-header-filter.example";
import BuildInHeaderFilterExample_code from "!!raw-loader!./examples/CrudDashboard.build-in-header-filter.example";

import CustomHeaderActionsExample from "./examples/CrudDashboard.custom-header-actions.example";
import CustomHeaderActionsExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-actions.example";

import CustomHeaderFilterExample from "./examples/CrudDashboard.custom-header-filter.example";
import CustomHeaderFilterExample_code from "!!raw-loader!./examples/CrudDashboard.custom-header-filter.example";

import CustomTrashModeNavigationExample from "./examples/CrudDashboard.custom-trash-mode-navigation.example";
import CustomTrashModeNavigationExample_code from "!!raw-loader!./examples/CrudDashboard.custom-trash-mode-navigation.example";

import CustomFooterLimitExample from "./examples/CrudDashboard.custom-footer-limit.example";
import CustomFooterLimitExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-limit.example";

import CustomFooterStatisticExample from "./examples/CrudDashboard.custom-footer-statistic.example";
import CustomFooterStatisticExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-statistic.example";

import CustomFooterPaginationExample from "./examples/CrudDashboard.custom-footer-pagination.example";
import CustomFooterPaginationExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer-pagination.example";

import CustomFooterExample from "./examples/CrudDashboard.custom-footer.example";
import CustomFooterExample_code from "!!raw-loader!./examples/CrudDashboard.custom-footer.example";

export default {
  title: "CRUD/Dashboard",
  component: CrudDashboard,
  // decorators: [
  //   () => ({
  //     template:
  //       '<div style="max-height: 400px;overflow: auto"><story/></story></div>',
  //   }),
  // ],
  argTypes: {
    bus: {
      control: {
        disable: true,
      },
    },
  },
};

const actionsData = {
  onClickCreate: action("click-create"),
  onClickEmptyTrash: action("empty-trash"),
};

const DefaultCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: DefaultCode,
});

export const Default1 = () => DefaultExample;

Default1.parameters = {
  docs: {
    source: {
      code: DefaultExample_code,
    },
  },
};

// export const Default1 =  (args, { argTypes }) => ({
//   components: { CrudCreateDefaultExample },
//   vuetify: vuetify,
//   template: `<crud-create-default-example />`,
// });

// DEFAULT

export const Default = Template.bind({});
Default.args = {
  bus: new Vue(),
  title: "Post manager",
  defaultFilter: { q: "" },
  defaultLimit: 5,
  defaultPage: 1,
  getListApi: postsApi.getList,
  getTrashListApi: postsApi.getTrashList,
  normalCountApi: postsApi.normalCount,
  trashCountApi: postsApi.trashCount,
  hasTrash: true,
};

Default.parameters = {
  docs: {
    source: {
      code: DefaultCode,
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
