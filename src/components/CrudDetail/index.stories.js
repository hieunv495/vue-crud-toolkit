import CrudDetail from "./index.vue";
import postsApi from "../../apis/posts.api.js";
import { action } from "@storybook/addon-actions";
import vuetify from "../../plugins/vuetify";
import CrudDetailExample from "./index.demo";

export default {
  title: "CRUD/Detail",
  component: CrudDetail,
  // decorators: [
  //   () => ({
  //     template:
  //       '<div style="max-height: 400px;overflow: auto"><story/></story></div>',
  //   }),
  // ],
  argTypes: {
    id: {
      description: "Id of item",
      control: {
        type: "select",
        options: [null, "0", "1", "2"],
      },
    },
    getOneApi: {
      description:
        "This is function that fetch item data by `id`, it can be async when return a `Promise`",
    },
    getErrorMessage: {
      description: "Function get error message when `getOneApi` throw an error",
    },
    dialog: {},
  },
};

const actionsData = {
  onClose: action("close"),
};

const DefaultCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: actionsData,
  components: { CrudDetail },
  vuetify: vuetify,
  template: DefaultCode,
});

// DEFAULT

export const Default = Template.bind({});
Default.args = {
  id: "1",
  title: "Post detail",
  getOneApi: postsApi.getOne,
};

Default.parameters = {
  docs: {
    source: {
      code: DefaultCode,
    },
  },
};

// DEFAULT LOADING

export const DefaultLoading = Template.bind({});
DefaultLoading.args = {
  id: "1",
  title: "Post detail",
  getOneApi: () => new Promise(() => {}),
};

DefaultLoading.parameters = {
  docs: {
    source: {
      code: DefaultCode,
    },
  },
};

// CUSTOM LOADING

const CustomLoadingCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #loading>
    <v-layout justify-center align-center>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-layout>
  </template>
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const CustomLoadingTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: actionsData,
  components: { CrudDetail },
  vuetify: vuetify,
  template: CustomLoadingCode,
});

// CUSTOM LOADING

export const CustomLoading = CustomLoadingTemplate.bind({});
CustomLoading.args = {
  id: "1",
  title: "Post detail",
  getOneApi: () => new Promise(() => {}),
};
CustomLoading.parameters = {
  docs: {
    source: {
      code: CustomLoadingCode,
    },
  },
};

// ERROR

export const DefaultError = Template.bind({});
DefaultError.args = {
  id: "nothing",
  title: "Error",
  getOneApi: postsApi.getOne,
};

DefaultError.parameters = {
  docs: {
    source: {
      code: DefaultCode,
    },
  },
};

// CUSTOM ERROR

const CustomErrorCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #error="{error, errorMessage}">
    <div>
      Error is: '{{errorMessage}}'
    </div>
  </template>
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const CustomErrorTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: actionsData,
  components: { CrudDetail },
  vuetify: vuetify,
  template: CustomErrorCode,
});

export const CustomError = CustomErrorTemplate.bind({});
CustomError.args = {
  id: "nothing",
  title: "Error",
  getOneApi: postsApi.getOne,
};

CustomError.parameters = {
  docs: {
    source: {
      code: CustomErrorCode,
    },
  },
};

// EMPTY

export const DefaultEmpty = Template.bind({});
DefaultEmpty.args = {
  id: "0",
  title: "Default empty",
  getOneApi: () => null,
};

DefaultEmpty.parameters = {
  docs: {
    source: {
      code: DefaultCode,
    },
  },
};

// CUSTOM EMPTY

const CustomEmptyCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #empty>
    <div style="color: orange">
      Nothing
    </div>
  </template>
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const CustomEmptyTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: actionsData,
  components: { CrudDetail },
  vuetify: vuetify,
  template: CustomEmptyCode,
});

export const CustomEmpty = CustomEmptyTemplate.bind({});
CustomEmpty.args = {
  id: "0",
  title: "Default empty",
  getOneApi: () => null,
};

CustomEmpty.parameters = {
  docs: {
    source: {
      code: CustomEmptyCode,
    },
  },
};

// WITH DIALOG

export const WithDialog = Template.bind({});
WithDialog.args = {
  id: "1",
  title: "Post detail with dialog",
  getOneApi: postsApi.getOne,
  dialog: true,
};

// CUSTOM ACTIONS

const CustomActionsCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #actions>
    <v-layout justify-center>
      <v-btn color="success" class="mr-2" @click="onClose"> Close </v-btn>
      <v-btn color="success" class="mr-2" @click="onUpdate"> Update </v-btn>
      <v-btn color="warning" @click="onRemove"> Delete </v-btn>
    </v-layout>
  </template>
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const CustomActionsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: {
    ...actionsData,
    onUpdate: action("update"),
    onRemove: action("remove"),
  },
  components: { CrudDetail },
  vuetify: vuetify,
  template: CustomActionsCode,
});

export const CustomActions = CustomActionsTemplate.bind({});
CustomActions.args = {
  id: "0",
  title: "Detail with custom actions",
  getOneApi: postsApi.getOne,
};

CustomActions.parameters = {
  docs: {
    source: {
      code: CustomActionsCode,
    },
  },
};

export const CustomActionsWithDialog = CustomActionsTemplate.bind({});
CustomActionsWithDialog.args = {
  id: "1",
  title: "Custom action with dialog",
  getOneApi: postsApi.getOne,
  dialog: true,
};

CustomActionsWithDialog.parameters = {
  docs: {
    source: {
      code: CustomActionsCode,
    },
  },
};

// CUSTOM HEADER

const CustomHeaderTemplateCode = `
<crud-detail v-bind="$props" @close="onClose">
  <template #header>
    <div style="background-color: grey; padding: 8px; color: white">
      Custom header
    </div>
  </template>
  <template #default="{ data }">
  <v-text-field :value="data.title" label="Title" disabled />
  <v-textarea :value="data.description" label="Description" disabled />
  </template> 
</crud-detail>
`;

const CustomHeaderTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: {
    ...actionsData,
    onUpdate: action("update"),
    onRemove: action("remove"),
  },
  components: { CrudDetail },
  vuetify: vuetify,
  template: CustomHeaderTemplateCode,
});

export const CustomHeader = CustomHeaderTemplate.bind({});
CustomHeader.args = {
  id: "1",
  title: "CustomHeader",
  getOneApi: postsApi.getOne,
};

CustomHeader.parameters = {
  docs: {
    source: {
      code: CustomHeaderTemplateCode,
    },
  },
};

export const CustomHeaderWithDialog = CustomHeaderTemplate.bind({});
CustomHeaderWithDialog.args = {
  id: "1",
  title: "CustomHeader",
  getOneApi: postsApi.getOne,
  dialog: true,
};

CustomHeaderWithDialog.parameters = {
  docs: {
    source: {
      code: CustomHeaderTemplateCode,
    },
  },
};

// EXAMPLE

const ExampleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  methods: actionsData,
  components: { CrudDetailExample },
  vuetify: vuetify,
  template: '<crud-detail-example v-bind="$props" @close="onClose" />',
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  dialog: false,
};

Example.argTypes = {
  id: { control: { disable: true } },
};

Example.parameters = {
  docs: {
    source: {
      code: `
  <template>
    <div>
      <v-layout v-if="!id" justify-center align-center style="height: 300px">
        <v-btn color="success" @click="id = '1'">Open detail</v-btn>
      </v-layout>
  
      <crud-detail
        :id="id"
        :get-one-api="getOneApi"
        :dialog="dialog"
        :title="title"
        :dialog-props="{
          maxWidth: dialogMaxWidth,
          persistent: dialogPersistent,
        }"
        @close="id = null"
      >
        <template #actions>
          <v-layout justify-center>
            <v-btn color="success" class="mr-2" @click="id = null"> Close </v-btn>
            <v-btn color="success" class="mr-2" @click="update"> Update </v-btn>
            <v-btn color="warning" @click="remove"> Delete </v-btn>
          </v-layout>
        </template>
  
        <template #default="{ data }">
          <v-text-field :value="data.title" label="Title" disabled />
          <v-textarea :value="data.description" label="Description" disabled />
        </template>
      </crud-detail>
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  import CrudDetail from "./index";
  import postsApi from "../../apis/posts.api";
  
  export default Vue.extend({
    name: "crud-detail-example",
    components: { CrudDetail },
  
    props: {
  
    },
  
    data() {
      return {
        id: null,
        title: "Detail information",
        dialog: false,
        dialogMaxWidth: 600,
        dialogPersistent: false,
      };
    },
  
    methods: {
      getOneApi: postsApi.getOne,
  
      update() {
        alert("Update");
      },
      remove() {
        alert("Remove");
      },
    },
  });
  </script>
  
  <style>
  </style>`,
    },
  },
};
