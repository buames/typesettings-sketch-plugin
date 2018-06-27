import Typesettings from './Typesettings'
import { preferences, getMSTextLayers } from './utilities'

export function onSelectionFinish (context) {
  if (preferences.allowsAutoKerning || preferences.allowsAutoLineHeight) {
    const selection = getMSTextLayers(context.actionContext.oldSelection)

    selection.forEach(layer => {
      const settings = Typesettings.fetch(context, layer)

      if (!settings) return

      if (preferences.allowsAutoKerning) {
        layer.setCharacterSpacing(settings.characterSpacing || null)
      }

      if (preferences.allowsAutoLineHeight) {
        const yPos = layer.absoluteRect().rulerY()
        layer.setLineHeight(settings.lineHeight || null)
        layer.absoluteRect().setRulerY(yPos)
      }
    })
	}
}
