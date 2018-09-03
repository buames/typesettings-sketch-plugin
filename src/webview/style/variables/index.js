import { generateFonts } from 'typesettings-js'
import Typesettings from './typesettings'

export const borders = [
  0,
  '1px solid',
  '2px solid'
]

export const colors = {
  black: {
    base: '#000000',
    l10: '#191919',
    l55: '#8C8C8C',
    l30: '#B2B2B2',
    l92: '#EBEBEB',
    l97: '#F7F7F7',
    l100: '#FFFFFF'
  },
  white: {
    base: '#FFFFFF',
    l10: '#E6E6E6',
    l55: '#737373',
    l30: '#4D4D4D',
    l92: '#141414',
    l97: '#080808',
    l100: '#000000'
  },
  brand: {
    base: '#03A87C'
  }
}

export const fonts = generateFonts(Typesettings)

export const radii = [
  0,
  '3px',
  '5px',
  '10px',
  '1000px'
]

export const space = [
  '0px',
  '8px',
  '16px',
  '24px',
  '32px',
  '40px',
  '48px'
]

export default {
  borders,
  colors,
  fonts,
  radii,
  space
}
