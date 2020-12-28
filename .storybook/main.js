const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  webpackFinal: async (config, { configType }, defaultConfig) => {
    // Use Sass loader for vuetify components
    // config.module.rules.push({
    //   test: /\.s(a|c)ss$/,
    //   use: ["style-loader", "css-loader", "sass-loader"],
    //   include: path.resolve(__dirname, "../"),
    // });

    // config.module.rules.push({
    //   resolve: {
    //     alias: {
    //       "@": path.resolve(__dirname, "../src"),
    //       vue: "vue/dist/vue.js",
    //       vue$: "vue/dist/vue.esm.sjs",
    //     },
    //   },
    // });

    config.module.rules.push({
      test: /\.s(c|a)ss$/,
      use: [
        "vue-style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          // Requires sass-loader@^7.0.0
          // options: {
          //   implementation: require("sass"),
          //   indentedSyntax: true, // optional
          // },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require("sass"),
            sassOptions: {
              indentedSyntax: true, // optional
            },
          },
        },
      ],
    });

    // config.plugins.push(new VueLoaderPlugin());

    // Return the altered config
    return config;
  },
};
