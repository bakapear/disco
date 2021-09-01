/* disco */
if (typeof window !== 'undefined') {
  require(process.argv.pop())
  try {
    let fs = require('fs')
    let path = require('path')
    
    let css = path.join(process.env.LOCALAPPDATA, 'discord', 'style.css')

    window.addEventListener('DOMContentLoaded', () => liveCSS(css))

    function liveCSS (file) {
      let pause = false
      fs.watch(file, () => {
        if (!pause) {
          setTimeout(pause = true && (() => { pause = false }), 100)
          update()
        }
      })
      function update () {
        let tag = Array.from(document.getElementsByTagName('style')).find(x => x.getAttribute('livecss') === file)
        if (!tag) {
          tag = document.createElement('style')
          tag.setAttribute('livecss', file)
          tag.type = 'text/css'
          document.head.appendChild(tag)
        }
        setTimeout(() => { tag.innerText = fs.readFileSync(file, 'utf-8') }, 10)
      }
      update()
    }
  } catch (e) { console.error(e) }
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
