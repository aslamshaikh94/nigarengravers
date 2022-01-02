const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

const env = dotenv.config().parsed;
const envVars = Object.keys(env).reduce((obj, key) => {
  obj[`process.env.${key}`] = JSON.stringify(env[key]);
  return obj;
}, {});

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[fullhash].js",
    // sourceMapFilename: '[name].js.map',
    publicPath: "/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[fullhash:base64:5]",
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envVars),
    new HtmlWebpackPlugin({
      favicon: "./src/assets/images/favicon.ico",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@store": path.resolve(__dirname, "src/store"),
      "@history": path.resolve(__dirname, "src/history"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@views": path.resolve(__dirname, "src/views"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 8080,
  },
};
