import sketch from 'sketch'

export const compatibleVersion = '0.3.0'

export enum TextTransform {
  none = 'normalcase',
  uppercase = 'uppercase',
  lowercase = 'lowercase'
}

// Maps AppKit weightOfFont_ to CSS Values
// See https://github.com/chromium/chromium/blob/1fa6069561057a05c66dc1a7e5b3c5a4beb519c6/third_party/blink/renderer/platform/fonts/mac/font_family_matcher_mac.mm#L293-L313
export const fontWeights = {
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

export const getVersion = (context: SketchContext): {
    /* plugin version used to save { typesettings }.json */
    readonly plugin: string,
    /* sketch api version used to save { typesettings }.json */
    readonly api: string;
    /* sketch version used to save { typesettings }.json */
    readonly sketch: string;
    /* min plugin version to load { typesettings }.json */
    readonly compatibleVersion: string;
} => ({
  plugin: context.plugin.version().UTF8String(),
  sketch: sketch.version.sketch,
  api: sketch.version.api,
  compatibleVersion
})

// eslint-disable-next-line
export const isDev = process.env.NODE_ENV !== 'production'

export const pluck = (arr, prop) => {
  const mapped = arr.map(item => item[prop])
  return mapped.filter((value, index, self) => self.indexOf(value) === index)
}

export const getJSTextLayers = (selection) => {
  if (Array.isArray(selection)) {
    return selection.filter(layer => layer.type === 'Text')
  }
}
