// import devtools from "@vue/devtools";
// if (process.env.NODE_ENV === "development") {
//   // devtools.connect("http://localhost", 6006);
//   devtools.connect();
// }

import Vue from "vue";
Vue.config.devtools = true;
import "@mdi/font/css/materialdesignicons.css";

// import vuetify from "../src/plugins/vuetify";
// import Vuetify, { VApp } from "vuetify";
// import "vuetify/dist/vuetify.min.css";
// import Vuetify from "vuetify/lib";
// import "vuetify/src/stylus/app.styl";

import Vuetify, { VApp } from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.component("v-app", VApp);
Vue.use(Vuetify);

// console.log(vuetify);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  () => ({
    vuetify: new Vuetify(),
    template: "<v-app>OK<story/></v-app>",
  }),
];
