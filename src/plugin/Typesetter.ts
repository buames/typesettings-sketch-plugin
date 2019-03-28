import fs from '@skpm/fs'
import sketch from 'sketch'
import { Text } from 'sketch/dom'
// import {
//   getLetterCasing,
//   getStyleOfFont,
//   getWeightOfFont
// } from 'plugin/utils/fonts'
import { MIN_VERSION, preferences } from './storage'

const getFilepath = (fontFamily: string) => {
  const fileName = `${ fontFamily.replace(/\s/g, '') }.json`

  const pluginDefinedDirectory = `${ preferences.pluginDefinedDirectory }/${ fileName }`

  if (fs.existsSync(pluginDefinedDirectory)) {
    return pluginDefinedDirectory
  }

  // If the user defined directory path already includes the home path,
  // we don't want to prepend it or its not going to work correctly
  const userDirPath = `${ preferences.userDefinedDirectory }/${ fileName }`

  if (userDirPath.includes(NSHomeDirectory())) {
    return userDirPath
  }

  return `${ NSHomeDirectory() }/${ userDirPath }`
}

// export const getSketchStyles = (textLayer: Text) => {
//   const layer = textLayer.sketchObject || textLayer
//   const attrs =
//   return {
//     fontName: String(attrs.NSFont.fontName()),
//     fontDisplayName: String(attrs.NSFont.displayName()),
//     fontPostscriptName: String(layer.fontPostscriptName()),
//     characterSpacing: layer.characterSpacing()
//       ? Number(layer.characterSpacing())
//       : layer.characterSpacing(),
//   }
// }

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

const getSketchTextStyles = (layer: Text) => {
  const { style } = layer
  return {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    fontStyle: style.fontStyle,
    fontVariant: style.fontVariant,
    fontStretch: style.fontStretch,
    kerning: style.kerning,
    textStrikethrough: style.textStrikethrough,
    textTransform: style.textTransform,
    textUnderline: style.textUnderline,
    paragraphSpacing: style.paragraphSpacing,
    verticalAlignment: style.verticalAlignment,
    lineHeight: style.lineHeight
  }
}

// Returns typesettings for a given text layer
let typesettings = null
const fetch = (layer: Text) => {
  const styles = getSketchTextStyles(layer)
  const filepath = getFilepath(styles.fontFamily)

  if (!typesettings || (typesettings && typesettings.fontFamily !== styles.fontFamily)) {
    if (!filepath) {
      return 'There are no registered typesettings for the text layer.'
    }

    try {
      typesettings = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    } catch (err) {
      return err
    }
  }

  const version = sketch.version.sketch
  const apiVersion = sketch.version.api
  const { compatibleVersion } = typesettings

  // v0.0.2 and below will not have a compatibleVersion
  if (!compatibleVersion) {
    return 'Your typesettings not compatible. You\'ll need to re-register you typesettings.'
  }

  // Check if the settings are compatible.
  // Case 1: v0.2.0 typesettings.json shape changed in plugin v0.3.0, so my typesettings are outdated
  if (!compatibleVersion || compatibleVersion < Number(MIN_VERSION)) {
    console.log('sketchVersion =', version)
    console.log('compatibleVersion =', compatibleVersion)
    return 'Your typesettings not compatible. You\'ll need to re-register you typesettings.'
  }

  // Check for older typesettings shape version
  if (!compatibleVersion || compatibleVersion === Number(MIN_VERSION)) {
    console.log('Found older typesettings shape version')
    console.log('> sketchVersion =', version)
    console.log('> compatibleVersion =', compatibleVersion)

    // if (
    //   !typesettings[String(layer.sketchObject.style().textStyle().attributes().NSFont.fontName())]
    //   || !typesettings[fontName][casing]
    //   || !typesettings[fontName][casing][fontSize]
    // ) {
    //   return 'No typesettings registered for the current casing and font size.'
    // }
    // return typesettings[fontName][casing][fontSize]

  }

  // Check if the typesettings version is incompatible bc the plugin is too old
  if (compatibleVersion && compatibleVersion > version) {
    console.log('Typesettings version is incompatible bc the plugin is too old')
    console.log('> sketchVersion =', version)
    console.log('> compatibleVersion =', compatibleVersion)
    return 'Your plugin is out of date. Please update to the latest version of Typesettings.'
  }

  // Latest Version
  // if (compatibleVersion && compatibleVersion <= version) {
  //   if (
  //     !typesettings[styles.fontFamily]
  //     || !typesettings[styles.fontFamily].variants
  //     // TODO: Need to try to 'pluck' the variant object to check if the casing + size exists
  //     // || !typesettings[fontName][casing]
  //     // || !typesettings[fontName][casing][fontSize]
  //   ) {
  //     return 'No typesettings registered for the current casing and font size.'
  //   }
  //   return typesettings[fontName][casing][fontSize]
  // }

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
  getFilepath,
  // transform,
  getSketchTextStyles,
  toVariant,
  fetch,
  setType
}

export default Typesetter
