exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig,
}) => {
  const config = getConfig();

  config.module.rules.push({
    test: /\.worker\.ts$/,
    use: { loader: 'worker-loader' },
  });

  config.output.globalObject = 'this';

  replaceWebpackConfig(config);
};
