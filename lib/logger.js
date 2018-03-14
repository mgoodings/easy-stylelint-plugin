const logger = (plugin, options, compilation) => {
  if (plugin.errors.length) {
    compilation.errors.push(
      new Error(options.formatter(plugin.errors))
    )

    plugin.errors = []
  }
}

module.exports = logger
