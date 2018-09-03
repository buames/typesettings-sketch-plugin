import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Field from 'webview/components/Field'
import { CheckboxInput, CheckboxLabel } from './styles'

class Checkbox extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    label: PropTypes.string
  }

  static defaultProps = {
    checked: true,
    label: null
  }

  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(evt) {
    const { onChange } = this.props
    onChange(evt.target)
  }

  render() {
    const {
      name,
      checked,
      label
    } = this.props

    return (
      <Field>
        <CheckboxInput
          type="checkbox"
          id={ name }
          name={ name }
          checked={ checked }
          onChange={ this.handleOnChange }
        />
        { label && (
          <CheckboxLabel htmlFor={ name }>
            { label }
          </CheckboxLabel>
        ) }
      </Field>
    )
  }
}

export default Checkbox
