const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//const WebpackManifestPlugin = require('webpack-manifest-plugin')

const config = {
    entry: './app/app.js',          //src folder name and index.js file name
    output: {
        filename: 'myBundle.[hash].js',    //to customize dist main.js file name
        path: path.resolve(__dirname, 'dist')   //to change name of the dist folder
    },
    //watch: true     //to run webpack with watch
    plugins : [new HtmlWebpackPlugin({template: './app/index.html'})],
    mode: "development",
    devtool: "eval-cheap-source-map",   //source map enable
    devServer: {
        port: 8080,     //webpack-dev-serve port and file path
        contentBase: path.resolve(__dirname, 'dist'),   
        hot: true       //to reload only javascript ,,,it will reload page
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader",'css-loader', "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [['@babel/preset-env', {"useBuiltIns": "usage", "corejs": 3, "targets": "defaults"}], '@babel/preset-react']
                    }
                }
            }
        ]
    }
}

if (currentTask == "build") {
    config.mode = "production"
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
    config.plugins.push(new MiniCssExtractPlugin({filename: "main.[hash].css"}), new CleanWebpackPlugin())
}

module.exports = config