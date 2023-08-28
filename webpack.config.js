const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/bundle.js', // Single entry point
    output: {
        filename: 'bundle.js', // Single output file
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192, // Use DataURL for assets <= 8KB
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: '[path][name].[ext]',
                          context: 'src',
                          outputPath: (url, resourcePath, context) => {
                            if (/imgs/.test(resourcePath)) {
                              return `imgs/${url}`;
                            }
                            if (/orbs/.test(resourcePath)) {
                              return `orbs/${url}`;
                            }
                            if (/book\/imgs/.test(resourcePath)) {
                                return `book/imgs/${url}`;
                            }
                            if (/book\/imgs\/10/.test(resourcePath)) {
                                return `book/imgs/10/${url}`;
                            }
                            return `fonts/${url}`;
                          }
                        }
                      }
                    },
                  },
                ],
              }
              
              
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/imgs'), to: 'imgs' },
              { from: path.resolve(__dirname, 'src/orbs'), to: 'orbs' },
              // { from: path.resolve(__dirname, 'src/audiobook'), to: 'audiobook' },
              { from: path.resolve(__dirname, 'src/book/imgs'), to: 'book/imgs' },
              { from: path.resolve(__dirname, 'src/glossary.json'), to: 'glossary.json' },
               // add this line
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000
    }
};
