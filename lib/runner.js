const linter = require('./linter')
const logger = require('./logger')

const runner = (plugin, options, compiler, next) => {
  linter(options)
    .then(lint => {
      if (lint.errored) {
        plugin.errors = lint.results.filter(f => f.errored)
      }

      if (plugin.failOnError) {
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
