import CrudComposition from "./components/CrudComposition/index.vue";
import CrudDashboard from "./components/CrudDashboard/index.vue";
import CrudDetail from "./components/CrudDetail/index.vue";
import CrudCreate from "./components/CrudCreate/index.vue";
import CrudUpdate from "./components/CrudUpdate/index.vue";
import CrudConfirmDialog from "./components/CrudConfirmDialog/index.vue";
import SuccessSnackbar from "./components/snackbar/SuccessSnackbar";
import ErrorSnackbar from "./components/snackbar/ErrorSnackbar";
import DefaultSearchTextFilter from "./components/CrudDashboard/DefaultSearchTextFilter";
import CrudFormMixin from "./mixins/CrudFormMixin";

const components = {
  "crud-composition": CrudComposition,
  "crud-dashboard": CrudDashboard,
  "crud-detail": CrudDetail,
  "crud-create": CrudCreate,
  "crud-update": CrudUpdate,
  "crud-confirm-dialog": CrudConfirmDialog,
  "success-snackbar": SuccessSnackbar,
  "error-snackbar": ErrorSnackbar,
  "default-search-text-filter": DefaultSearchTextFilter,
};

export {
  CrudComposition,
  CrudDashboard,
  CrudDetail,
  CrudCreate,
  CrudUpdate,
  CrudConfirmDialog,
  SuccessSnackbar,
  ErrorSnackbar,
  DefaultSearchTextFilter,
  CrudFormMixin,
};

const ComponentLibrary = {
  install(Vue) {
    // components
    for (const componentName in components) {
      Vue.component(componentName, components[componentName]);
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
