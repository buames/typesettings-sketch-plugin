import UI from 'sketch/ui'
import fs from '@skpm/fs'
import merge from 'deepmerge'
import {
  getJSTextLayers,
  pluck
} from './utilities'
import TextLayer from './TextLayer'
import Typesettings from './Typesettings'

const getLastYPosition = (view, spacing = 0) => (
  view.subviews().lastObject() ?
    CGRectGetMaxY(view.subviews().lastObject().frame()) + spacing : 0
)

const promptForFontUrls = (fontNames) => {
  const alertContent = NSView.alloc().init()
  alertContent.setFlipped(true)

  fontNames.forEach((fontName, index) => {
    const fontNameInput = NSTextField.alloc().init()
    fontNameInput.setFrame(NSMakeRect(0, getLastYPosition(alertContent, 4), 300, 24))
    fontNameInput.setPlaceholderString(fontName)
    fontNameInput.tag = index
    alertContent.addSubview(fontNameInput)
  })

  alertContent.frame = NSMakeRect(0,0, 300, getLastYPosition(alertContent, 24))

  const alert = COSAlertWindow.new()
  alert.setMessageText('Add download urls')
  alert.addButtonWithTitle('Add')
  alert.addButtonWithTitle('Skip')
  alert.addAccessoryView(alertContent)

    // Open dialog and skip if skip is clicked
  if (alert.runModal() != NSAlertFirstButtonReturn) return

  const urls = { }
  alertContent.subviews().forEach((input, index) => {
    if (input.stringValue() == '') return
    urls[fontNames[index]] = String(input.stringValue())
  })

  // Only return the urls obj if there is something to return
  if (Object.keys(urls).length > 0) {
    return urls
  }
}

export default (context) => {
  const selection = getJSTextLayers(context.selection)

  if (selection.length === 0) {
    return UI.message('You need to select atleast 1 text layer')
  }

  // Process the text layers
  const textLayers = selection.map(TextLayer.raw)

  // Get all of the font families from the text layers
  const fontFamilies = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = fontFamilies.map(family => {

    // Create the typesettings for each family + size + casing
    const variants = textLayers .filter((textLayer) => textLayer.fontFamily === family)

    const settings = merge.all(variants.map(TextLayer.transform))

    // Get all of the font names from the variants and prompt for download urls
    const fontNames = pluck(variants, 'fontName')
    const fontUrls = promptForFontUrls(fontNames)

    return {
      family,
      settings,
      urls: fontUrls,
    }
  })

  // Save the typesettings and update the directory
  const done = typesettings.map(ts => {

    // Save / update the typesettings
    Typesettings.save(ts)

    // Update the families.json file if there were download urls provided
    Typesettings.registerFamily(ts)

    return `Exported ${ ts.family } typesettings`
  })
  
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
