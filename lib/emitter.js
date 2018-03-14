const micromatch = require('micromatch')
const runner = require('./runner')

const isModifiedFn = epoch => (lastTimestamp, timestamp) => {
  const oldTime = lastTimestamp || epoch
  const newTime = timestamp || Infinity

  return (oldTime < newTime)
}

const matchesGlobFn = glob => key => micromatch.isMatch(key, glob)

const emitter = (plugin, options, compiler, compilation, next) => {
  const timestamps = compilation.fileTimestamps

  if (!plugin.epoch) {
    plugin.epoch = Date.now()
    plugin.timestamps = timestamps

    return plugin.ignoreFirstRun ? next() : runner(plugin, options, compiler, next)
  }

  const isModified = isModifiedFn(plugin.epoch)
  const matchesGlob = matchesGlobFn(options.files.join('|'))

  let changedFiles = []

  if (timestamps instanceof Map) {
    changedFiles = Array.from(timestamps.keys())
      .filter(key => isModified(
        plugin.timestamps.get(key),
        timestamps.get(key)
      ))
      .filter(matchesGlob)
  } else {
    changedFiles = Object.keys(timestamps)
      .filter(key => isModified(
        plugin.timestamps[key],
        timestamps[key]
      ))
      .filter(matchesGlob)
  }

  plugin.timestamps = timestamps

  if (changedFiles.length) {
    const newOptions = Object.assign({}, options, {
      files: changedFiles
    })

    runner(plugin, newOptions, compiler, next)
  } else {
    next()
  }
}

module.exports = emitter
