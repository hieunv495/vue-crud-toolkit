import CrudDetail from "./index.vue";
import postsApi from "../../apis/posts.api.js";
import { action } from "@storybook/addon-actions";
// import vuetify from "../../plugins/vuetify";
// import Vuetify from "vuetify";

export default {
  title: "CRUD/CrudDetail",
  component: CrudDetail,
  argTypes: {
    id: {
      description: "Id of item",
    },
    getOneApi: {
      description:
        "This is function that fetch item data by `id`, it can be async when return a `Promise`",
    },
    getErrorMessage: {
      description: "Function get error message when `getOneApi` throw an error",
    },
  },
};

const actionsData = {
  onClose: action("pin-task"),
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudDetail },
  // vuetify: new Vuetify( ),
  template: '<crud-detail v-bind="$props" @close="onClose" />',
});

export const Default = Template.bind({});
Default.args = {
  id: "1",
  title: "Post detail",
  getOneApi: postsApi.getOne,
};

export const WithDialog = Template.bind({});
WithDialog.args = {
  id: "1",
  title: "Post detail with dialog",
  getOneApi: postsApi.getOne,
  dialog: true,
};
