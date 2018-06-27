import fs from '@skpm/fs'
import TextLayer from './TextLayer'
import {
  preferences,
  getTypesettingsFilePath,
  getFontFamiliesDirectory
} from './utilities'

let storage = null

const getFilePath = fontFamily => {
  const fileName = `${ fontFamily.replace(/\s/g, '') }.json`
  const pluginDefinedDirectory = `${ NSHomeDirectory() }/${ preferences.pluginDefinedDirectory }/${ fileName }`

  if (fs.existsSync(pluginDefinedDirectory)) {
    return pluginDefinedDirectory
  }

  return `${ NSHomeDirectory() }/${ preferences.userDefinedDirectory }/${ fileName }`
}

// Returns typesettings for a given text layer
const fetch = (context, layer) => {
  const { fontFamily, fontSize, fontName, casing } = TextLayer.transform(layer)

  if (!storage || (storage.family !== fontFamily)) {
    const filePath = getFilePath(fontFamily)
    if (!fs.existsSync(filePath)) return
    storage = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }

  // Current Version
  const pluginVersion = context.plugin.version()
  if (storage && storage.compatibleVersion >= pluginVersion.UTF8String()) {
    if (!storage[fontName] || !storage[fontName][casing] || !storage[fontName][casing][fontSize]) return
    return storage[fontName][casing][fontSize]
  }

  // Legacy: Version 0.0.2 and below
  if (storage && !storage.compatibleVersion) {
    if (!storage[fontName] || !storage[fontName][fontSize] || !storage[fontName][fontSize][casing]) return
    return storage[fontName][fontSize][casing]
  }
}

const registerFamily = ({ family, fontUrls }) => {
  const filePath = getFontFamiliesDirectory()
  const newSettings = {
    family,
    fonts: fontUrls,
    lastUpdated: new Date().toISOString()
  }

  try {
    const currSettings = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    // get the index
    const idx = currSettings.findIndex(cs => cs.family === family)

    // If the family already exists, update it
    if (idx !== -1) {
      currSettings[idx] = newSettings
    }

    // If the family exists but there are no fonts to download, bail it from the list
    if (idx !== -1 && !currSettings[idx].fonts) {
      currSettings.splice(idx, 1)
    }

    // Add the new font family since it does not exists
    if (idx === -1) {
      currSettings.push(newSettings)
    }

    fs.writeFileSync(filePath, JSON.stringify(currSettings))
    return filePath
  } catch (err) {
    log(`[ERROR] Typesettings.registerFamily\n${ err }\n`)
  }
}

const Typesettings = {
  fetch,
  getFilePath,
  registerFamily
}

export default Typesettings
