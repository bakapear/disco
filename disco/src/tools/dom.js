module.exports = {
  createNode,
  $: (name, raw) => {
    let all = Array.isArray(name) ? (name = name[0], 1) : 0
    let e = raw ? document.querySelector(name) : document.getElementsByClassName(name)
    return all ? Array.from(e) : e[0]
  }
}

function createNode (name, ...args) {
  let t = document.createElement(name)

  let arg = null
  do {
    arg = args.shift()
    switch (typeof arg) {
      case 'string':
        t.innerText = arg
        break
      case 'object':
        if (Array.isArray(arg)) t.classList.add(...arg)
        else for (let p in arg) t.setAttribute(p, arg[p])
        break
    }
  } while (arg)

  return t
}
