const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/content.js'), // Entry file for your content script
  output: {
    filename: 'content.bundle.js', // Output file
    path: path.resolve(__dirname, 'dist') // Directory for the output
  },
  mode: 'development', // Use 'production' for minified code
  devtool: 'source-map' // Optional: Include source maps for debugging
};
