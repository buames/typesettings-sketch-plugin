import UI from 'sketch/ui'
import dom, { AllLayers, ShapePath, Text } from 'sketch/dom'
import Typesetter from 'plugin/Typesetter'

const is = {
  textLayer: (layer: AllLayers): layer is Text => layer.type === 'Text',
  shapePath: (layer: AllLayers): layer is ShapePath => layer.type === 'ShapePath'
}

const typeset = (opts) => {
  // const { setCharacterSpacing, setLineHeight } = opts
  const counter = { set: 0, skipped: 0 }
  const document = dom.getSelectedDocument()
  const selection = document.selectedLayers.layers

  if (selection.length === 0) {
    return 'You need to select atleast 1 text layer'
  }

  selection.forEach((layer: AllLayers) => {
    if (is.textLayer(layer)) {
      const settings = Typesetter.fetch(layer)

      if (settings === 'string') {
        counter.skipped += 1
        UI.message(settings)
        return
      }

      if (settings.typesettings && settings.typesettings.length === 0) {
        counter.skipped += 1
        return
      }

      //   Typesetter.setType(layer, settings, {
      //     kern: setCharacterSpacing,
      //     lineHeight: setLineHeight
      //   })
      //   counter.set += 1
      // })

      // // Reload and return the count
      // context.document.reloadInspector()

      // if (counter.set === 0 && counter.skipped > 0) {
      //   return 'There are no registered typesettings for the text layer.'
      // }
    }

    counter.skipped += 1
  })

  return `Set: ${ counter.set }, Skipped: ${ counter.skipped }`
}

// onRun Typset Character Spacing
export const onSetCharacterSpacing = () => {
  const done = typeset({
    setCharacterSpacing: true,
    setLineHeight: false
  })

  UI.message(done)
}

// // onRun Typset Line Height
// export const onSetLineHeight = (context) => {
//   const done = typeset(context, {
//     setCharacterSpacing: false,
//     setLineHeight: true
//   })
//   UI.message(done)
// }
