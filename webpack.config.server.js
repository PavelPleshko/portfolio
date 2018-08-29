
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