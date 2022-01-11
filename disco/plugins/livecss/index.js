/* global disco */
let fs = require('fs')

let CSS = 'live.css'

module.exports = {
  name: 'LiveCSS',
  version: '1.0.0',
  description: 'Enables live stylesheet editing',
  author: 'pear',
  async load () {
    if (this.css) return
    this.css = CSS
    if (!fs.existsSync(this.css)) fs.writeFileSync(this.css, '')

    this.tag = disco.createNode('style', ['disco-LiveCSS'])
    document.head.append(this.tag)

    this.watch(this.tag, this.css)
    this.update()
  },
  async unload () {
    if (!this.css) return
    this.watcher.close()
    this.tag.remove()
    this.css = this.tag = this.watcher = null
  },
  watch () {
    let pause = false
    this.watcher = fs.watch(this.css, () => {
      if (!pause) {
        setTimeout(pause = true && (() => { pause = false }), 100)
        this.update()
      }
    })
  },
  update () {
    if (this.tag) setTimeout(() => { this.tag.innerText = fs.readFileSync(this.css, 'utf-8') }, 10)
  }
}
