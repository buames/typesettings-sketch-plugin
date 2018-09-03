import UI from 'sketch/ui'
import fs from '@skpm/fs'
import { MIN_VERSION, preferences } from './storage'

const TEXT_TRANSFORM = {
  0: 'normalcase',
  1: 'uppercase',
  2: 'lowercase'
}

const filePath = (fontFamily) => {
  const fileName = `${ fontFamily.replace(/\s/g, '') }.json`
  const pluginDefinedDirectory = `${ NSHomeDirectory() }/${ preferences.pluginDefinedDirectory }/${ fileName }`

  if (fs.existsSync(pluginDefinedDirectory)) {
    return pluginDefinedDirectory
  }

  return `${ NSHomeDirectory() }/${ preferences.userDefinedDirectory }/${ fileName }`
}

const transform = (textLayer) => {
  const layer = textLayer.sketchObject || textLayer
  const attrs = layer.style().textStyle().attributes()
  return {
    fontFamily: String(attrs.NSFont.familyName()),
    fontName: String(attrs.NSFont.fontName()),
    fontDisplayName: String(attrs.NSFont.displayName()),
    fontPostscriptName: String(layer.fontPostscriptName()),
    fontSize: Number(layer.fontSize()),
    casing: TEXT_TRANSFORM[attrs.MSAttributedStringTextTransformAttribute || 0],
    characterSpacing: layer.characterSpacing()
      ? Number(layer.characterSpacing())
      : layer.characterSpacing(),
    lineHeight: Number(layer.lineHeight()),
    paragraphSpacing: Number(attrs.NSParagraphStyle.paragraphSpacing())
  }
}

const toVariant = textLayer => ({
  [textLayer.fontName]: {
    fontFamily: textLayer.fontFamily,
    fontName: textLayer.fontName,
    fontDisplayName: textLayer.fontDisplayName,
    fontPostscriptName: textLayer.fontPostscriptName,
    [textLayer.casing]: {
      [textLayer.fontSize]: {
        characterSpacing: textLayer.characterSpacing,
        lineHeight: textLayer.lineHeight,
        paragraphSpacing: textLayer.paragraphSpacing
      }
    }
  }
})

// Returns typesettings for a given text layer
let storage = null
const fetch = (context, layer) => {
  const {
    fontFamily,
    fontSize,
    fontName,
    casing
  } = transform(layer)

  if (!storage || (storage.family !== fontFamily)) {
    const file = filePath(fontFamily)
    if (!fs.existsSync(file)) return
    storage = JSON.parse(fs.readFileSync(file, 'utf8'))
  }

  const version = context.plugin.version().UTF8String()
  const { compatibleVersion } = storage

  // Check if the settings are compatible
  // (v0.0.2 and below will not have a compatibleVersion)
  if (!compatibleVersion || compatibleVersion < Number(MIN_VERSION)) {
    if (!storage[fontName]
      || !storage[fontName][fontSize]
      || !storage[fontName][fontSize][casing]) {
      return
    }
    log('You should re-register your typesettings using the latest version of the Typesettings plugin.')
    return storage[fontName][fontSize][casing]
  }

  // Check if plugin is out of date and incompatible with a newer typesettings version
  if (compatibleVersion && compatibleVersion > version) {
    UI.message('Your plugin is out of date. Please update to the latest version of Typesettings.')
    return
  }

  // Latest Version
  if (compatibleVersion && compatibleVersion <= version) {
    if (!storage[fontName]
    || !storage[fontName][casing]
    || !storage[fontName][casing][fontSize]) {
      return
    }
    return storage[fontName][casing][fontSize]
  }
}

const Typesetter = {
  filePath,
  transform,
  toVariant,
  fetch
}

export default Typesetter
