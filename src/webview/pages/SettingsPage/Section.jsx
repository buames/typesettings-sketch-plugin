import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  colors,
  borders,
  fonts,
  space
} from 'webview/style/variables'

const Container = styled.section`
  padding-top: ${ space[3] };
  padding-bottom: ${ space[3] };
  border-top: ${ borders[1] } ${ colors.black.l92 };

  &:first-of-type {
    border-top: none;
  }
`

const TitleLabel = styled.h2`
  ${ fonts.s12.n700 };
  color: ${ colors.black.l10 };
  padding-bottom: ${ space[2] };
`

const Section = ({ children, title }) => (
  <Container>
    { title && (
      <TitleLabel>
        { title }
      </TitleLabel>
    ) }
    { children }
  </Container>
)

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

Section.defaultProps = {
  title: null
}

export default Section
