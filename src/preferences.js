import UI from 'sketch/ui'
import {
  preferences,
  savePreferences,
  setKeyOrder,
  createLabel,
  createDivider,
  createInput,
  createCheckbox,
  createDescription
} from './utilities'

export default (context) => {
  const alert = COSAlertWindow.new()
  alert.setMessageText('Preferences')

  const content = NSView.alloc().init()
  content.setFlipped(true)

  let yPos = 0

  const sectionOneDivider = createDivider(yPos)
  content.addSubview(sectionOneDivider)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 16

  const sectionOneLabel = createLabel('Directory', yPos)
  content.addSubview(sectionOneLabel)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 8

  const sectionOneDescription = createDescription('This is where typesetting JSON files are stored', yPos, 0, 1)
  content.addSubview(sectionOneDescription)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 8

  const input = createInput(preferences.userDefinedDirectory, yPos)
  content.addSubview(input)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 16

  const sectionTwoDivider = createDivider(yPos)
  content.addSubview(sectionTwoDivider)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 16

  const sectionTwoLabel = createLabel('Actions', yPos)
  content.addSubview(sectionTwoLabel)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 16

  const checkbox = createCheckbox('Enable Auto Character Spacing', 'allowsAutoKerning', preferences.allowsAutoKerning, yPos)
  content.addSubview(checkbox)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 4

  const description = createDescription('When deselecting a text layer, the character spacing will be automatically set based on the font size and weight', yPos)
  content.addSubview(description)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 16

  const checkbox2 = createCheckbox('Enable Auto Line Height', 'allowsAutoLineHeight', preferences.allowsAutoLineHeight, yPos)
  content.addSubview(checkbox2)

  yPos = CGRectGetMaxY(content.subviews().lastObject().frame()) + 4

  const description2 = createDescription('When deselecting a text layer, the line height will be automatically set based on the font size and weight', yPos)
  content.addSubview(description2)

  // Set the content frame and add it to the alert
  content.frame = NSMakeRect(0,0, 300, CGRectGetMaxY(content.subviews().lastObject().frame()) + 24)
  alert.addAccessoryView(content)
  
  // Add the buttons
  alert.addButtonWithTitle('Save')
  alert.addButtonWithTitle('Cancel')

  // Set the order when tabbing through inputs
  setKeyOrder(alert,[ input, checkbox, checkbox2 ])

  // Open the alert
  const responseCode = alert.runModal()

  // Save Button
  if (responseCode === 1000) {
    const done = savePreferences({
      userDefinedDirectory: String(input.stringValue()),
      allowsAutoKerning: checkbox.state(),
      allowsAutoLineHeight: checkbox2.state()
    })
    UI.message(done)
  }
}
