module.exports = {
  mode: 'production',
  entry: {
    provider:  './src/components/provider.js',
    requester: './src/components/requester.js',
  },
  output: {
    path: `${__dirname}/../public`,
    filename: '[name].js',
  }
}
