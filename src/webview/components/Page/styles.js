import styled from '@emotion/styled'
import {
  borders,
  colors,
  font,
  space
} from 'webview/style/variables'

const headerHeight = '48px'

export const Header = styled.header`
  background: ${ colors.white.base };
  border-bottom: ${ borders[1] } ${ colors.black.l92 };
  padding-left: ${ space[3] };
  padding-right: ${ space[3] };
  height: ${ headerHeight };
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderTitle = styled.h1`
  ${ font.s14.n700 };
  color: ${ colors.black.l10 };
`

export const Main = styled.main`
  padding-top: ${ headerHeight };
  padding-left: ${ space[2] };
  padding-right: ${ space[2] };
`
