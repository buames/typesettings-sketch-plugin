import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import {
  getTextLayers,
  save,
  process,
  pluck
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
      const fontNames = pluck(layers, 'fontName')
      const fonts = { }
      fontNames.forEach(font => {
        fonts[font] = ''
      })

    return { family, fonts, ...obj }
  })

  // Save the typesettings
  const done = typesettings.map(save)
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
