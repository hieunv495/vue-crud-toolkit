import { action } from "@storybook/addon-actions";
import Vue from "vue";
import postsApi from "../../apis/posts.api.js";
import vuetify from "../../plugins/vuetify";
import DefaultSearchTextFilter from "./DefaultSearchTextFilter.vue";
import CrudDashboard from "./index.vue";
import PostsTable from "./PostsTable";

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

// ----------- DEFAULT ------------

export const NoTrash = Template.bind({});
NoTrash.args = {
  ...Default.args,
  hasTrash: false,
};

NoTrash.parameters = {
  docs: {
    source: {
      code: DefaultCode,
    },
  },
};

// ----------- CUSTOM CONTENT -----------

const CustomContentCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <ul>
      <li v-for="item in items" :key="item.id">
        <v-chip v-if="trashMode" color="warning">Delected</v-chip>
         {{item.title}}
      </li>
    </ul>
  </template>
</crud-dashboard>
`;

const CustomContentTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomContentCode,
});

export const CustomContent = CustomContentTemplate.bind({});
CustomContent.args = {
  ...Default.args,
};

CustomContent.parameters = {
  docs: {
    source: {
      code: CustomContentCode,
    },
  },
};

// ----------- CUSTOM TITLE -----------

const CustomTitleCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #header-title="{title}">
    <v-alert type="success">Custom: {{title}}</v-alert>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomHeaderTitleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomTitleCode,
});

export const CustomHeaderTitle = CustomHeaderTitleTemplate.bind({});
CustomHeaderTitle.args = {
  ...Default.args,
};

CustomHeaderTitle.parameters = {
  docs: {
    source: {
      code: CustomTitleCode,
    },
  },
};

// ----------- NO FILTER -----------

const NoHeaderFilterCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const NoFilterTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable },
  vuetify: vuetify,
  template: NoHeaderFilterCode,
});

export const NoHeaderFilter = NoFilterTemplate.bind({});
NoHeaderFilter.args = {
  ...Default.args,
};

NoHeaderFilter.parameters = {
  docs: {
    source: {
      code: NoHeaderFilterCode,
    },
  },
};

// ----------- DEFAULT FILTER -----------
export const BuiltInHeaderFilter = Default;

// ----------- CUSTOM FILTER -----------

const CustomFilterCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #header-filter="{loading, filter, updateFilter}">
    <v-text-field 
      :loading="loading"
      :value="filter.q" 
      @input="updateFilter({q: $event})" 
      label="Search"
      placeholder="Input text" 
    />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomHeaderFilterTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomFilterCode,
});

export const CustomHeaderFilter = CustomHeaderFilterTemplate.bind({});
CustomHeaderFilter.args = {
  ...Default.args,
};

CustomHeaderFilter.parameters = {
  docs: {
    source: {
      code: CustomFilterCode,
    },
  },
};

// ----------- CUSTOM HEADER ACTIONS -----------

const CustomHeaderActionsCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #header-actions="{trashMode, clickCreate, clickEmptyTrash}">
    <template v-if="!trashMode">
      <v-btn color="info" @click="clickCreate">Custom New item button</v-btn>
      <v-btn color="warning">Some button</v-btn>
    </template>
    <v-btn v-else color="warning" @click="clickEmptyTrash">Remove all trash items</v-btn>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomHeaderActionsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomHeaderActionsCode,
});

export const CustomHeaderActions = CustomHeaderActionsTemplate.bind({});
CustomHeaderActions.args = {
  ...Default.args,
};

CustomHeaderActions.parameters = {
  docs: {
    source: {
      code: CustomHeaderActionsCode,
    },
  },
};

// ----------- CUSTOM TRASH MODE NAVIGATION -----------

const CustomTrashModeNavigationCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #trash-mode-navigation="{trashMode, updateTrashMode, normalTotal, trashTotal}">
    <v-btn 
      :color="!trashMode?'success':'default'" 
      @click="updateTrashMode(false)"
    >
      Normal
      ({{normalTotal}} items)
    </v-btn>
    <v-btn 
      :color="trashMode?'success':'default'" 
      @click="updateTrashMode(true)"
    >
      Trash
      ({{trashTotal}} items)
    </v-btn>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomTrashModeNavigationTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomTrashModeNavigationCode,
});

export const CustomTrashModeNavigation = CustomTrashModeNavigationTemplate.bind(
  {}
);
CustomTrashModeNavigation.args = {
  ...Default.args,
};

CustomTrashModeNavigation.parameters = {
  docs: {
    source: {
      code: CustomTrashModeNavigationCode,
    },
  },
};

// ----------- CUSTOM FOOTER LIMIT -----------

const CustomFooterLimitCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #footer-limit="{limit, updateLimit}">
    <v-layout align-center>
      <flex class="mr-2">
        <v-chip color="success">Rows per page:</v-chip>
      </flex>
      <v-flex>
        <v-select
          :items="[5, 10, 20, 50, 100]"
          :value="limit"
          dense
          hide-details
          outlined
          style="width: 100px; font-size: 14px"
          @input="updateLimit"
        />
      </v-flex>
    </v-layout>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomFooterLimitTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomFooterLimitCode,
});

export const CustomFooterLimit = CustomFooterLimitTemplate.bind({});
CustomFooterLimit.args = {
  ...Default.args,
};

CustomFooterLimit.parameters = {
  docs: {
    source: {
      code: CustomFooterLimitCode,
    },
  },
};

// ----------- CUSTOM FOOTER STATISTIC -----------

const CustomFooterStatisticCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #footer-statistic="{page, total}">
    Current page: {{page}} | Total items: {{total}}  
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomFooterStatisticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomFooterStatisticCode,
});

export const CustomFooterStatistic = CustomFooterStatisticTemplate.bind({});
CustomFooterStatistic.args = {
  ...Default.args,
};

CustomFooterStatistic.parameters = {
  docs: {
    source: {
      code: CustomFooterStatisticCode,
    },
  },
};

// ----------- CUSTOM FOOTER PAGINATION -----------

const CustomFooterPaginationCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #footer-pagination="{page, limit, total, updatePage}">
    <v-container>
      <v-row justify="center">
        <v-container style="max-width: 400px">
          <v-pagination
            :value="page"
            :length="Math.ceil(total / limit) || 1"
            circle
            @input="updatePage"
          />
        </v-container>
      </v-row>
    </v-container>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomFooterPaginationTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomFooterPaginationCode,
});

export const CustomFooterPagination = CustomFooterPaginationTemplate.bind({});
CustomFooterPagination.args = {
  ...Default.args,
};

CustomFooterPagination.parameters = {
  docs: {
    source: {
      code: CustomFooterPaginationCode,
    },
  },
};

// ----------- CUSTOM FOOTER -----------

const CustomFooterCode = `
<crud-dashboard
  v-bind="$props"
  @click-create="onClickCreate"
  @click-empty-trash="onClickEmptyTrash"
>
  <template #footer="{page, limit, total, updatePage, updateLimit}">
      <v-layout justify-center align-center style="background-color: grey">
        <v-flex shrink>
          <v-text-field 
            :value="page" 
            type="number" 
            @input="updatePage(parseInt($event))" 
            label="Page" 
          />
        </v-flex>  
        <v-flex shrink>
          <v-text-field 
            :value="limit" 
            type="number" 
            @input="updateLimit(parseInt($event))" 
            label="Limit" 
          />
        </v-flex>
        <v-flex shrink>
          Total: {{total}}
        </v-flex>
      </v-layout>
  </template>
  <template #header-filter="{loading, filter, updateFilter}">
    <default-search-text-filter :loading="loading" :value="filter.q" @input="updateFilter({q: $event})" />
  </template>
  <template #default="{ items, trashMode }">
    <posts-table :items="items" :trash-mode="trashMode" />
  </template>
</crud-dashboard>
`;

const CustomFooterTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDashboard, PostsTable, DefaultSearchTextFilter },
  vuetify: vuetify,
  template: CustomFooterCode,
});

export const CustomFooter = CustomFooterTemplate.bind({});
CustomFooter.args = {
  ...Default.args,
};

CustomFooter.parameters = {
  docs: {
    source: {
      code: CustomFooterCode,
    },
  },
};
