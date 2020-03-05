const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './lib/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: () => {
          return [
            {
              loader: ['ts-loader'],
              options: {
                configFile: path.resolve(__dirname, './tsconfig.json')
              }
            },
          ];
        },
      },
      {
        test: /\.js$/,
        exclude: /test/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'min'),
    library: 'kit',
    libraryTarget: 'umd',
  }
}