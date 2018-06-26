import fs from '@skpm/fs'
import merge from 'deepmerge'
import TextLayer from './TextLayer'
import { getTypesettingsFilePath, getFontFamiliesDirectory } from './utilities'

let storage = null

const fetchFamilySettings = fontFamily => {
  const filePath = getTypesettingsFilePath(fontFamily)
  if (!fs.existsSync(filePath)) return
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

// Returns typesettings for a given text layer
const fetch = (layer, pluginVersion) => {
  const { fontFamily, fontSize, fontName, casing } = TextLayer.raw(layer)

  if (!storage || (storage.family !== fontFamily)) {
    storage = fetchFamilySettings(fontFamily)
  }

  // Current Version
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

// Save or update settings
const save = ({ family, settings }, pluginVersion) => {
  const filePath = getTypesettingsFilePath(family) // rename family to fontFamily or something consistent
  const newSettings = {
    family,
    ...settings,
    compatibleVersion: pluginVersion.UTF8String(),
    lastUpdated: new Date().toISOString()
  }

  // Update the typesettings it they exists
  if (fs.existsSync(filePath)) {
    const currSettings = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const updatedSettings = merge(currSettings, newSettings)
    fs.writeFileSync(filePath, JSON.stringify(updatedSettings))
    return filePath
  }

  // Write out the settings since they do not exists
  fs.writeFileSync(filePath, JSON.stringify(newSettings))
  return filePath
}

const registerFamily = ({ family, urls }) => {
  const filePath = getFontFamiliesDirectory()
  const newSettings = {
    family,
    fonts: urls,
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
  save,
  registerFamily
}

export default Typesettings
