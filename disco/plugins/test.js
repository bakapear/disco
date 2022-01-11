/* global disco, MutationObserver */

let { $ } = disco

disco.Dispatcher.subscribe('USER_SETTINGS_MODAL_INIT', onSettingsOpened)

let classes = {
  ...disco.get('contentColumn'),
  ...disco.get('layers'),
  ...disco.get('side')
}

let observer = null

async function onSettingsOpened () {
  let sep = $([classes.separator])[3]
  if (!sep) return await observeOnce($(classes.layers)) && onSettingsOpened()

  let item = Builder.Settings.item('Plugins')

  sep.after(...[
    Builder.Settings.header('Disco'),
    item,
    Builder.Settings.separator()
  ])
}

let Builder = {
  Settings: {
    header: text => disco.createNode('div', text, [classes.header]),
    item: text => disco.createNode('div', text, [classes.item, classes.themed]),
    separator: () => disco.createNode('div', [classes.separator])
  }
}

async function observeOnce (node) {
  if (observer) observer.disconnect()
  return new Promise(resolve => {
    observer = new MutationObserver(m => {
      observer.disconnect()
      resolve(true)
    })
    observer.observe(node, { childList: true })
  })
}
