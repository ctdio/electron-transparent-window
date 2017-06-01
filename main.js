const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

let win

function initWindow () {
  win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })

  // ignore mouse events by default so that mouse clicks
  // win.setIgnoreMouseEvents(true)

  win.loadURL(`file:${path.join(__dirname, 'index.html')}`)

  ipcMain.on('enable-click-through', () => {
    win.setIgnoreMouseEvents(true)
  })

  ipcMain.on('disable-click-through', () => {
    win.setIgnoreMouseEvents(false)
  })

  ipcMain.on('mouse-event', (event, data) => {
    console.log('we got something', event, data)
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', initWindow)

app.on('activate', () => {
  if (win === null) {
    initWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
