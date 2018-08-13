import React from 'react'
import styled from '@emotion/styled'
import Input from 'components/Input'

const Container = styled.section(({ theme }) => ({
  // background: theme.background,
  padding: theme.space[3],
  marginTop: theme.space[1],
  marginBottom: theme.space[1]
}))

const Legend = styled.legend(({ theme }) => ({
  ...theme.textStyles.body2,
  paddingBottom: theme.space[2]
}))

const Field = styled.div({
  // marginTop: space.tiny
})

const Section = ({ title }) => (
  <Container>
    <Legend>{ title }</Legend>
    <Field>
      <label>Hi</label>
      <Input type="text" />
    </Field>
  </Container>
)

export default Section
