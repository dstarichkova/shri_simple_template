const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const LodashWebPackPlugin = require('lodash-webpack-plugin');

const config = {
    entry: {
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
        main: './src/index.js',
    },
    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            favicon: './public/favicon.ico'
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveReportTo: 'report.html',
            saveOnlyStats: false,
            open: false,
        }),
        new LodashWebPackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                        ]
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                exclude: /node_modules/
            },
        ],
    },

    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        innerGraph: true,
        concatenateModules: true,
        usedExports: true,
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.js', '.css', 'html'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve("stream-browserify")
        },
    },
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        hot: true,
        port: 9000,
    },
};

module.exports = config;
