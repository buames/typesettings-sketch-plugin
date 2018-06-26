import UI from 'sketch/ui'
import Typesettings from './Typesettings'
import { getMSTextLayers } from './utilities'

export default (context) => {
  const counter = { set: 0, skipped: 0 }
  const selection = getMSTextLayers(context.selection)

  if (selection.length === 0) {
    return UI.message('You need to select atleast 1 text layer')
  }

  selection.forEach(layer => {
    const settings = Typesettings.fetch(layer)

    if (!settings) {
      return counter.skipped++
    }

    layer.setCharacterSpacing(settings.characterSpacing)
    counter.set++
  })

  UI.message(`Set: ${ counter.set }, Skipped: ${ counter.skipped }`)
}
