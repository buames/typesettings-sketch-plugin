export const TEXT_TRANSFORM = {
  0: 'normalcase',
  1: 'uppercase',
  2: 'lowercase'
}

export const TEXT_ALIGNMENT = {
  0: 'left',
  1: 'right',
  2: 'center',
  3: 'justified'
}

export const FONT_STYLES = {
  0: 'normal',
  1: 'italic'
}

// Maps AppKit weightOfFont_ to CSS Values
// See https://github.com/chromium/chromium/blob/1fa6069561057a05c66dc1a7e5b3c5a4beb519c6/third_party/blink/renderer/platform/fonts/mac/font_family_matcher_mac.mm#L293-L313
export const FONT_WEIGHTS = {
  2: 100,
  3: 200,
  4: 300,
  5: 400,
  6: 500,
  8: 600,
  9: 700,
  10: 800,
  12: 900
}

export const isItalicFont = (font) => {
  const traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute)
  const symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue()
  return (symbolicTraits & NSFontItalicTrait) !== 0 //eslint-disable-line
}

export const getStyleOfFont = (font) => {
  const isItalic = isItalicFont(font) ? 1 : 0
  return FONT_STYLES[isItalic]
}

export const getWeightOfFont = (font) => {
  const appKitWeight = NSFontManager.sharedFontManager().weightOfFont_(font) // eslint-disable-line
  return FONT_WEIGHTS[appKitWeight]
}

export const getLetterCasing = attrs => (
  TEXT_TRANSFORM[attrs.MSAttributedStringTextTransformAttribute || 0]
)
