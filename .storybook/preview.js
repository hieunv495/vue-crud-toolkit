// import devtools from "@vue/devtools";
// if (process.env.NODE_ENV === "development") {
//   // devtools.connect("http://localhost", 6006);
//   devtools.connect();
// }

import Vue from "vue";
Vue.config.devtools = true;
import "@mdi/font/css/materialdesignicons.css";

import vuetify from "../src/plugins/vuetify";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  () => ({
    vuetify,
    template: "<v-app><story/></v-app>",
  }),
];
