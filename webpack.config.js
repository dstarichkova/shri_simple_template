const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const LodashWebPackPlugin = require('lodash-webpack-plugin');


const config = {
    entry: {
        main: {
            import: './src/index.js',
        },
    },
    devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'inline-source-map',
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
        new MiniCssExtractPlugin(),
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
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                        ],
                    plugins: ['lodash']
                },
                exclude: /node_modules/,
                resolve: {extensions: ['.js', '.jsx']},
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        concatenateModules: true,
        usedExports: true,
        splitChunks: {
            minChunks: 2,
            chunks: "all",
            minSize: 0,
        },
        runtimeChunk: "single"
    },
    resolve: {
        mainFields: ['unpkg', 'main', 'module'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve("stream-browserify")
        },
        alias: {
            'crypto-browserify$': path.resolve(__dirname, 'src/crypto-fallback.ts'),
        }
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
