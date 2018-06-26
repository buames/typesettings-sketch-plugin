import UI from 'sketch/ui'
import fs from '@skpm/fs'
import path from '@skpm/path'
import os from 'os'
import { pluck, createPrompt, createSelect } from './utilities'

// Relevant: https://support.apple.com/en-us/ht201722
// Maybe we should be prompting a choice here? For now using adding
// to the local font directory but there is a chance we are not the admin
// and may not be able to access the root
const localFontDirectory = `${ os.homedir() }Library/Fonts`
const userFontDirectory = `${ NSHomeDirectory() }Library/Fonts`

// Checks if the font family is installed on the system
const isFontInstalled = fontFamily => {
  const fontFamilies = NSFontManager.sharedFontManager().availableFontFamilies()
  return fontFamilies.containsString(fontFamily)
}

// Returns font families available for download
const getFamilies = (context) => {
  const filePath = context.plugin.urlForResourceNamed('families.json').path()
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

// Installs a given an array of [ fontName, downloadUrl]
const installFont = ([fontName, downloadUrl]) => {
  const fileName = `${ fontName }${ path.extname(downloadUrl) }`
  const localFontFilePath = `${ localFontDirectory }/${ fileName }`
  const userFontFilePath = `${ userFontDirectory }/${ fileName }`
  
  if (fs.existsSync(localFontFilePath) || fs.existsSync(userFontFilePath)) return

  fetch(downloadUrl)
    .then(response => response.text())
    .then(text => fs.writeFileSync(localFontFilePath, text, 'binary'))
    .catch(err => UI.message(`Could not install font: ${ err }`))
}

// OnRun
export default (context) => {
  const families = getFamilies(context)

  // Prompt font selection
  const alert = createPrompt('Select a font to install', [ 'Install', 'Cancel' ])
  const select = createSelect(alert, pluck(families, 'family'), 0, 0)
  const responseCode = alert.present(select.yPos)

  // Handle Install button response
  if (responseCode === 1000) {
    const selected = families[select.view.indexOfSelectedItem()]

    // Don't install if the font family exists
    if (isFontInstalled(selected.name)) {
      return UI.message(`${ selected.name } is already installed!`)
    }

    UI.message(`Installing ${ selected.name } ...`)
    const installed = Object.entries(selected.variants).map(installFont)
    context.document.reloadInspector()
    UI.message(`${ installed.length } variants of ${ selected.name } was successfully installed!`)
  }
}
