module.exports = ctx => ({
  plugins: {
    'postcss-preset-env': {
      stage: 2
    },
    cssnano: ['production', 'staging'].includes(ctx.env) ? {} : false
  }
})
