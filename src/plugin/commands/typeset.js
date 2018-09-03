import UI from 'sketch/ui'
import Typesetter from 'plugin/Typesetter'
import { getMSTextLayers } from 'plugin/utils/helpers'

const typeset = (context, opts) => {
  const { setCharacterSpacing, setLineHeight } = opts
  const selection = getMSTextLayers(context.selection)

  if (selection.length === 0) {
    return 'You need to select atleast 1 text layer'
  }

  const counter = { set: 0, skipped: 0 }

  selection.forEach((layer) => {
    const settings = Typesetter.fetch(context, layer)

    if (typeof settings === 'string') {
      counter.skipped += 1
      UI.message(settings)
      return
    }

    if (settings && settings.length === 0) {
      counter.skipped += 1
      return
    }

    Typesetter.setType(layer, settings, {
      kern: setCharacterSpacing,
      lineHeight: setLineHeight
    })
    counter.set += 1
  })

  // Reload and return the count
  context.document.reloadInspector()

  if (counter.set === 0 && counter.skipped > 0) {
    return 'There are no registered typesettings for the text layer.'
  }

  return `Set: ${ counter.set }, Skipped: ${ counter.skipped }`
}

// onRun Typset Character Spacing
export const onSetCharacterSpacing = (context) => {
  const done = typeset(context, {
    setCharacterSpacing: true,
    setLineHeight: false
  })
  UI.message(done)
}

// onRun Typset Line Height
export const onSetLineHeight = (context) => {
  const done = typeset(context, {
    setCharacterSpacing: false,
    setLineHeight: true
  })
  UI.message(done)
}
