module.exports = {
  ident: 'postcss',
  plugins: [
    require('autoprefixer')(),
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-url')(),
    require('postcss-preset-env')({ stage: 2 }),
    require('postcss-reporter')(),
    require('postcss-browser-reporter')({ disabled: env === 'production' })
  ]
}
