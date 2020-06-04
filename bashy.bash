webpack
webpack-cli
npm script:
    "scripts": {
      "react-dev": "webpack -d --watch",
      "server-dev": "nodemon server/index.js"
    }
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react
webpack.config.js:
    var webpack = require('webpack');
    var path = require('path');
    module.exports = {
      entry: __dirname + '/client/src/index.jsx',
      module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
      }
    };
.babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}