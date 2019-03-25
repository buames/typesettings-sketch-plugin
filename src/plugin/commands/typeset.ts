// import UI from 'sketch/ui'
import sketch, { Types } from 'sketch/dom'
import { transform } from 'plugin/Typesetter'

const is = {
  textLayer: (layer: any): layer is Types.Text => layer.type === Types.Text,
  shapePath: (layer: any): layer is Types.ShapePath => layer.type === Types.ShapePath,
}

const typeset = () => {
  // const { setCharacterSpacing, setLineHeight } = opts

  const document = sketch.getSelectedDocument()
  const selection = document.selectedLayers.layers

  if (selection.length === 0) {
    return 'You need to select atleast 1 text layer'
  }

  const counter = { set: 0, skipped: 0 }

  selection.forEach((layer) => {
    if (!is.textLayer(layer)) {
      counter.skipped += 1
      return
    }

    transform(layer)
    // log(transform(layer))
  })


  // selection.forEach((layer) => {
  //   const settings = Typesetter.fetch(context, layer)

  //   if (typeof settings === 'string') {
  //     counter.skipped += 1
  //     UI.message(settings)
  //     return
  //   }

  //   if (settings && settings.length === 0) {
  //     counter.skipped += 1
  //     return
  //   }

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

  return `Set: ${ counter.set }, Skipped: ${ counter.skipped }`
}

// onRun Typset Character Spacing
export const onSetCharacterSpacing = () => {
  const done = typeset()
  return done
  // const done = typeset(context, {
  //   setCharacterSpacing: true,
  //   setLineHeight: false
  // })
  // UI.message(done)
}

// // onRun Typset Line Height
// export const onSetLineHeight = (context) => {
//   const done = typeset(context, {
//     setCharacterSpacing: false,
//     setLineHeight: true
//   })
//   UI.message(done)
// }
