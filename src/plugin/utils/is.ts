import { AllLayers, ShapePath, Text } from "sketch/dom"

export const is = {
  string: (s: any): s is string => typeof s === 'string',
  textLayer: (layer: AllLayers): layer is Text => layer.type === 'Text',
  shapePath: (layer: AllLayers): layer is ShapePath => layer.type === 'ShapePath'
}
