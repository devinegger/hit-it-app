const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/js/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        // before: function(app, server) {
        //     server._watch('./app/**/*.html')
        // },
        watchFiles: ['./app/**/*.html'],
        static: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
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