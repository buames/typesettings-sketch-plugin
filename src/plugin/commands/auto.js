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

      Typesetter.setType(layer, settings, {
        kern: allowsAutoKerning,
        lineHeight: allowsAutoLineHeight
      })
    })
  }
}

export default onSelectionFinish
