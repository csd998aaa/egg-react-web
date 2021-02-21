const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');

const appDir = path.resolve(__dirname, './app').replace(/\\/g, '/');
const webDir = path.resolve(__dirname, './web').replace(/\\/g, '/');

module.exports = (webpackEnv) => {
    const isEnvProduction = webpackEnv == 'production';

    const cssModuleLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }
        }
    };

    const lessLoader = {
        loader: 'less-loader',
        options: {
            lessOptions: {
                javascriptEnabled: true
            }
        }
    };

    const devServer = {
        hot: true,
        inline: true,
        contentBase: '/',
        host: "0.0.0.0", // 可以使用手机访问
        port: 9000,
        noInfo: true,
        clientLogLevel: "none",
        // proxy: {
        //     "/": "http://localhost:7001"
        // }
    };

    const config = {
        mode: isEnvProduction ? 'production' : 'development',

        entry: {
            main: path.resolve(webDir, './index.js'),
            vendors: ['react', 'react-router-dom', 'antd'],
        },

        output: {
            path: isEnvProduction ? path.resolve(appDir, './public') : '/',
            filename: isEnvProduction ? '[name].[chunkhash:6].js' : '[name].js',
            chunkFilename: isEnvProduction ? 'chunk/[name].js' : 'chunk/[name].[chunkhash:10].js',
            publicPath: isEnvProduction ? '/public/' : '/',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: isEnvProduction ? [] : [require.resolve("react-refresh/babel")]
                        }
                    },

                },

                {
                    test: /\.module\.(css|less)$/,
                    use: [MiniCssExtractPlugin.loader, cssModuleLoader, 'postcss-loader', lessLoader]
                },

                {
                    test: /\.(css|less)$/,
                    exclude: /\.module\.(css|less)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', lessLoader]
                },

                {
                    test: /\.(png|jpe?g|gif|svg)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: './[name].[ext]',
                                limit: 8192,
                                outputPath: 'images/'
                            }
                        }
                    ]
                },

                {
                    test: /\.(eot|woff2?|ttf)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name]-[hash:5].min.[ext]',
                                limit: 8192,
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                },

            ],
        },

        plugins: [
            new CleanWebpackPlugin([path.resolve(appDir, './public'), path.resolve(appDir, './view')]),
            new MiniCssExtractPlugin({ filename: isEnvProduction ? 'styles/[name].v1.[chunkhash:6].css' : 'styles/[name].css' }),
            new HtmlWebpackPlugin({
                filename: isEnvProduction ? path.resolve(appDir, './view/index.nj') : 'index.html',
                template: path.resolve(webDir, './index.nj'),
                inject: 'body',
                minify: isEnvProduction ? true : false
            }),
            new webpack.DefinePlugin({
                BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),  // 编译环境（development/test/production）
            }),
            new WebpackBar(),
        ],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./web"),
                pages: path.resolve(__dirname, "./web/pages"),
                router: path.resolve(__dirname, "./web/router"),
                'react-dom': '@hot-loader/react-dom'
            },
            extensions: ['.js', '.jsx', '.json', '.css', '.less'], // 省略后缀
        },

        optimization: {
            minimize: isEnvProduction ? true : false,
        },

        devServer: devServer,

        stats: 'errors-only',

        devtool: isEnvProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

    };

    if (isEnvProduction) {
        config.plugins.push(
            new CopyWebpackPlugin([{ from: webDir, to: path.resolve(appDir, './view'), ignore: '!*.nj' }]), // 拷贝文件到 egg dir
        );
    } else {
        config.plugins.push(
            new ReactRefreshPlugin(),
            new webpack.NamedChunksPlugin(),
        );
    }

    return config;
}