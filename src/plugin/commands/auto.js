import Typesetter from 'plugin/Typesetter'
import { preferences } from 'plugin/storage'
import { getMSTextLayers } from 'plugin/utils/helpers'

export const onSelectionFinish = (context) => {
  const {
    allowsAutoKerning,
    allowsAutoLineHeight,
    ignorePrefix,
    ignoreSuffix
  } = preferences

  if (allowsAutoKerning || allowsAutoLineHeight) {
    const selection = getMSTextLayers(context.actionContext.oldSelection)

    selection.forEach((layer) => {
      // If the layer name matches the ignore prefix or suffix, bail
      const name = layer.name()
      if (name.hasPrefix(ignorePrefix) || name.hasSuffix(ignoreSuffix)) {
        return
      }

      // Get the typesettings for the given layer
      const settings = Typesetter.fetch(context, layer)

      if (typeof settings === 'string') {
        return
      }

      // If we don't have settings, bail
      if (settings && settings.length === 0) {
        return
      }

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

export default onSelectionFinish
