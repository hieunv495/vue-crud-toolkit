// const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  // transpileDependencies: ["vuetify"],

  configureWebpack: (config) => {
    config.module.noParse = /^(vue|vue-router|vuex|vuex-router-sync|vuetify|vuetify\/lib)$/;

    console.log(config);
    config.externals = {
      ...config.externals,
      // vue: "vue",
      // vuetify: "vuetify",
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "Vue",
      },
      vuetify: {
        commonjs: "vuetify",
        commonjs2: "vuetify",
        amd: "vuetify",
        root: "Vuetify",
      },
      "vuetify/lib": {
        commonjs: "vuetify/lib",
        commonjs2: "vuetify/lib",
        amd: "vuetify/lib",
        root: "vuetify/lib",
      },
    };
  },
};
