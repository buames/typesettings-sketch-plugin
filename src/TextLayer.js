export const TEXT_TRANSFORM = {
  0: 'normalcase',
  1: 'uppercase',
  2: 'lowercase'
}

const create = textLayer => {
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

const TextLayer = {
  create
}

export default TextLayer
