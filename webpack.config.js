const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HTMLWebpackPlugin({
          template: './src/index.html',
        }),
    ],
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
          {
            test: /\.css$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
            ],
          },
        ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
        host: 'localhost',
        hot: true,
        port: 8080,
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, 'dist'),
          publicPath: '/',
        },
        proxy: {
          '/api': 'http://localhost:3000',
        },
    },
}