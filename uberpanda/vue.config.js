module.exports = {
    publicPath:'./',
    outputDir:'../docs',
    productionSourceMap: false,
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    css: {
        extract: false
    }
}