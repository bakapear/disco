// changes the top bar color of discord window depending on status of user
// > for my live.css theme

/* global disco */

// background node class

// listen for status change and update style (fires on launch aswell)
disco.Dispatcher.subscribe('USER_SETTINGS_UPDATE', e => {
  if (e.settings.status) setStatus(e.settings.status)
})

let bg = null
function setStatus (status) {
  if (!bg) bg = disco.$(disco.get(450388).bg)
  bg.style.setProperty('--status', `var(--status-${status})`)
}
