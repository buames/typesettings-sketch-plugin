import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import fs from '@skpm/fs'
import {
  getTextLayers,
  process,
  pluck,
  createPrompt,
  storage, // rename
  getFontFamiliesDirectory
} from './utilities'

export default (context) => {
  const selection = sketch.getSelectedDocument().selectedLayers.layers
  const selectedTextLayers = getTextLayers(selection)

  if (typeof selectedTextLayers === 'string') {
    return UI.message(selectedTextLayers)
  }

  // Process the text layers
  const textLayers = selectedTextLayers.map(process)

  // Get all of the font families from the text layers
  const fontFamilies = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = fontFamilies.map(family => {
    const obj = { }

    // Create the typesettings for each family + size + casing
    const layers = textLayers .filter((layer) => layer.fontFamily === family)
    layers.map(layer => {
      obj[layer.fontName] = obj[layer.fontName] || { }

      obj[layer.fontName][layer.fontSize] = obj[layer.fontName][layer.fontSize] || {
        fontFamily: layer.fontFamily,
        fontName: layer.fontName,
        fontDisplayName: layer.fontDisplayName,
        fontPostscriptName: layer.fontPostscriptName,
        fontSize: layer.fontSize
      }

      obj[layer.fontName][layer.fontSize][layer.casing] = obj[layer.fontName][layer.fontSize][layer.casing] || {
        characterSpacing: layer.characterSpacing,
        lineHeight: layer.lineHeight,
        paragraphSpacing: layer.paragraphSpacing
      }
    })

    // Store the each of the font names. Later, this will become download links
    const variants = { }
    const fontNames = pluck(layers, 'fontName')

    const alert = createPrompt('Add download urls', [ 'Continue', 'Skip' ])
    const responseCode = alert.present(0)

    // if (responseCode === 1000) {
    //   fontNames.forEach(fontName => {
    //     variants[fontName] = ''
    //   })
    // }

    const lastUpdated = new Date().toISOString()

    return {
      directory: {
        family,
        variants,
        lastUpdated
      },
      settings: {
        family,
        ...obj,
        lastUpdated,
      }
    }
  })

  // Save the typesettings and update the directory
  const done = typesettings.map(ts => {
    const settingsFilePath = storage(ts.settings.family)
    const directoryFilePath = getFontFamiliesDirectory()
    fs.writeFileSync(settingsFilePath, JSON.stringify(ts.settings))
    fs.writeFileSync(directoryFilePath, JSON.stringify(ts.directory))
    return `Exported ${ ts.settings.family } typesettings`
  })
  
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
