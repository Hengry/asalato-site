exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig,
}) => {
  const config = getConfig();

  config.module.rules.push({
    test: /\.worker\.ts$/,
    use: { loader: 'worker-loader' },
  });

  replaceWebpackConfig(config);
};
