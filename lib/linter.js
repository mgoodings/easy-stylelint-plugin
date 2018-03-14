const stylelint = require('stylelint')

const linter = options => new Promise((resolve, reject) => {
  stylelint.lint(options)
    .then(data => resolve(data))
    .catch(e => reject(e))
})

module.exports = linter
