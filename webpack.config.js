const path = require("path");

module.exports = {
  entry: "./background.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "background.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  target: "web",
  mode: "development",
  devtool: "cheap-module-source-map",
};
