const path = require('path');

const postCSSPlugins = [
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        static: path.join(__dirname, 'app'),
        hot: true,
        port: 3000
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader', {loader: "postcss-loader", options: {postcssOptions: {plugins: postCSSPlugins}}}]
            }
        ]
    }
}