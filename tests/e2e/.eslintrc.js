module.exports = {
  plugins: [
    'cypress'
  ],
  env: {
    mocha: true,
    'cypress/globals': true
  },
  rules: {
    strict: 'off'
  },
  globals: {
    'Given': true,
    'When': true,
    'Then': true,
    'And': true,
    'cy': true
  }
}
