import vuetify from "../../plugins/vuetify";
import { action } from "@storybook/addon-actions";
import DefaultSearchTextFilter from "./DefaultSearchTextFilter";

export default {
  title: "CRUD/Utils/DefaultSearchTextFilter",
  component: DefaultSearchTextFilter,
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
  onInput: action("input"),
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { DefaultSearchTextFilter },
  vuetify: vuetify,
  template: `
  <default-search-text-filter v-bind="$props" @input="onInput($event)" />
  `,
});

// ------------ DEFAULT ------------
export const Default = Template.bind({});
Default.args = {
  value: "",
};

// ------------ LOADING ------------
export const Loading = Template.bind({});
Loading.args = {
  value: "",
  loading: true,
};
