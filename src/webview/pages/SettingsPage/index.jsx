import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from 'webview/components/Page'
import Button from 'webview/components/Button'
import Checkbox from 'webview/components/Checkbox'
import TextField from 'webview/components/TextField'
import Section from './Section'

class SettingsPage extends Component {
  state = {
    ...this.props.preferences
  }

  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    preferences: PropTypes.shape({
      pluginDefinedDirectory: PropTypes.string,
      userDefinedDirectory: PropTypes.string,
      allowsAutoKerning: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
      ]),
      allowsAutoLineHeight: PropTypes.bool,
      ignorePrefix: PropTypes.string,
      ignoreSuffix: PropTypes.string
    }).isRequired
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.preferences !== state.preferences) {
      return { ...props.preferences }
    }
    return null
  }

  handleOnChange = (target) => {
    const { name } = target
    const newPref = (target.type === 'checkbox')
      ? target.checked
      : target.value

    this.state[name] = newPref
    window.postMessage('setPreferences', this.state)
  }

  handleOnClickDirectoryButton = (evt) => {
    window.postMessage(evt.target.name, this.state)
  }

  render() {
    const { route } = this.props
    const {
      userDefinedDirectory,
      allowsAutoKerning,
      allowsAutoLineHeight,
      ignorePrefix,
      ignoreSuffix
    } = this.state
    return (
      <Page title={ route.title }>
        <Section title="Local Directory">
          <TextField
            name="userDefinedDirectory"
            placeholder="Local Directory"
            value={ userDefinedDirectory }
            onChange={ this.handleOnChange }
            disabled
          />
          <Button
            label="Change"
            name="selectUserDefinedDirectory"
            onClick={ this.handleOnClickDirectoryButton }
          />
          <Button
            label="Copy"
            name="copyUserDefinedDirectoryPath"
            onClick={ this.handleOnClickDirectoryButton }
          />
          <Button
            label="Open"
            name="showUserDefinedDirectory"
            onClick={ this.handleOnClickDirectoryButton }
          />
        </Section>
        <Section title="Automatic Typesettings">
          <Checkbox
            label="Enable Auto Character Spacing"
            name="allowsAutoKerning"
            checked={ allowsAutoKerning }
            onChange={ this.handleOnChange }
          />
          <Checkbox
            label="Enable Auto Line Height"
            name="allowsAutoLineHeight"
            checked={ allowsAutoLineHeight }
            onChange={ this.handleOnChange }
          />
        </Section>
        <Section title="Ignore Text Layers">
          <TextField
            label="Prefix"
            name="ignorePrefix"
            placeholder="Prefix"
            value={ ignorePrefix }
            onChange={ this.handleOnChange }
          />
          <TextField
            label="Suffix"
            name="ignoreSuffix"
            placeholder="Suffix"
            value={ ignoreSuffix }
            onChange={ this.handleOnChange }
          />
        </Section>
      </Page>
    )
  }
}

export default SettingsPage
