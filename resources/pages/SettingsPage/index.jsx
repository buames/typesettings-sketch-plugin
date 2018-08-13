import React, { Fragment } from 'react'
import Main from 'components/Main'
import Navigation from 'components/Navigation'
import Section from './Section'

const SettingsPage = () => (
  <Fragment>
    <Navigation title="Settings" />
    <Main>
      <Section  title="Local Registry" />
      <Section  title="Automatic Typesettings" />
      <Section  title="Ignore Text Layers" />
    </Main>
  </Fragment>
)

export default SettingsPage
