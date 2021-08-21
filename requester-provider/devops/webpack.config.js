const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    provider:  './src/components/provider.js',
    requester: './src/components/requester.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js'
    }
  },
  output: {
    path: `${__dirname}/../public`,
    filename: '[name].js',
  }
}
