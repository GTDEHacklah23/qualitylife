const path = require("path");

module.exports = {
  entry: {
    login: "./web/src/pages/login.ts",
    signup: "./web/src/pages/signup.ts",
    newpost: "./web/src/pages/newpost.ts",
    forum: "./web/src/pages/forum.ts",
    post: "./web/src/pages/post.ts",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsloader.json"),
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "web", "assets"),
  },
  cache: {
    type: "filesystem",
  },
  mode: "development",
};
