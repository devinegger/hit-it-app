const path = require('path')

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development',
    watch: true
}