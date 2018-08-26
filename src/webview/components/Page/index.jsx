import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { space } from 'webview/style/variables'
import PageHeader, { headerHeight } from './Header'
import PageFooter from './Footer'

const Main = styled.main`
  padding-top: ${ headerHeight };
  padding-left: ${ space[2] };
  padding-right: ${ space[2] };
`

const Page = ({ title, children }) => (
  <Fragment>
    <PageHeader title={ title } />
    <Main>
      { children }
    </Main>
    <PageFooter />
  </Fragment>
)

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

Page.defaultProps = {
  title: null
}

export default Page
