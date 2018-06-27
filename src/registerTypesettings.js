import UI from 'sketch/ui'
import fs from '@skpm/fs'
import merge from 'deepmerge'
import TextLayer from './TextLayer'
import Typesettings from './Typesettings'
import {
  pluck,
  getJSTextLayers
} from './utilities'

export default (context) => {
  const selection = getJSTextLayers(context.selection)

  if (selection.length === 0) {
    return UI.message('You need to select atleast 1 text layer')
  }

  // Transform the text layers
  const layers = selection.map(TextLayer.transform)
  const compatibleVersion = context.plugin.version().UTF8String()
  const lastUpdated = new Date().toISOString()

  // Get all of the selected font families and create the typesettings for each
  const families = pluck(layers, 'fontFamily')

  const typesettings = families.map(family => {
    const fonts = layers .filter((layer) => layer.fontFamily === family)
    const variants = merge.all(fonts.map(TextLayer.toVariant))
    return { compatibleVersion, lastUpdated, family, ...variants }
  })

  // Save the typesettings and update the directory
  const done = typesettings.map(settings => {
    const filePath = Typesettings.getFilePath(settings.family)

    // Update the typesettings it they exists
    if (fs.existsSync(filePath)) {
      const currSettings = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const updatedSettings = merge(currSettings, settings)
      fs.writeFileSync(filePath, JSON.stringify(updatedSettings))
      return `Updated ${ settings.family } typesettings`
    }

    // Write out the settings since they do not exists
    fs.writeFileSync(filePath, JSON.stringify(settings))
    return `Created ${ settings.family } typesettings`
  })
  
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
