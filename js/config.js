require.config({
    paths: {
        'geoJson': '../geoData/geoJson',
        'theme': '../theme',
        'data': './data',
        'map': '../map',
        'extension': '../dist/extension'
    },
    packages: [
        {
            main: 'echarts',
            location: './js',
            name: 'echarts'
        },
        {
            main: 'zrender',
            location: './js',
            name: 'zrender'
        }
    ]
    // urlArgs: '_v_=' + +new Date()
});