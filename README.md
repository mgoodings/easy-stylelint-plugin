# Easy Stylelint Plugin

A plugin to run stylelint inside webpack.

## Install

```bash
npm install --save-dev stylelint easy-stylelint-plugin
# OR
yarn add --dev stylelint easy-stylelint-plugin
```

## Usage

In your webpack configuration

```js
var EasyStylelintPlugin = require('easy-stylelint-plugin');

module.exports = {
  // ...
  plugins: [
    new EasyStylelintPlugin(options),
  ],
  // ...
}
```

### Options

See [stylelint options](http://stylelint.io/user-guide/node-api/#options) for the complete list of options. This object is passed straight to the `stylelint.lint` function and has the following defaults:

* `changesOnly`: Lint only changed files. Default: `false`
* `ignoreFirstRun`: Used with `changesOnly` to ignore the first run. Default: `false`
* `failOnError`: Throw a fatal error in the global build process. Default: `false`
* `configFile`: You can change the config file location. Default: (`undefined`), handled by [stylelint's cosmiconfig module](http://stylelint.io/user-guide/configuration/).
* `files`: Change the glob pattern for finding files. Must be relative to `options.context`. Default: `['**/*.s?(c|a)ss']`
* `formatter`: Use a custom formatter to print errors to the console. Default: `require('stylelint').formatters.string`

## Acknowledgement

This project is heavily inspired from [stylelint-webpack-plugin](https://github.com/JaKXz/stylelint-webpack-plugin) and [stylelint-bare-webpack-plugin](https://github.com/cascornelissen/stylelint-bare-webpack-plugin)

## License

(The MIT License)

Copyright (c) 2018 Miles Goodings

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
