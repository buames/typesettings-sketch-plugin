import {
  borders,
  colors,
  font,
  radii,
  space
} from './variables'

const generateTheme = (theme = colors.black) => ({
  borders,
  colors,
  radii,
  space,
  background: theme.l100,
  primary: theme.l10,
  secondary: theme.l55,
  tertiary: theme.l30,
  accent: colors.brand.base,
  separator: theme.l92,
  textStyles: {
    headline1: {
      ...font.s16.n700,
      color: theme.l10
    },
    body1: {
      ...font.s16.n400,
      color: theme.l10
    },
    body2: {
      ...font.s12.n400,
      color: theme.l55
    }
  }
})

export default generateTheme
