import UI from 'sketch/ui'
import { Context } from 'sketch'
import dom, { AllLayers } from 'sketch/dom'
import fs from '@skpm/fs'
import dialog from '@skpm/dialog'
import merge from 'deepmerge'
import Typesetter from 'plugin/Typesetter'
import { MIN_VERSION } from 'plugin/storage'
import { pluck, getVersion } from 'plugin/utils/helpers'

const mergeOptions = {
  // eslint-disable-next-line
  arrayMerge: (_: any, sourceArray) => sourceArray
}

export default (context: Context) => {
  const document = dom.getSelectedDocument()
  const selection = document.selectedLayers.layers

  if (selection.length === 0) {
    return UI.message('You need to select atleast 1 text layer')
  }

  const version = getVersion(context)
  const textLayers = selection.map(Typesetter.getSketchTextStyles)

  // Get all of the selected font families from the styles obj
  const families = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = families.map((family) => {
    const fonts = textLayers.filter(layer => layer.fontFamily === family)

    console.log(fonts)

    // const variants = merge.all(fonts.map(Typesetter.toVariant), mergeOptions)
    // return {
    //   family,
    //   ...variants,
    //   lastUpdated: new Date().toISOString(), // last date that the { typesettings }.json were saved
    //   pluginVersion: version.plugin,
    //   sketchAppVersion: version.sketch,
    //   sketchApiVersion: version.api,
    //   compatibleVersion: version.compatibleVersion
    // }
  })

  // // Replace or update the typesettings
  // const done = typesettings.map((settings) => {
  //   const filePath = Typesetter.filePath(settings.family)

  //   if (fs.existsSync(filePath)) {
  //     const currSettings = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  //     const { compatibleVersion } = currSettings
  //     let status = ''

  //     // Check if plugin is out of date and incompatible with a newer typesettings version
  //     if (compatibleVersion && compatibleVersion > version) {
  //       status = 'Your plugin is out of date. Please update to the latest version of Typesettings.'
  //     }

  //     // Check if the existing settings are compatible and override if not
  //     // (v0.0.2 and below will not have a compatibleVersion)
  //     if (!compatibleVersion || compatibleVersion < Number(MIN_VERSION)) {
  //       dialog.showMessageBox({
  //         message: `Incompatible Typesetting Versions for ${ settings.family }`,
  //         detail: `Your typesettings were created with an incompatible version of the Typesettings plugin. Would you like to replace all typesettings for ${ settings.family }?`,
  //         buttons: [ 'Replace', 'Cancel' ]
  //       }, ({ response }) => {
  //         if (response === 1) {
  //           status = 'Nothing saved'
  //         }

  //         if (response === 0) {
  //           fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))
  //           status = `Replaced ${ settings.family } typesettings`
  //         }
  //       })
  //     } else {
  //       // Latest Version
  //       dialog.showMessageBox({
  //         message: `Typesettings Exists for ${ settings.family }`,
  //         detail: `Do you want to merge or replace current typesettings for ${ settings.family }?`,
  //         buttons: [ 'Merge', 'Replace', 'Cancel' ]
  //       }, ({ response }) => {
  //         // Cancel clicked
  //         if (response === 2) {
  //           status = 'Nothing saved'
  //         }

  //         // Replace clicked
  //         if (response === 1) {
  //           fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))
  //           status = `Replaced ${ settings.family } typesettings`
  //         }

  //         if (response === 0) {
  //           // Merge clicked
  //           const updatedSettings = merge(currSettings, settings, mergeOptions)
  //           fs.writeFileSync(filePath, JSON.stringify(updatedSettings, null, 2))
  //           status = `Updated ${ settings.family } typesettings`
  //         }
  //       })
  //     }

  //     return status
  //   }

  //   // Typesettings for not exists. Let's write them all out.
  //   fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))

  //   return `Registered ${ settings.family } typesettings`
  // })

  // const msg = (done.length === 1)
  //   ? done.join('')
  //   : `Registered typesettings for ${ done.length } fonts`

  // return UI.message(msg)
}
