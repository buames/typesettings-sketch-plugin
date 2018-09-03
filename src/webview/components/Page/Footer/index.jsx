import React from 'react'
import styled from '@emotion/styled'
import pluginCall from 'sketch-module-web-view/client'
import InlineSVG from 'svg-inline-react'
import { colors, space } from 'webview/style/variables'
import markSvg from './mark.svg'

const Footer = styled.footer`
  background: ${ colors.black.l97 };
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${ space[6] };
  padding-left: ${ space[2] };
  padding-right: ${ space[2] };
  padding-bottom: ${ space[6] };
`

const Mark = styled(InlineSVG)`
  width: 24px;
  height: 24px;

  path {
    fill: ${ colors.black.l30 };
  }

  &:hover {
    cursor: pointer;
  }
`

const handleOnClickMark = () => (
  pluginCall('openUrl', 'https://github.com/buames/typesettings-sketch-plugin')
)

const PageFooter = () => (
  <Footer>
    <Mark
      src={ markSvg }
      onClick={ handleOnClickMark }
      raw
    />
  </Footer>
)

export default PageFooter
