const path = require('path'); //para não ter problemas em diferentes sistemas operacionais com / e \\
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve:{
        extensions: ['.js', '.jsx'],
    },
    devServer:{
        static: path.resolve(__dirname, 'public'),
        hot: true,
    },
    plugins:[
        isDevelopment && new ReactRefreshWebPackPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module:{
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
};