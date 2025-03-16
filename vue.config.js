const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue: path.resolve('./node_modules/vue'),
        'vue-router': path.resolve('./node_modules/vue-router'),
        pinia: path.resolve('./node_modules/pinia'),
        pages: process.env.NODE_ENV === 'development' ? path.resolve('../') : 'pages',
      },
    },
  },
})
