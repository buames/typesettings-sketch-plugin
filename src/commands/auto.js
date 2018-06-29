import Typesetter from '../Typesetter'
import { preferences } from '../storage'
import { getMSTextLayers } from '../utils/helpers'

export const onSelectionFinish = context => {
  const {
    allowsAutoKerning,
    allowsAutoLineHeight,
    ignorePrefix,
    ignoreSuffix
  } = preferences

  if (allowsAutoKerning || allowsAutoLineHeight) {
    const selection = getMSTextLayers(context.actionContext.oldSelection)

    selection.forEach(layer => {

      // If the layer name matches the ignore prefix or suffix, bail
      const name = layer.name()
      if (name.hasPrefix(ignorePrefix) || name.hasSuffix(ignoreSuffix)) return

      // Get the typesettings for the given layer
      const settings = Typesetter.fetch(context, layer)
  
      // If we don't have settings, bail
      if (!settings) return
  
      // If auto character spacing is allowed, set it
      if (allowsAutoKerning) {
        layer.setCharacterSpacing(settings.characterSpacing)
      }
  
      // If auto line height is allowed, set it
      // and try to keep the y position the same because it's
      // annoying when the layers moves when changing the line height
      if (allowsAutoLineHeight) {
        const yPos = layer.absoluteRect().rulerY()
        layer.setLineHeight(settings.lineHeight)
        layer.absoluteRect().setRulerY(yPos)
      }
    })
  }
}