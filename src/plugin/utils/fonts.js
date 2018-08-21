import { CGSizeToObj, CGRectToObj } from 'plugin/utils/helpers'

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
  return (symbolicTraits && NSFontItalicTrait) !== 0
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

export const getMetricsOfTypeface = font => ({
  ascender: font.ascender(),
  descender: font.descender(),
  capHeight: font.capHeight(),
  xHeight: font.xHeight(),
  defaultLineHeight: font.defaultLineHeightForFont(),
  italicAngle: font.italicAngle(),
  leading: font.leading(),
  maxAdvancement: CGSizeToObj(font.maximumAdvancement()),
  numberOfGlyphs: font.numberOfGlyphs(),
  underline: {
    position: font.underlinePosition(),
    thickness: font.underlineThickness()
  },
  boundingRect: CGRectToObj(font.boundingRectForFont())
})

export const getRelToAbsMetricsOfTypeface = metrics => ({
  descentHeight: metrics.defaultLineHeight - metrics.descender,
  capHeight: metrics.ascender - metrics.capHeight,
  xHeight: metrics.ascender - metrics.xHeight,
  capHeightCenter: metrics.ascender - metrics.capHeight * 0.5,
  xHeightCenter: metrics.ascender - metrics.xHeight * 0.5
})

export const getTextLayerAttributes = (layer, metrics) => ({
  alignment: TEXT_ALIGNMENT[layer.textAlignment()],
  casing: TEXT_TRANSFORM[layer.styleAttributes().MSAttributedStringTextTransformAttribute || 0],
  leading: layer.lineHeight() - (metrics.ascender + metrics.descender)
})
