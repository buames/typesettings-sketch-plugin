import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  colors,
  fonts,
  radii,
  space
} from 'webview/style/variables'

const Base = styled.button`
  appearance: none;
  border: 0;
  padding: calc(${ space[1] } * 1.25) ${ space[2] };
  margin: ${ space[1] } ${ space[1] } 0 0;
  background: ${ colors.black.base };
  border-radius: ${ radii[2] };

  ${ fonts.s10.n700 };
  color: ${ colors.white.base };
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`

const Button = ({ label, name, onClick }) => (
  <Base
    type="button"
    name={ name }
    onClick={ onClick }
  >
    { label }
  </Base>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
