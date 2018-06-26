import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import fs from '@skpm/fs'
import {
  getTextLayers,
  process,
  pluck,
  storage, // rename
  getFontFamiliesDirectory
} from './utilities'

const getLastYPosition = (view, spacing = 0) => (
  view.subviews().lastObject() ?
    CGRectGetMaxY(view.subviews().lastObject().frame()) + spacing : 0
)

export default (context) => {
  const selection = sketch.getSelectedDocument().selectedLayers.layers
  const selectedTextLayers = getTextLayers(selection)

  if (typeof selectedTextLayers === 'string') {
    return UI.message(selectedTextLayers)
  }

  // Process the text layers
  const textLayers = selectedTextLayers.map(process)

  // Get all of the font families from the text layers
  const fontFamilies = pluck(textLayers, 'fontFamily')

  // Create the typesettings for each font family
  const typesettings = fontFamilies.map(family => {
    const obj = { }

    // Create the typesettings for each family + size + casing
    const layers = textLayers .filter((layer) => layer.fontFamily === family)
    layers.map(layer => {
      obj[layer.fontName] = obj[layer.fontName] || { }

      obj[layer.fontName][layer.fontSize] = obj[layer.fontName][layer.fontSize] || {
        fontFamily: layer.fontFamily,
        fontName: layer.fontName,
        fontDisplayName: layer.fontDisplayName,
        fontPostscriptName: layer.fontPostscriptName,
        fontSize: layer.fontSize
      }

      obj[layer.fontName][layer.fontSize][layer.casing] = obj[layer.fontName][layer.fontSize][layer.casing] || {
        characterSpacing: layer.characterSpacing,
        lineHeight: layer.lineHeight,
        paragraphSpacing: layer.paragraphSpacing
      }
    })

    const fontNames = pluck(layers, 'fontName')

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

    const variants = { }
    alertContent.subviews().forEach((input, index) => {
      variants[fontNames[index]] = input.stringValue()
    })

    const lastUpdated = new Date().toISOString()

    return {
      family,
      lastUpdated,
      variants,
      ...obj
    }
  })

  // Save the typesettings and update the directory
  const done = typesettings.map(ts => {
    const { family, lastUpdated, variants, ...rest } = ts

    const settingsFilePath = storage(family)
    fs.writeFileSync(settingsFilePath, JSON.stringify({
      family, lastUpdated, ...rest
    }))

    const familiesFilePath = getFontFamiliesDirectory()
    const familiesFileContent = JSON.parse(fs.readFileSync(familiesFilePath, 'utf8'))
    familiesFileContent.push({
      family,
      lastUpdated,
      variants
    })

    fs.writeFileSync(familiesFilePath, JSON.stringify(familiesFileContent))
    return `Exported ${ family } typesettings`
  })
  
  const msg = (done.length == 1) ? done.join('') : `Exported typesettings for ${ done.length } fonts`
  return UI.message(msg)
}
