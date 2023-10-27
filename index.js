/* disco */
if (typeof window !== 'undefined') {
  require(process.env.DISCO_PRELOAD)
  delete process.env.DISCO_PRELOAD
  try {
    let fs = require('fs')
    let ph = require('path')

    let dir = ph.join(process.env.LOCALAPPDATA, 'discord', 'disco')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    window.addEventListener('DOMContentLoaded', () => {
      liveCSS(ph.join(dir, 'style.css'))
      execScript(ph.join(dir, 'script.js'))
    })

    function liveCSS (file) {
      if (!fs.existsSync(file)) fs.writeFileSync(file, '')

      let style = document.createElement('style')
      document.documentElement.append(style)

      let update = () => setTimeout(() => { style.innerText = fs.readFileSync(file, 'utf-8') }, 10)

      let pause = false
      fs.watch(file, () => {
        if (!pause) {
          setTimeout(pause = true && (() => { pause = false }), 100)
          update()
        }
      })

      update()
    }

    function execScript (file) {
      if (!fs.existsSync(file)) fs.writeFileSync(file, '')
      require(file)
    }
  } catch (e) { console.error(e) }
} else {
  let electron = require('electron')

  class BrowserWindow extends electron.BrowserWindow {
    constructor (opts) {
      if (opts.webPreferences.preload) {
        process.env.DISCO_PRELOAD = opts.webPreferences.preload
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
