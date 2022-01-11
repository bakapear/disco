/* global disco:writable */

let fs = require('fs')
let ph = require('path')
let electron = require('electron')

process.chdir(ph.join(__dirname, '..'))

main()
async function main () {
  disco = resolvePaths('plugins')

  loadConfig('config.json')

  let tools = await loadTools(ph.join(__dirname, 'tools'))
  if (tools) Object.assign(disco, tools)

  execScripts()
  loadPlugins()
}

function resolvePaths (dir) {
  dir = ph.resolve(process.cwd(), dir)
  let files = fs.readdirSync(dir).reduce((a, b) => {
    try { a.push(require.resolve(ph.join(dir, b))) } catch (e) { }
    return a
  }, [])

  let plugins = []
  let scripts = []

  for (let file of files) {
    try {
      let mod = {}
      Object.defineProperty(mod, 'path', { value: file })
      if (dir === ph.resolve(file, '..')) {
        mod.exec = () => rawRequire(file)
        scripts.push(mod)
      } else {
        Object.assign(mod, rawRequire(file))
        plugins.push(mod)
      }
    } catch (e) { error(file, e) }
  }

  return { plugins, scripts }
}

function loadConfig (path) {
  let cfg = rawRequire(ph.join(process.cwd(), path))
  if (cfg.exposeGlobalToWindow) electron.webFrame.top.context.window.disco = disco
  if (cfg.disableDevToolsWarning) electron.ipcRenderer.invoke('disable-devtools-warning')
  if (cfg.cspWhitelist) electron.ipcRenderer.send('csp-whitelist', cfg.cspWhitelist)
}

async function loadTools (dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return
  let files = fs.readdirSync(dir).filter(x => x.indexOf('.') >= 0)
  let res = {}
  for (let file of files) {
    let mod = rawRequire(ph.resolve(dir, file))
    if (typeof mod === 'function') mod = await mod()
    Object.assign(res, mod)
  }
  return res
}

function execScripts () {
  for (let script of disco.scripts) {
    try { if (script.exec) script.exec() } catch (e) { error(script.path, e) }
  }
}

function loadPlugins () {
  for (let plugin of disco.plugins) {
    if (plugin.load) plugin.load().catch(e => error(plugin.path, e))
  }
}

function rawRequire (mod) {
  delete require.cache[require.resolve(mod)]
  return require(mod)
}

function error (file, e) {
  let name = ph.relative(process.cwd(), file).split('\\')[1]
  console.error(`[disco] <${name}> ${e.stack.split(/\r?\n/).slice(0, 2).join('\n')}`)
}
