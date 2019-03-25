import fs from '@skpm/fs'
import {
  getLetterCasing,
  getStyleOfFont,
  getWeightOfFont
} from 'plugin/utils/fonts'
import { MIN_VERSION, preferences } from './storage'

const filePath = (fontFamily) => {
  const fileName = `${ fontFamily.replace(/\s/g, '') }.json`

  const pluginDefinedDirectory = `${ preferences.pluginDefinedDirectory }/${ fileName }`
  if (fs.existsSync(pluginDefinedDirectory)) {
    return pluginDefinedDirectory
  }

  // If the user defined directory path already includes the home path,
  // we don't want to prepend it or its not going to work correctly
  const userDirPath = `${ preferences.userDefinedDirectory }/${ fileName }`

  if (userDirPath.includes(String(NSHomeDirectory()))) {
    return userDirPath
  }

  return `${ NSHomeDirectory() }/${ userDirPath }`
}

export const transform = (textLayer) => {
  console.log(textLayer)
  const layer = textLayer.sketchObject || textLayer
  const attrs = layer.style().textStyle().attributes()

  return {
    fontFamily: String(attrs.NSFont.familyName()),
    fontName: String(attrs.NSFont.fontName()),
    fontDisplayName: String(attrs.NSFont.displayName()),
    fontPostscriptName: String(layer.fontPostscriptName()),
    fontSize: Number(layer.fontSize()),
    fontStyle: String(getStyleOfFont(attrs.NSFont)),
    fontWeight: Number(getWeightOfFont(attrs.NSFont)),
    casing: getLetterCasing(attrs),
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
    fontWeight: textLayer.fontWeight,
    fontStyle: textLayer.fontStyle,
    sources: {
      locals: [
        textLayer.fontDisplayName,
        textLayer.fontPostscriptName
      ]
    },
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
let typesettings = null
const fetch = (context, layer) => {
  const {
    fontFamily,
    fontSize,
    fontName,
    casing
  } = transform(layer)

  if (!typesettings || (typesettings.family !== fontFamily)) {
    const file = filePath(fontFamily)

    if (!fs.existsSync(file)) {
      return 'There are no registered typesettings for the text layer.'
    }

    try {
      typesettings = JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch (err) {
      return err
    }
  }

  const version = context.plugin.version().UTF8String()
  const { compatibleVersion } = typesettings

  // Check if the settings are compatible
  // (v0.0.2 and below will not have a compatibleVersion)
  if (!compatibleVersion || compatibleVersion < Number(MIN_VERSION)) {
    if (!typesettings[fontName]
      || !typesettings[fontName][fontSize]
      || !typesettings[fontName][fontSize][casing]) {
      return 'No typesettings registered for the current casing and font size.'
    }
    return typesettings[fontName][fontSize][casing]
  }

  // Check if plugin is out of date and incompatible with a newer typesettings version
  if (compatibleVersion && compatibleVersion > version) {
    return 'Your plugin is out of date. Please update to the latest version of Typesettings.'
  }

  // Latest Version
  if (compatibleVersion && compatibleVersion <= version) {
    if (
      !typesettings[fontName]
      || !typesettings[fontName][casing]
      || !typesettings[fontName][casing][fontSize]
    ) {
      return 'No typesettings registered for the current casing and font size.'
    }
    return typesettings[fontName][casing][fontSize]
  }

  return 'There are no registered typesettings for the text layer.'
}

const setType = (layer, settings, opts) => {
  const { kern, lineHeight } = opts

  if (kern) {
    layer.setCharacterSpacing(settings.characterSpacing)
  }

  if (lineHeight) {
    // Set the line height before the paragraph spacing so we know we always have an
    // NSParagraphStyle. In the rare case where you have a null value line height + paragraph
    // spacing this prevents a setParagraphSpacing is undefined
    layer.setLineHeight(settings.lineHeight)

    layer.style().textStyle().attributes().NSParagraphStyle
      .setParagraphSpacing(settings.paragraphSpacing)
  }
}

const Typesetter = {
  filePath,
  transform,
  toVariant,
  fetch,
  setType
}

export default Typesetter
