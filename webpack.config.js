const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const util = {
  env: require("dotenv").config(),
  environment: process.env.ENVIRONMENT || "development",
  blockchain: process.env.BLOCKCHAIN || "testnet",
};

module.exports = {
  mode: util.environment === "development" ? "development" : "production",
  entry: "./src/cinematic-tester/index.ts",
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Train of the Century",
      template: "./src/cinematic-tester/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./static",
          to: "./",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf|wav|mp3|ogg|mp4)$/,
        loader: "file-loader",
        exclude: /node_modules/,
        options: {
          name: "[path][name].[ext]",
          context: "public",
        },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                modules: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.htm$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@debug": path.resolve(__dirname, "src/debug/"),
      "@game": path.resolve(__dirname, "src/game/"),
      "@playground": path.resolve(__dirname, "src/playground/"),
      "@sdk": path.resolve(__dirname, "src/sdk/"),
      "@sdk-ui": path.resolve(__dirname, "src/sdk-ui/"),
      "@sdk-pixi": path.resolve(__dirname, "src/sdk-pixi/"),
      "@sdk-integration": path.resolve(__dirname, "src/sdk-integration/"),
      "@launcher": path.resolve(__dirname, "src/launcher/"),
    },
    fallback: {
      crypto: false,
      util: false,
      buffer: false,
      path: false,
      // crypto: require.resolve("crypto-browserify"),
    },
  },
  devServer: {
    client: {
      overlay: true,
      webSocketURL: process.env.WDS_SOCKET_URL || undefined,
    },
    host: "0.0.0.0",
    port: process.env.WDS_PORT || 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    allowedHosts: "all",
    open: false,
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 800,
    poll: 1000,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
