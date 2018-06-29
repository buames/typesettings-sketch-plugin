import UI from 'sketch/ui'
import Typesetter from '../Typesetter'
import { getMSTextLayers } from '../utils/helpers'

const typeset = (context, opts) => {
  const { setCharacterSpacing, setLineHeight } = opts
  const selection = getMSTextLayers(context.selection)

  if (selection.length === 0) {
    return 'You need to select atleast 1 text layer'
  }

  const counter = { set: 0, skipped: 0 }

  selection.forEach(layer => {
    const settings = Typesetter.fetch(context, layer)

    if (!settings) return counter.skipped++

    if (setCharacterSpacing) {
      layer.setCharacterSpacing(settings.characterSpacing)
    }

    if (setLineHeight) {
      const yPos = layer.absoluteRect().rulerY()
      layer.setLineHeight(settings.lineHeight)
      layer.absoluteRect().setRulerY(yPos)
    }
    counter.set++
  })

  // Reload and return the count
  context.document.reloadInspector()
  return `Set: ${ counter.set }, Skipped: ${ counter.skipped }`
}

// onRun Typset Character Spacing
export const onSetCharacterSpacing = context => {
  const done = typeset(context, {
    setCharacterSpacing: true,
    setLineHeight: false
  })
  UI.message(done)
}

// onRun Typset Line Height
export const onSetLineHeight = context => {
  const done = typeset(context, {
    setCharacterSpacing: false,
    setLineHeight: true
  })
  UI.message(done)
}
