import vuetify from "../../plugins/vuetify";
import { action } from "@storybook/addon-actions";
import SmartWindow from "./index";

export default {
  title: "CRUD/Utils/SmartWindow",
  component: SmartWindow,
  argTypes: {},
};

const actionsData = {
  onClose: action("close"),
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { SmartWindow },
  vuetify: vuetify,
  template: `
  <smart-window v-bind="$props" @close="onClose">
    <v-layout column justify-center align-center>
      <div>
      My content
      </div>
    <v-btn color="success">Submit</v-btn>
    </v-layout>
  </smart-window>
  `,
});

// ------------ DEFAULT ------------
export const Default = Template.bind({});
Default.args = {
  title: "Smart window title",
  card: false,
  cardProps: {
    maxWidth: 600,
  },
};

// ------------ WITH DIALOG ------------
export const WithCard = Template.bind({});
WithCard.args = {
  ...Default.args,
  card: true,
};

// ------------ CUSTOM TITLE ------------
export const CustomTitle = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { SmartWindow },
  vuetify: vuetify,
  template: `
  <smart-window v-bind="$props" @close="onClose">
    <template #title="{title}">
      <v-chip color="success">{{title}}</v-chip>
    </template>
    <h1>
      My content
    </h1>
  </smart-window>
  `,
});
CustomTitle.args = {
  ...Default.args,
};

// ------------ CUSTOM ACTIONS ------------
export const CustomActions = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { SmartWindow },
  vuetify: vuetify,
  template: `
  <smart-window v-bind="$props" @close="onClose">
    <template #actions="{close}">
      <v-btn color="success" @click="close">Save</v-btn>
      <v-btn text color="warning" @click="close">Cancel</v-btn>
    </template>
    <h1>
      My content
    </h1>
  </smart-window>
  `,
});
CustomActions.args = {
  ...Default.args,
};

// ------------ CUSTOM ACTIONS ------------
export const CustomHeader = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { SmartWindow },
  vuetify: vuetify,
  template: `
  <smart-window v-bind="$props" @close="onClose">
    <template #header="{title,close}">
      <div style="background:grey; padding: 16px">
        <h1>{{title}}</h1>  
        <v-btn color="warning" @click="close">Close</v-btn>
      </div>
    </template>
    <h1>
      My content
    </h1>
  </smart-window>
  `,
});
CustomHeader.args = {
  ...Default.args,
};
