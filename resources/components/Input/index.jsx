import styled from '@emotion/styled'

const Input = styled.input(({ theme }) => ({
  appearance: 'none',
  background: theme.background,
  border: 0,
  borderRadius: theme.radii[1],
  boxShadow: `inset 0 0 0 1px ${ theme.separator }`,
  margin: 0,
  padding: `${ theme.space[1] }`,
  width: '100%',
  ':focus': {
    boxShadow: `inset 0 0 0 1px ${ theme.accent }`,
    outline: 'none'
  }
}))

export default Input
