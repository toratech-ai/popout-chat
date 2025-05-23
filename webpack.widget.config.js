const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.min.js',
    library: 'MyPopoutWidget',
    libraryTarget: 'window',
    libraryExport: 'default',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'widget.css'
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify('1.0.0'),
      'process.env.BUILD_DATE': JSON.stringify(new Date().toISOString())
    }),
    new webpack.BannerPlugin({
      banner: `
MyPopoutWidget
Version: 1.0.0
Build: ${new Date().toISOString()}
License: MIT
Docs: https://docs.toratech.com/popout-widget
      `.trim(),
      entryOnly: true
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Keep console.error for debugging
            drop_debugger: true,
            pure_funcs: ['console.log'] // Remove only console.log
          },
          mangle: {
            reserved: ['MyPopoutWidget', 'ToRaTechChat', 'ChatWidgetConfig']
          },
          output: {
            comments: false,
            // Add banner with version and license
            preamble: '/*! ToRaTech Pop-out Chat Widget v1.0.0 | (c) 2025 ToRaTech | MIT License */'
          }
        }
      })
    ]
  },
  // Generate source maps for debugging (optional)
  devtool: 'source-map'
};
