import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Header, HeaderTitle, Main } from './styles'

const Page = ({ title, children }) => (
  <Fragment>
    <Header>
      <HeaderTitle>
        { title }
      </HeaderTitle>
    </Header>
    <Main>
      { children }
    </Main>
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
