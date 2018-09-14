const EventHooksPlugin = require('event-hooks-webpack-plugin');
const fs = require('fs-extra');
const webpack = require("webpack");
const path = require('path');

const config = {
  name:"server",
  entry:{server:path.join(__dirname, 'server/server.ts')},
  target: 'node',
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.js']
  },
node: {
  __dirname: false,
  __filename: false
},   
 output: {
        path: path.join(__dirname , 'server/dist/'),
        filename: '[name].js',
    },
    externals:[/(node_modules|main\..*\.js)/],
module:{

 
       rules: [
     { test: /\.ts$/, loader: 'ts-loader' }
  ]
    
},
plugins:[
new EventHooksPlugin({
        'beforeRun': (compilation, done) => {
          console.log('Copying source files to compile')
          fs.copy(path.join(__dirname , './dist/browser'), path.join(__dirname,'server/dist/browser'));
          fs.copy(path.join(__dirname , './dist/server'), path.join(__dirname,'server/dist/server'),done);
        }
      }),
 new webpack.NormalModuleReplacementPlugin(/\.\.\/environments\/environment/, '../environments/environment.prod'),
new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'server/dist/browser'),
      {}
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'server/dist/browser'),
      {}
    )
]
}


module.exports = config;