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
  options: {
    storySort: {
      order: [
        "CRUD",
        ["Introduction", "Dashboard", "Detail", "Utils"],
        "Example",
      ],
    },
  },
};

export const decorators = [
  () => ({
    vuetify,
    template: "<v-app><story/></v-app>",
  }),
];

// Auto show code in docs
window.addEventListener("load", () => {
  let loc = window.location.href;
  showCodeSamples();

  window.setInterval(() => {
    let newLoc = window.location.href;

    if (newLoc !== loc) {
      loc = newLoc;
      showCodeSamples();
    }
  }, 300);
});

function showCodeSamples() {
  try {
    const docs = document.querySelectorAll(".sbdocs");

    [].forEach.call(docs, (el) => {
      const buttons = el.querySelectorAll("button");
      const codeButton = [].find.call(
        buttons,
        (el) => el.textContent === "Show code"
      );
      if (codeButton) {
        codeButton.click();
      }
    });
  } catch (e) {
    console.warn(e);
  }
}
