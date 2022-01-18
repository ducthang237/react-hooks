var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');

module.exports = (env, args) => ({
    //mode: 'development',
    output: {
        path: path.join(__dirname, "/build")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sass|less|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
                use: [ {loader: 'file-loader' }]
           }
        ],
    },
    resolve: {
        mainFiles: ['index', 'Index'],
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        fallback: {
            "fs": false,
            "os": false,
            //"path": false
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new Dotenv({
            path: args.mode === 'production' ? './.env.production' : './.env.development'
        }),
    ],
    devServer: {
        historyApiFallback: true
    }
})