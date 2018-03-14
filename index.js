const formatter = require('stylelint').formatters.string
const runner = require('./lib/runner')
const emitter = require('./lib/emitter')

class EasyStylelintPlugin {
  constructor (options = {}) {
    this.onlyChanged = false
    this.ignoreFirstRun = false
    this.failOnError = false

    if (options.onlyChanged) {
      this.onlyChanged = options.onlyChanged

      delete options.onlyChanged
    }

    if (options.ignoreFirstRun) {
      this.ignoreFirstRun = options.ignoreFirstRun

      delete options.ignoreFirstRun
    }

    if (options.failOnError) {
      this.failOnError = options.failOnError

      delete options.failOnError
    }

    this.__options = Object.assign({
      files: ['**/*.s?(c|a)ss'],
      formatter
    }, options)

    this.errors = []
  }

  apply (compiler) {
    if (this.onlyChanged) {
      const emitFn = emitter.bind(null, this, this.__options, compiler)

      if (compiler.hooks) {
        compiler.hooks.emit.tapAsync('EasyStylelintPlugin', emitFn)
      } else {
        compiler.plugin('emit', emitFn)
      }
    } else {
      const runFn = runner.bind(null, this, this.__options)

      if (compiler.hooks) {
        compiler.hooks.run.tapAsync('EasyStylelintPlugin', runFn)
        compiler.hooks.watchRun.tapAsync('EasyStylelintPlugin', runFn)
      } else {
        compiler.plugin('run', runFn)
        compiler.plugin('watch-run', (watcher, next) => runFn(watcher.compiler, next))
      }
    }
  }
}

module.exports = EasyStylelintPlugin
