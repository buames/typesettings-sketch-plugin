import React, { Fragment } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Global } from '@emotion/core'
import globals from 'webview/style/globals'
import routes from 'webview/pages'

const Root = props => (
  <HashRouter>
    <Fragment>
      <Global styles={ globals } />
      { renderRoutes(routes, props) }
    </Fragment>
  </HashRouter>
)

export default Root
