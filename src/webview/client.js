/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import pluginCall from 'sketch-module-web-view/client'
import { Global } from '@emotion/core'
import globals from 'webview/style/globals'
import routes from 'webview/pages'

const renderApp = (props) => {
  render(
    <HashRouter>
      <Fragment>
        <Global styles={ globals } />
        { renderRoutes(routes, props) }
      </Fragment>
    </HashRouter>,
    document.getElementById('root')
  )
}

// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e => (
  e.preventDefault()
)))

// Call the sketch plugin to get the current user preferences
pluginCall('getPreferences')

// Now render the app
renderApp({
  preferences: window.preferences
})

// This is called from the plugin and tells the webview to refresh
window.reloadData = (newProps) => {
  renderApp({
    preferences: newProps
  })
}
