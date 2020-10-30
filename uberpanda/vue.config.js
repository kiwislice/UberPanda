module.exports = {
    publicPath:'./',
    outputDir:'../docs',
    lintOnSave: false,
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