import dialog from '@skpm/dialog'
import BrowserWindow from 'sketch-module-web-view'
import WebviewEntry from 'webview/index.html'
import { preferences, savePreferences } from 'plugin/storage'

export default () => {
  const options = {
    identifier: 'typesettings',
    redirectTo: '/',
    width: 310,
    height: 500,
    minWidth: 260,
    minHeight: 450,
    show: false,
    loaded: false,
    backgroundColor: '#FFFFFF',
    fullscreenable: false,
    devTools: true
  }

  const window = new BrowserWindow(options)
  const { webContents } = window

  // Only show the window when the page has loaded
  window.once('ready-to-show', () => {
    window.show()
  })

  // Returns the plugin preferences to the webview
  webContents.on('getPreferences', () => {
    webContents.executeJavaScript(`preferences = ${ JSON.stringify(preferences) }`)
  })

  // Updates the plugin preferences from the webview
  webContents.on('setPreferences', (newState) => {
    const newPrefs = savePreferences(newState)
    webContents.executeJavaScript(`reloadData(${ JSON.stringify(newPrefs) })`)
  })

  // Lets the user select a file path for the local directory
  webContents.on('selectUserDefinedDirectory', (newState) => {
    const opts = {
      buttonLabel: 'Set Directory',
      properties: [ 'openDirectory' ],
      filters: [
        { name: 'DirectoriesOnly', extensions: [ '' ] }
      ]
    }

    dialog.showOpenDialog(opts, ((selection) => {
      const newPrefs = savePreferences({
        ...newState,
        userDefinedDirectory: selection[0]
      })
      webContents.executeJavaScript(`reloadData(${ JSON.stringify(newPrefs) })`)
    }))
  })

  window.loadURL(WebviewEntry)
}
