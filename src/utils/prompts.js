export const getPreviousYPos = (content, additional = 16) => (
  content.subviews().lastObject()
    ? CGRectGetMaxY(content.subviews().lastObject().frame()) + additional
    : additional
)

export const createDivider = yPos => {
  const view = NSView.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 1))
  view.setWantsLayer(1)
  view.layer().setBackgroundColor(CGColorCreateGenericRGB(204/255, 204/255, 204/255, 1.0))
  return view
}

export const createTitle = (text, yPos) => {
  const view = NSText.alloc().initWithFrame(NSMakeRect(-5, yPos, 300, 14))
  view.setDrawsBackground(false)
  view.setString(text)
  view.setFont(NSFont.boldSystemFontOfSize(11))
  view.setTextColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0/255, 0/255, 0/255, 0.9))
	return view
}

export const createCheckbox = (title, state, yPos) => {
  const view = NSButton.alloc().initWithFrame(NSMakeRect(0, yPos, 300, 14))
	view.setButtonType(NSSwitchButton)
	view.setBezelStyle(0)
	view.setTitle(title)
  view.setState((state == false) ? NSOffState : NSOnState)
	return view
}

export const createInput = (value, placeholder = '', yPos) => {
  const view = NSTextField.alloc().init()
  view.setFrame(NSMakeRect(0, yPos, 300, 24))
  view.setStringValue(value)
  view.placeholderString = placeholder
  return view
}

export const openPrompt = ({ title, sections, buttons }) => {
  const alert = COSAlertWindow.new()
  alert.setMessageText(title)

  const content = NSView.alloc().init()
  content.setFlipped(true)

  // Create the content and add it to the content view
  const inputs = [ ]
  sections.forEach((section, idx) => {

    // Sections start with a divider
    const divider = createDivider(getPreviousYPos(content, idx != 0 ? 16: 0))
    content.addSubview(divider)

    if (section.title) {
      const sectionTitle = createTitle(section.title, getPreviousYPos(content))
      content.addSubview(sectionTitle)
    }

    if (section.items) {
      section.items.forEach(item => {

        if (item.type === 'input') {
          const input = createInput(item.value, item.placeholder, getPreviousYPos(content, 4))
          content.addSubview(input)
          inputs.push(input)
        }
        
        if (item.type === 'title') {
          const title = createTitle(item.label, getPreviousYPos(content))
          content.addSubview(title)
        }

        if (item.type === 'checkbox') {
          const checkbox = createCheckbox(item.title, item.state, getPreviousYPos(content))
          content.addSubview(checkbox)
          inputs.push(checkbox)
        }
      })
    }
  })

  // Set the content view size and add to the alert
  content.frame = NSMakeRect(0,0, 300, getPreviousYPos(content, 24))
  alert.addAccessoryView(content)

  // Set the order when tabbing through inputs and set initial input focus
  inputs.map((input, idx) => input.setNextKeyView(inputs[idx + 1] || inputs[0]))
  alert.alert().window().setInitialFirstResponder(inputs[0])

  // Add the buttons
  buttons.forEach(button => alert.addButtonWithTitle(button))

  // Open the alert
  const response = alert.runModal()
  return { inputs, response }
}

export default openPrompt
