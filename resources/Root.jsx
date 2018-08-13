import React from 'react'
import { Route } from 'react-router-dom'
import ThemeProvider from '@emotion/provider'
import { Global } from '@emotion/core'
import SettingsPage from 'pages/SettingsPage'

import globals from 'style/globals'
import generateTheme from 'style/theme'

console.log(generateTheme())

const Root = () => (
  <ThemeProvider theme={ generateTheme()  }>
    <Global styles={ globals } />
    {/* <Route exact path="/"  component={ HomePage } /> */}
    <Route exact path="/"  component={ SettingsPage } />
  </ThemeProvider>
)

export default Root
