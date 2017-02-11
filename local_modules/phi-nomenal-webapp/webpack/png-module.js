const path = require('path')

module.exports = {
  test: /\.png$/,
  include: path.resolve(__dirname, '..', 'app'),
  loader: 'url-loader'
}
