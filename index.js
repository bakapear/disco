/* disco */
if (typeof window !== 'undefined') {
  require(process.argv.pop())

  let fs = require('fs')
  let ph = require('path')

  let main = ph.join(process.env.LOCALAPPDATA, 'discord', 'disco', 'core.js')
  if (fs.existsSync(main)) { try { require(main) } catch (e) { console.error(e) } }
} else {
  let electron = require('electron')

  class BrowserWindow extends electron.BrowserWindow {
    constructor (opts) {
      if (opts.webPreferences.preload) {
        opts.webPreferences.additionalArguments.push(opts.webPreferences.preload)
        opts.webPreferences.preload = __filename
      }
      super(opts)
    }
  }

  let ep = require.cache[require.resolve('electron')]
  delete ep.exports
  ep.exports = Object.assign({}, electron, { BrowserWindow })

  module.exports = require('./core.asar')
}
