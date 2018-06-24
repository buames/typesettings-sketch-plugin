import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import {
  getTextLayers,
  getTypesettingForTextLayer
} from './utilities'

export default (context) => {
  const storage = null
  const counter = { set: 0, skipped: 0 }
  const selection = sketch.getSelectedDocument().selectedLayers.layers
  const textLayers = getTextLayers(selection)

  if (typeof textLayers === 'string') {
    return UI.message(textLayers)
  }

  textLayers.forEach(textLayer => {
    const settings = getTypesettingForTextLayer(storage, textLayer)

    if (!settings) {
      return counter.skipped++
    }

    const yPos = textLayer.sketchObject.absoluteRect().rulerY()
    textLayer.sketchObject.setLineHeight(settings.lineHeight || null)
    textLayer.sketchObject.absoluteRect().setRulerY(yPos)
    counter.set++
  })

  UI.message(`Set: ${ counter.set }, Skipped: ${ counter.skipped }`)
}