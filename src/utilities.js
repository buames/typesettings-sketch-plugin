import Settings from 'sketch/settings'
import fs from '@skpm/fs'

/* =========================================================
    General
========================================================= */

export const pluck = (arr, prop) => {
  const mapped = arr.map(item => item[prop])
  return mapped.filter((value, index, self) => self.indexOf(value) === index)
}

/* =========================================================
    Plugin Preferences
========================================================= */
export const preferences = {
  pluginDefinedDirectory: 'Library/Application Support/com.bohemiancoding.sketch3/Plugins/typesettings.sketchplugin/Contents/Resources',
  userDefinedDirectory: Settings.settingForKey('userDefinedDirectory') || 'Desktop',
  allowsAutoKerning: Settings.settingForKey('allowsAutoKerning') || false,
  allowsAutoLineHeight: Settings.settingForKey('allowsAutoLineHeight') || false
}

export const savePreferences = newPrefs => {
  const prefs = { ...preferences, ...newPrefs }
  Object.keys(prefs).forEach(key => {
    Settings.setSettingForKey(key, prefs[key])
  })
  return 'Updated Settings'
}

/* =========================================================
    Typesettings
========================================================= */

export const TEXT_TRANSFORM = {
  0: 'normalcase',
  1: 'uppercase',
  2: 'lowercase'
}

export const TYPESETTINGS = {
  LINE_HEIGHT: 'line-height',
  CHARACTER_SPACING: 'character-spacing'
}

export const getTextLayers = selection => {
  const textLayers = selection.filter((layer) => layer.type === 'Text')
  
  if (selection.length == 0 || textLayers.length == 0) {
    return 'You need to select atleast 1 text layer'
  }

  return textLayers
}

export const process = textLayer => {
  const layer = textLayer.sketchObject || textLayer
  const attrs = layer.style().textStyle().attributes()
  return {
    fontFamily: String(attrs.NSFont.familyName()),
    fontName: String(attrs.NSFont.fontName()),
    fontDisplayName: String(attrs.NSFont.displayName()),
    fontPostscriptName: String(layer.fontPostscriptName()),
    fontSize: Number(layer.fontSize()),
    casing: TEXT_TRANSFORM[attrs.MSAttributedStringTextTransformAttribute || 0],
    characterSpacing: layer.characterSpacing() ? Number(layer.characterSpacing()) : layer.characterSpacing(),
    lineHeight: Number(layer.lineHeight()),
    paragraphSpacing: Number(attrs.NSParagraphStyle.paragraphSpacing())
  }
}

export const getTypesettingForTextLayer = (storage, textLayer) => {
  const { fontFamily, fontSize, fontName, casing } = process(textLayer)

    if (!storage || (storage.family !== fontFamily)) {
      storage = fetch(fontFamily)
    }

    if (!storage || !storage[fontName] || !storage[fontName][fontSize] || !storage[fontName][fontSize][casing]) {
      return
    }

    return storage[fontName][fontSize][casing]
}

export const storage = (fontFamily) => {
  const fileName = `${ fontFamily.replace(/\s/g, '') }.json`
  const pluginDefinedDirectory = `${ NSHomeDirectory() }/${ preferences.pluginDefinedDirectory }/${ fileName }`

  if (fs.existsSync(pluginDefinedDirectory)) {
    return pluginDefinedDirectory
  }

  return `${ NSHomeDirectory() }/${ preferences.userDefinedDirectory }/${ fileName }`
}

export const fetch = (fontFamily) => {
  const filePath = storage(fontFamily)
  if (!fs.existsSync(filePath)) return
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export const save = (settings) => {
  const filePath = storage(settings.family)
  fs.writeFileSync(filePath, JSON.stringify(settings))
  return `Exported ${ settings.family } typesettings`
}

/* =========================================================
    Prompts
========================================================= */

export const setKeyOrder = (alert, order) => {
  for (var i = 0; i < order.length; i++) {
    const thisItem = order[i]
    const nextItem = order[i+1]
    if (nextItem) {
      thisItem.setNextKeyView(nextItem)
    }
  }
	alert.alert().window().setInitialFirstResponder(order[0])
}

export const createCheckbox = (title, tag, state, yPos) => {
  const checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 14))
	checkbox.setButtonType(NSSwitchButton)
	checkbox.setBezelStyle(0)
	checkbox.setTitle(title)
	checkbox.setTag(tag)
	checkbox.setState((state == false) ? NSOffState : NSOnState)
	return checkbox
}

export const createDescription = (text, yPos,  xOffset = 19, lines = 3) => {
	var label = NSTextField.alloc().initWithFrame(NSMakeRect(xOffset, yPos, 281, (14 * lines)))
	label.setStringValue(text)
	label.setFont(NSFont.systemFontOfSize(11))
	label.setTextColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0/255, 0/255, 0/255, 0.6))
	label.setBezeled(false)
	label.setDrawsBackground(false)
	label.setEditable(false)
	label.setSelectable(false)
	return label
}

export const createDivider = yPos => {
  const divider = NSView.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 1))
  divider.setWantsLayer(1)
  divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204/255, 204/255, 204/255, 1.0))
  return divider
}

export const createInput = (value, yPos, placeholder = '') => {
  const field = NSTextField.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 24))
  field.setStringValue(value)
  field.placeholderString = placeholder
  return field
}

export const createLabel = (value, yPos) => {
	const label = NSTextField.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 16))
	label.setStringValue(value)
	label.setFont(NSFont.boldSystemFontOfSize(12))
	label.setBezeled(false)
	label.setDrawsBackground(false)
	label.setEditable(false)
	label.setSelectable(false)
	return label
}
