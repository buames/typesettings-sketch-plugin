import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Field from 'webview/components/Field'
import { Input, InputLabel } from './styles'

class TextField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    placeholder: null,
    value: null,
    label: null,
    disabled: false
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
      placeholder,
      value,
      label,
      disabled
    } = this.props

    return (
      <Field wrap="true">
        { label && (
          <InputLabel htmlFor={ name }>
            { label }
          </InputLabel>
        ) }
        <Input
          type="text"
          name={ name }
          placeholder={ placeholder }
          value={ value }
          disabled={ disabled }
          onChange={ this.handleOnChange }
        />
      </Field>
    )
  }
}

export default TextField
