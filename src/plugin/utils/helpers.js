import { fromNative } from 'sketch/dom'

export const __DEV__ = process.env.NODE_ENV !== 'production' // eslint-disable-line

export const pluck = (arr, prop) => {
  const mapped = arr.map(item => item[prop])
  return mapped.filter((value, index, self) => self.indexOf(value) === index)
}

export const getMSTextLayers = (selection) => {
  const predicate = NSPredicate.predicateWithFormat('className == %@', 'MSTextLayer')
  return selection.filteredArrayUsingPredicate(predicate)
}

export const getJSTextLayers = (selection) => {
  if (Array.isArray(selection)) {
    return selection.filter(layer => layer.type === 'Text')
  }

  const arr = []
  getMSTextLayers(selection).forEach(layer => arr.push(fromNative(layer)))
  return arr
}
