const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  // Needed to prevent webpack "Field 'browser' doesn't contain a valid alias configuration" error
  resolve: {
    extensions: [".jsx", ".js"],
  }
};
