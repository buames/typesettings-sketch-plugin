import UI from 'sketch/ui'
import merge from 'deepmerge'
import { getJSTextLayers, pluck } from './utilities'
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
  const textLayers = selection.map(TextLayer.transform)

  // Get all of the font families from the text layers
  const fontFamilies = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = fontFamilies.map(family => {

    // Create the typesettings for each family + size + casing
    const fonts = textLayers .filter((textLayer) => textLayer.fontFamily === family)

    const variants = merge.all(fonts.map(TextLayer.toVariant))

    // Get all of the font names from the variants and prompt for download urls
    const fontNames = pluck(fonts, 'fontName')
    const fontUrls = promptForFontUrls(fontNames)

    return {
      family,
      variants,
      fontUrls,
    }
  })

  // Save the typesettings and update the directory
  const done = typesettings.map(settings => {
    Typesettings.save(context, settings)
    Typesettings.registerFamily(settings)
    return `Exported ${ settings.family } typesettings`
  })
  
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
