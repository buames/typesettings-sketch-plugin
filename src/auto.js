import sketch from 'sketch/dom'
import {
  preferences,
  getTypesettingForTextLayer
} from './utilities'

export function onSelectionFinish (context) {
  if (preferences.allowsAutoKerning || preferences.allowsAutoLineHeight) {
    const storage = null
    const selection = context.actionContext.oldSelection

    selection.forEach(layer => {
      const textLayer = sketch.fromNative(layer)
      if (textLayer.type === 'Text') {
        const settings = getTypesettingForTextLayer(storage, textLayer)

        if (!settings) return

        if (preferences.allowsAutoKerning) {
          textLayer.sketchObject.setCharacterSpacing(settings.characterSpacing || null)
        }

        if (preferences.allowsAutoLineHeight) {
          const yPos = textLayer.sketchObject.absoluteRect().rulerY()
          textLayer.sketchObject.setLineHeight(settings.lineHeight || null)
          textLayer.sketchObject.absoluteRect().setRulerY(yPos)
        }
      }
    })
	}
}
