module.exports = ctx => ({
  plugins: {
    'postcss-preset-env': {
      stage: 1
    },
    cssnano: ['production', 'staging'].includes(ctx.env) ? {} : false
  }
})
