let electron = require('electron')

electron.ipcMain.handle('disable-devtools-warning', e => {
  let wc = e.sender.getOwnerBrowserWindow().webContents
  wc.removeAllListeners('devtools-opened')
})

electron.ipcMain.once('csp-whitelist', (e, list) => {
  // TODO: make whitelist work
  electron.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders }, done) => {
    Object.keys(responseHeaders)
      .filter(k => (/^content-security-policy/i).test(k))
      .map(k => (delete responseHeaders[k]))
    done({ responseHeaders })
  })
})
