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
  const fontNames = pluck(textLayers, 'fontName')

  // Create the typesettings for each font family
  const typesettings = fontFamilies.map(family => {
    const obj = { }
    textLayers
      .filter((layer) => layer.fontFamily === family)
      .map(layer => {
        obj[layer.fontName] = obj[layer.fontName] || { }
        obj[layer.fontName][layer.fontSize] = obj[layer.fontName][layer.fontSize] || layer.metrics
        obj[layer.fontName][layer.fontSize][layer.casing] = obj[layer.fontName][layer.fontSize][layer.casing] || layer.spacings
      })

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
