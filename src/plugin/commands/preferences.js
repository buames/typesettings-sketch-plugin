import dialog from '@skpm/dialog'
import UI from 'sketch/ui'
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

  // Prompts to select a local directory file path
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

  // Copies the userDefinedDirectory to the clipboard
  webContents.on('copyUserDefinedDirectoryPath', () => {
    const pasteboard = NSPasteboard.generalPasteboard()
    pasteboard.clearContents()
    pasteboard.setString_forType_(preferences.userDefinedDirectory, NSStringPboardType) // eslint-disable-line
    UI.message('Copied to clipboard!')
  })

  // Copies the userDefinedDirectory to the clipboard
  webContents.on('showUserDefinedDirectory', () => (
    NSWorkspace.sharedWorkspace()
      .selectFile_inFileViewerRootedAtPath(preferences.userDefinedDirectory, null)
  ))

  // Open an external url
  webContents.on('openUrl', url => (
    NSWorkspace.sharedWorkspace()
      .openURL(NSURL.URLWithString(url))
  ))

  window.loadURL(WebviewEntry)
}
