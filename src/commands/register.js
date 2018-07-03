import UI from 'sketch/ui'
import fs from '@skpm/fs'
import merge from 'deepmerge'
import Typesetter from '../Typesetter'
import { MIN_VERSION } from '../storage'
import { getJSTextLayers, pluck } from '../utils/helpers'

export default (context) => {
  const selection = getJSTextLayers(context.selection)

  if (selection.length === 0) {
    return UI.message('You need to select atleast 1 text layer')
  }

  const version = context.plugin.version().UTF8String()
  const lastUpdated = new Date().toISOString()
  const textLayers = selection.map(Typesetter.transform)

  // Get all of the selected font families
  const families = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = families.map((family) => {
    const fonts = textLayers.filter(layer => layer.fontFamily === family)
    const variants = merge.all(fonts.map(Typesetter.toVariant))
    return {
      family,
      ...variants,
      lastUpdated,
      version, // plugin version used to register typesettings
      compatibleVersion: MIN_VERSION // min plugin version to load typesettings
    }
  })

  // Replace or update the typesettings
  const done = typesettings.map((settings) => {
    const filePath = Typesetter.filePath(settings.family)

    if (fs.existsSync(filePath)) {
      const currSettings = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const { compatibleVersion } = currSettings

      // Check if plugin is out of date and incompatible with a newer typesettings version
      if (compatibleVersion && compatibleVersion > version) {
        return UI.message('Your plugin is out of date. Please update to the latest version of Typesettings.')
      }

      // Check if the existing settings are compatible and override if not
      // (v0.0.2 and below will not have a compatibleVersion)
      if (!compatibleVersion || compatibleVersion < Number(MIN_VERSION)) {
        const alert = COSAlertWindow.new()
        alert.setMessageText(`Replace All ${ settings.family } Typesettings`)
        alert.setInformativeText(`Your typesettings have an incompatible version. Continuing will replace all typesettings for ${ settings.family }.`)
        alert.addButtonWithTitle('Continue')
        alert.addButtonWithTitle('Cancel')
        const response = alert.runModal()

        if (response === 1001) return 'Nothing saved'

        if (response === 1000) {
          fs.writeFileSync(filePath, JSON.stringify(settings))
          return `Replaced ${ settings.family } typesettings`
        }
      }

      // Latest Version
      const alert = COSAlertWindow.new()
      alert.setMessageText('Typesettings Exists')
      alert.setInformativeText('Do you want to merge or replace current typesettings?')
      alert.addButtonWithTitle('Merge')
      alert.addButtonWithTitle('Replace')
      alert.addButtonWithTitle('Cancel')
      const response = alert.runModal()

      // Cancel clicked
      if (response === 1002) return 'Nothing saved'

      // Replace clicked
      if (response === 1001) {
        fs.writeFileSync(filePath, JSON.stringify(settings))
        return `Replaced ${ settings.family } typesettings`
      }

      // Merge clicked
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
