import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                loaders: ['react-hot', 'babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                test: /\.js$/,
                plugins: ['transform-runtime'],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
}
