// import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import CrudComposition from "./components/CrudComposition/index.vue";
import CrudDashboard from "./components/CrudDashboard/index.vue";
import CrudDetail from "./components/CrudDetail/index.vue";
import CrudCreate from "./components/CrudCreate/index.vue";
import CrudUpdate from "./components/CrudUpdate/index.vue";
import CrudConfirmDialog from "./components/CrudConfirmDialog/index.vue";
import SuccessSnackbar from "./components/snackbar/SuccessSnackbar";
import ErrorSnackbar from "./components/snackbar/ErrorSnackbar";
import DefaultSearchTextFilter from "./components/CrudDashboard/DefaultSearchTextFilter";
// import vuetify from "./plugins/vuetify";
// import "./plugins/vuetify";
//
// import App from "./App";

const components = {
  HelloWorld,
  CrudComposition,
  CrudDashboard,
  CrudDetail,
  CrudCreate,
  CrudUpdate,
  CrudConfirmDialog,
  SuccessSnackbar,
  ErrorSnackbar,
  DefaultSearchTextFilter,
};

export {
  HelloWorld,
  CrudComposition,
  CrudDashboard,
  CrudDetail,
  CrudCreate,
  CrudUpdate,
  CrudConfirmDialog,
  SuccessSnackbar,
  ErrorSnackbar,
  DefaultSearchTextFilter,
};

const ComponentLibrary = {
  install(Vue) {
    // components
    for (const componentName in components) {
      const component = components[componentName];

      Vue.component(component.name, component);
    }
  },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ComponentLibrary);
}

// new Vue({
//   vuetify, //<-----
//   render: (h) => h(App),
// }).$mount("#app");
