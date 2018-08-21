import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, onClick }) => (
  <button
    type="button"
    onClick={ onClick }
  >
    { label }
  </button>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
