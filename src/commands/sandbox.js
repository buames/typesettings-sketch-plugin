// import UI from 'sketch/ui'
import BrowserWindow from 'sketch-module-web-view'
// import { savePreferences } from '../storage'

export const setDirectory = () => {
  const options = {
    identifier: 'typesettings.sandbox',
    width: 310,
    height: 500,
    minWidth: 260,
    minHeight: 450,
    show: false,
    backgroundColor: '#FFFFFF',
    fullscreenable: false
  }

  const window = new BrowserWindow(options)

  // Only show the window when the page has loaded
  window.once('ready-to-show', () => {
    window.show()
  })

  // // print a message when the page loads
  // window.webContents.on('did-finish-load', () => {
  //   UI.message('UI loaded!')
  // })

  // Add a handler for a call from web content's javascript
  // window.webContents.on('nativeLog', (s) => {
  //   console.log('hi')
  //   UI.message(s)
  //   window.webContents.executeJavaScript(`setRandomNumber(${ Math.random() })`)
  // })

  window.loadURL(require('../../resources/index.html'))

  // const options = {
  //   buttonLabel: 'Set Directory',
  //   properties: ['openDirectory'],
  //   filters: [
  //     { name: 'DirectoriesOnly', extensions: [''] }
  //   ]
  // }

  // const callback = (selection) => {
  //   const done = savePreferences({
  //     // take the first selection
  //     userDefinedDirectory: selection[0]
  //   })
  //   UI.message(done)
  // }

  // dialog.showOpenDialog(options, callback)
}
