import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  borders,
  colors,
  fonts,
  space
} from 'webview/style/variables'

export const headerHeight = '48px'

const Header = styled.header`
  background: ${ colors.white.base };
  border-bottom: ${ borders[1] } ${ colors.black.l92 };
  padding-left: ${ space[2] };
  padding-right: ${ space[2] };
  height: ${ headerHeight };
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  ${ fonts.s14.n700 };
  color: ${ colors.black.l10 };
`

const PageHeader = ({ title }) => (
  <Header>
    <Title>
      { title }
    </Title>
  </Header>
)

PageHeader.propTypes = {
  title: PropTypes.string
}

PageHeader.defaultProps = {
  title: null
}

export default PageHeader
