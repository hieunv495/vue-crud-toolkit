import vuetify from "../../plugins/vuetify";
import { action } from "@storybook/addon-actions";
import CrudCreate from "./index";
import PostForm from "./PostForm";
import postsApi from "../../apis/posts.api";
import CrudCreateExampleCode from "!!raw-loader!./index.demo.vue";
import CrudCreateExample from "./index.demo.vue";
import formCode from "!!raw-loader!./PostForm.vue";

export default {
  title: "CRUD/Create",
  component: CrudCreate,
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
  onClose: action("close"),
  onSuccess: (...args) => {
    alert("Create success");
    action("success")(args);
  },
};

const DefaultCode = `
<crud-create
  v-bind="$props"
  @close="onClose"
  @success="onSuccess"
>
  <template #default="{ formBus, beginFormData, sendRequest }">
    <post-form
      :form-bus="formBus"
      :begin-form-data="beginFormData"
      :send-request="sendRequest"
    />
  </template>
</crud-create>
`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: actionsData,
  components: { CrudCreate, PostForm },
  vuetify: vuetify,
  template: DefaultCode,
});

// ------------ DEFAULT ------------
export const Default = Template.bind({});
Default.args = {
  visible: true,
  title: "Create post",
  createApi: postsApi.create,
  getBeginFormData: () => ({
    title: "",
    description: "",
  }),
};

export const Example = () => ({
  components: { CrudCreateExample },
  template: `<crud-create-example />`,
});

Example.parameters = {
  docs: {
    source: {
      code: "// exmaple.vue\n" + CrudCreateExampleCode + "\n" + formCode + ``,
    },
  },
};
