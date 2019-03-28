import { ActionContext, SelectionChanged } from 'sketch/actions'
// import Typesetter from 'plugin/Typesetter'
// import { preferences } from 'plugin/storage'

export const onSelectionFinish = (context: ActionContext<SelectionChanged>) => {
  // const {
  //   allowsAutoKerning,
  //   allowsAutoLineHeight,
  //   // ignorePrefix,
  //   // ignoreSuffix
  // } = preferences

  console.log('actionContext =', context.actionContext)
  return

  // if (allowsAutoKerning || allowsAutoLineHeight) {
  //   const selection = context.actionContext.oldSelection
  //   console.log(selection)

    // selection.forEach((layer) => {
    //   // If the layer name matches the ignore prefix or suffix, bail
    //   const name = layer.name()
    //   if (name.hasPrefix(ignorePrefix) || name.hasSuffix(ignoreSuffix)) {
    //     return
    //   }

    //   // Get the typesettings for the given layer
    //   const settings = Typesetter.fetch(layer)

    //   if (typeof settings === 'string') {
    //     return
    //   }

    //   // If we don't have settings, bail
    //   if (settings && settings.length === 0) {
    //     return
    //   }

    //   Typesetter.setType(layer, settings, {
    //     kern: allowsAutoKerning,
    //     lineHeight: allowsAutoLineHeight
    //   })
    // })
  // }
}

// export default onSelectionFinish
