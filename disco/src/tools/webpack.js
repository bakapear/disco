let window = require('electron').webFrame.top.context.window

module.exports = async function () {
  let webpack = await loadWebpack()
  let get = prop => findModule(webpack, prop)

  return {
    get,
    Dispatcher: get(636602).default,
    React: get(667294),
    ReactDOM: get(364448)
  }
}

async function loadWebpack () {
  await new Promise(resolve => {
    let check = setInterval(() => {
      if (window.webpackChunkdiscord_app?.length === 46) {
        clearInterval(check)
        resolve()
      }
    }, 100)
  })

  let mods = []
  window.webpackChunkdiscord_app.push([[''], {}, e => { for (let c in e.c) mods.push(e.c[c]) }])
  window.webpackChunkdiscord_app.pop()
  return mods.reduce((arr, val) => {
    let ex = val.exports
    if (ex) {
      if (typeof ex !== 'object') ex = { default: ex }
      arr.push({ id: val.id, ...ex })
    }
    return arr
  }, [])
}

function findModule (webpack, prop) {
  let all = Array.isArray(prop) ? (prop = prop[0], 1) : 0
  let type = typeof prop

  let fn = x => x[prop] || (x.default && (x.default[prop] || x.default.displayName === prop))
  if (type === 'number') fn = x => x.id === prop
  else if (type === 'function') fn = prop

  if (!all) return webpack.find(fn)
  else return webpack.reduce((arr, x) => (fn(x) ? arr.push(x) : 1) && arr, [])
}
