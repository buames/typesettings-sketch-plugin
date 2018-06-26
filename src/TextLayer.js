export const TEXT_TRANSFORM = {
  0: 'normalcase',
  1: 'uppercase',
  2: 'lowercase'
}

const raw = textLayer => {
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

const transform = textLayer => ({
  [textLayer.fontName]: {
    fontFamily: textLayer.fontFamily,
    fontName: textLayer.fontName,
    fontDisplayName: textLayer.fontDisplayName,
    fontPostscriptName: textLayer.fontPostscriptName,
    [textLayer.casing]: {
      [textLayer.fontSize]: {
        characterSpacing: textLayer.characterSpacing,
        lineHeight: textLayer.lineHeight,
        paragraphSpacing: textLayer.paragraphSpacing
      }
    }
  }
})

const TextLayer = {
  raw,
  transform
}

export default TextLayer
