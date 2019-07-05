const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: () => {
          return [
            {
              loader: ['ts-loader'],
            },
          ];
        },
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib')
  }
}