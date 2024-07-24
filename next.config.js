module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      loader: "webpack-glsl-loader",
    });
    return config;
  },
};
