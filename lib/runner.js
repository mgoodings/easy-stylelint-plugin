const linter = require('./linter')
const logger = require('./logger')

const runner = (plugin, options, compiler, next) => {
  linter(options)
    .then(lint => {
      if (lint.errored) {
        plugin.errors = lint.results.filter(f => f.errored)
      }

      plugin.warnings = lint.results.filter(f => !f.errored && f.warnings && f.warnings.length)

      if (plugin.failOnError && plugin.errors.length) {
        next(new Error(options.formatter(plugin.errors)))
      } else {
        next()
      }
    })
    .catch(next)

  const logFn = logger.bind(null, plugin, options)

  if (compiler.hooks) {
    compiler.hooks.afterEmit.tap('EasyStylelintPlugin', logFn)
  } else {
    compiler.plugin('after-emit', logFn)
  }
}

module.exports = runner
