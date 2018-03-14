const logger = (plugin, options, compilation) => {
  if (plugin.errors.length) {
    compilation.errors.push(
      new Error(options.formatter(plugin.errors))
    )

    plugin.errors = []
  }

  if (plugin.warnings.length) {
    compilation.warnings.push(
      new Error(options.formatter(plugin.warnings))
    )

    plugin.warnings = []
  }
}

module.exports = logger
