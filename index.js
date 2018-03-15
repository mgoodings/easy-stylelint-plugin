const path = require('path')
const formatter = require('stylelint').formatters.string
const runner = require('./lib/runner')
const emitter = require('./lib/emitter')

const moveIfExists = (dest, src, attr) => {
  if (src.hasOwnProperty(attr)) {
    dest[attr] = src[attr]

    delete src[attr]
  }
}

class EasyStylelintPlugin {
  constructor (options = {}) {
    this.changesOnly = false
    this.ignoreFirstRun = false
    this.failOnError = false

    moveIfExists(this, options, 'changesOnly')
    moveIfExists(this, options, 'ignoreFirstRun')
    moveIfExists(this, options, 'failOnError')

    this.__options = Object.assign({
      files: ['**/*.s?(c|a)ss'],
      formatter
    }, options)

    this.errors = []
    this.warnings = []
  }

  apply (compiler) {
    const options = Object.assign({
      context: compiler.context
    }, this.__options)

    options.files = options.files.map(file =>
      path.resolve(options.context, file))

    if (this.changesOnly) {
      const emitFn = emitter.bind(null, this, options, compiler)

      if (compiler.hooks) {
        compiler.hooks.emit.tapAsync('EasyStylelintPlugin', emitFn)
      } else {
        compiler.plugin('emit', emitFn)
      }
    } else {
      const runFn = runner.bind(null, this, options)

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
