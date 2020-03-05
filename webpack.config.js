const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './lib/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
          ],
        },
        test: /.ts?$/,
        // exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'kit',
    libraryTarget: '',
  }
}