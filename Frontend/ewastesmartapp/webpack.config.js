module.exports = {
  // other webpack configuration options...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // Exclude source map files from parsing
        exclude: /\.map$/,
      },
      // other rules...
    ],
  },
};
