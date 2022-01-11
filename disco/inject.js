/* disco */
let ph = require('path')
let electron = require('electron')
let dir = ph.join(process.env.LOCALAPPDATA, 'discord/disco/src')
let attempt = x => { try { require(ph.join(dir, x)) } catch (e) {} }
let [core, main] = ['core.js', 'main.js']

if (electron.ipcRenderer) require(process.argv.pop()) && attempt(core)
else {
  class BrowserWindow extends electron.BrowserWindow {
    constructor (opts) {
      if (opts.webPreferences.preload) {
        opts.webPreferences.additionalArguments.push(opts.webPreferences.preload)
        opts.webPreferences.preload = __filename
      }
      super(opts)
    }
  }

  let e = require.cache[require.resolve('electron')]
  delete e.exports
  e.exports = Object.assign({}, electron, { BrowserWindow })

  module.exports = require('./core.asar')

  attempt(main)
}
