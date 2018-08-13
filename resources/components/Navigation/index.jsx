import React from 'react'
// import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const Nav = styled.nav(({ theme }) => ({
  background: theme.background,
  borderBottom: `${ theme.borders[1] } ${ theme.separator }`,
  padding: theme.space[3],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const Title = styled.h1(({ theme }) => ({
  ...theme.textStyles.headline1,
  textAlign: 'center'
}))

const Navigation = ({ title }) => (
  <Nav>
    <Title>{ title }</Title>
    {/* <Link to="/">Home</Link> */}
    {/* <Link to="/settings">Settings</Link> */}
  </Nav>
)

export default Navigation
