const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode:'development',
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    open:true
  }
};