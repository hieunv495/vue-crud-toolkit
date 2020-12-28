import Vue from "vue";
import CrudDashboard from "./index.vue";
import DefaultSearchTextFilter from "./DefaultSearchTextFilter.vue";
import PostsTable from "./PostsTable";
import postsApi from "../../apis/posts.api.js";
import vuetify from "../../plugins/vuetify";
import { action } from "@storybook/addon-actions";

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
  <template #header-filter="{filter, updateFilter}">
    <default-search-text-filter :value="filter.q" @input="updateFilter({q: $event})" />
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
  <template #header-filter="{filter, updateFilter}">
    <default-search-text-filter :value="filter.q" @input="updateFilter({q: $event})" />
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
  <template #header-filter="{filter, updateFilter}">
    <v-text-field 
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
