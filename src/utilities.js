import Settings from 'sketch/settings'
import { fromNative } from 'sketch/dom'

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
  pluginDefinedDirectory: 'Development/typesettings-sketch-plugin/directory',
  // pluginDefinedDirectory: 'Library/Application Support/com.bohemiancoding.sketch3/Plugins/typesettings.sketchplugin/Contents/Resources',
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

export const getMSTextLayers = selection => {
  const predicate = NSPredicate.predicateWithFormat('className == %@', 'MSTextLayer')
  return selection.filteredArrayUsingPredicate(predicate)
}

export const getJSTextLayers = selection => {
  if (Array.isArray(selection)) {
    return selection.filter((layer) => layer.type === 'Text')
  }
  
  const arr = [ ]
  getMSTextLayers(selection).forEach(layer => arr.push(fromNative(layer)))
  return arr
}

export const getFontFamiliesDirectory = () => {
  return `${ NSHomeDirectory() }/Development/typesettings-sketch-plugin/directory/families.json`
  // return context.plugin.urlForResourceNamed('directory.json').path()
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
  const label = NSText.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 16))
  label.setString(value)
  label.setFont(NSFont.boldSystemFontOfSize(12))
  return label
}

export const createSelect = (alert, items, selectedIndex, yPos) => {
  const view = NSComboBox.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 28))
  view.addItemsWithObjectValues(items)
  view.selectItemAtIndex(selectedIndex || 0)
  view.completes = true

  alert.content.addSubview(view)
  yPos = CGRectGetMaxY(alert.content.subviews().lastObject().frame())
  return { view, yPos }
}

export const createPrompt = (title, buttons) => {
  const alert = COSAlertWindow.new()
  alert.setMessageText(title)

  const content = NSView.alloc().init()
  content.setFlipped(true)

  buttons.forEach(button => alert.addButtonWithTitle(button))

  const present = (yPos) => {
    content.frame = NSMakeRect(0,0, 300, yPos + 24)
    alert.addAccessoryView(content)
    return alert.runModal()
  }

  return { present, alert, content }
}
