module.exports = {
  mode:'development',
  entry: './entry.jsx',
  output: {
    path: __dirname,
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      }
    ]
  },
  devServer: {
    open:true
  }
};