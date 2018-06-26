import fs from '@skpm/fs'
import merge from 'deepmerge'
import { storage, getFontFamiliesDirectory } from './utilities'

// Create the typesettings
const create = variants => merge.all(
  variants.map(variant => ({
    [variant.fontName]: {
      fontFamily: variant.fontFamily,
      fontName: variant.fontName,
      fontDisplayName: variant.fontDisplayName,
      fontPostscriptName: variant.fontPostscriptName,
      [variant.casing]: {
        [variant.fontSize]: {
          characterSpacing: variant.characterSpacing,
          lineHeight: variant.lineHeight,
          paragraphSpacing: variant.paragraphSpacing
        }
      }
    }
  }))
)

// Save or update settings
const save = ({ family, settings }) => {
  const filePath = storage(family)
  const newSettings = {
    family,
    ...settings,
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
  create,
  save,
  registerFamily
}

export default Typesettings
